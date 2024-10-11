import mongoose, { Document, Schema } from "mongoose";

interface ProductDocument extends Document {
  code: string;
  status: "draft" | "trash" | "published";
  imported_t: Date;
  url?: string;
  creator?: string;
  created_t?: number;
  last_modified_t?: number;
  product_name: string;
  quantity?: string;
  brands?: string;
  categories?: string;
  labels?: string;
  cities?: string;
  purchase_places?: string;
  stores?: string;
  ingredients_text?: string;
  traces?: string;
  serving_size?: string;
  serving_quantity?: number;
  nutriscore_score?: number;
  nutriscore_grade?: string;
  main_category?: string;
  image_url?: string;
}

const ProductSchema: Schema<ProductDocument> = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  status: {
    type: String,
    enum: ["draft", "trash", "published"],
    default: "draft",
  },
  imported_t: { type: Date, default: Date.now },
  url: { type: String },
  creator: { type: String },
  created_t: { type: Number },
  last_modified_t: { type: Number },
  product_name: { type: String, required: true },
  quantity: { type: String },
  brands: { type: String },
  categories: { type: String },
  labels: { type: String },
  cities: { type: String },
  purchase_places: { type: String },
  stores: { type: String },
  ingredients_text: { type: String },
  traces: { type: String },
  serving_size: { type: String },
  serving_quantity: { type: Number },
  nutriscore_score: { type: Number },
  nutriscore_grade: { type: String },
  main_category: { type: String },
  image_url: { type: String },
});

const Product = mongoose.model<ProductDocument>("products", ProductSchema);

export default Product;
