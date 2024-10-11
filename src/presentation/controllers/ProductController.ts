import { Request, Response } from "express";
import ProductService from "../../application/services/ProductService";

const productService = new ProductService();

class ProductController {
  async getAll(req: Request, res: Response): Promise<Response> {
    const { page, limit } = req.query;
    const products = await productService.getAllProducts(
      Number(page),
      Number(limit)
    );
    return res.status(200).json(products);
  }

  async getOne(req: Request, res: Response): Promise<Response> {
    const product = await productService.getProductByCode(req.params.code);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json(product);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const product = await productService.createOrUpdateProduct(req.body);
    return res.status(200).json(product);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const product = await productService.deleteProduct(req.params.code);
    if (!product) return res.status(404).json({ message: "Product not found" });
    return res.status(200).json({ message: "Product moved to trash" });
  }
}

export default new ProductController();
