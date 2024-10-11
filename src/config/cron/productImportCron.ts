import cron from "node-cron";
import axios from "axios";
import fs from "fs";
import zlib from "zlib";
import { pipeline } from "stream";
import { promisify } from "util";
import readline from "readline";
import Product from "../../domain/models/Products";
import ImportHistory from "../../domain/models/ImportHistory";

// Para transformar a pipeline em uma Promise
const pipelineAsync = promisify(pipeline);

const importProducts = async (): Promise<void> => {
  try {
    const baseUrl = "https://challenges.coode.sh/food/data/json/";
    const indexFileUrl = `${baseUrl}index.txt`;

    const response = await axios.get(indexFileUrl);
    const fileList = response.data.split("\n").filter(Boolean);

    for (const filename of fileList) {
      const fileUrl = `${baseUrl}${filename}`;

      const productStream = await axios({
        url: fileUrl,
        method: "GET",
        responseType: "stream",
      });

      const gunzipStream = zlib.createGunzip();
      const outputFileName = filename.replace(".gz", "");
      const writeStream = fs.createWriteStream(outputFileName);

      await pipelineAsync(productStream.data, gunzipStream, writeStream);
      console.log(
        `Arquivo descomprimido com sucesso e salvo como ${outputFileName}`
      );

      const readStream = fs.createReadStream(outputFileName, {
        encoding: "utf8",
      });
      const rl = readline.createInterface({
        input: readStream,
        crlfDelay: Infinity,
      });

      const products: any[] = [];
      for await (const line of rl) {
        try {
          const product = JSON.parse(line);
          products.push(product);
          if (products.length >= 100) break;
        } catch (jsonError) {
          console.error("Erro ao analisar JSON:", jsonError);
          continue;
        }
      }

      for (const product of products) {
        if (!product.product_name || !product.code) {
          console.warn(`Produto inválido encontrado e será ignorado:`, product);
          continue;
        }

        try {
          await Product.create({
            code: product.code,
            status: "draft", // Padrão ao importar
            imported_t: new Date(), // Data de importação atual

            // Dados adicionais
            url: product.url,
            creator: product.creator || "Desconhecido",
            created_t: product.created_t || null,
            last_modified_t: product.last_modified_t || null,
            product_name: product.product_name || "Nome não disponível",
            quantity: product.quantity || "Quantidade não especificada",
            brands: product.brands || "Marca desconhecida",
            categories: product.categories || "Categoria não especificada",
            labels: product.labels || "Não contém rótulos",
            cities: product.cities || "Cidade não especificada",
            purchase_places:
              product.purchase_places || "Local de compra desconhecido",
            stores: product.stores || "Loja desconhecida",
            ingredients_text:
              product.ingredients_text || "Ingredientes não disponíveis",
            traces: product.traces || "Traços não especificados",
            serving_size:
              product.serving_size || "Tamanho de porção desconhecido",
            serving_quantity: product.serving_quantity || null,
            nutriscore_score: product.nutriscore_score || null,
            nutriscore_grade: product.nutriscore_grade || "Sem classificação",
            main_category:
              product.main_category || "Categoria principal não especificada",
            image_url: product.image_url || "Sem imagem disponível",
          });
        } catch (error) {
          if (error.code === 11000) {
            console.warn(
              `Produto com código duplicado encontrado e ignorado: ${product.code}`
            );
            continue;
          }
          console.error(`Erro ao salvar o produto:`, dbError, product);
        }
      }

      // Salvar histórico da importação
      await ImportHistory.create({ filename, date: new Date() });
    }

    console.log("Produtos importados com sucesso.");
  } catch (err) {
    console.error("Erro durante a importação", err);
  }
};

// Executar a cada 1 minuto
//cron.schedule("*/1 * * * *", importProducts);

cron.schedule("03 * * *", importProducts);
