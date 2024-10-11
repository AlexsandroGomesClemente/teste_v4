import Product from '../../domain/models/Products';
import { Document } from 'mongoose';

interface ProductData {
  code: string;
  product_name: string;
  brands?: string;
  categories?: string;
  ingredients_text?: string;
  imported_t?: Date;
  status?: 'draft' | 'trash' | 'published';
}

class ProductService {
  async getAllProducts(page = 1, limit = 10): Promise<Document[]> {
    return Product.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .exec();
  }

  async getProductByCode(code: string): Promise<Document | null> {
    return Product.findOne({ code });
  }

  async createOrUpdateProduct(productData: ProductData): Promise<Document | null> {
    return Product.findOneAndUpdate(
      { code: productData.code },
      productData,
      { upsert: true, new: true }
    );
  }

  async deleteProduct(code: string): Promise<Document | null> {
    return Product.findOneAndUpdate(
      { code },
      { status: 'trash' },
      { new: true }
    );
  }
}

export default ProductService;