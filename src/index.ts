//@ts-nocheck
import express from "express";
import connectDB from "./config/database/connection";
import productController from "./presentation/controllers/ProductController";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());
connectDB();
import "./config/cron/productImportCron";

// Rotas
app.get("/products", (req: Request, res: Response) =>
  productController.getAll(req, res)
);
app.get("/products/:code", (req, res) => productController.getOne(req, res));
app.put("/products/:code", (req, res) => productController.update(req, res));
app.delete("/products/:code", (req, res) => productController.delete(req, res));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
