import ProductService from "../application/services/ProductService";
import Product from "../domain/models/Products";

jest.mock("../domain/models/Product");

describe("Product Service", () => {
  let productService: ProductService;

  beforeEach(() => {
    productService = new ProductService();
  });

  test("should return a product by code", async () => {
    const mockProduct = { code: "123", product_name: "Test Product" };
    (Product.findOne as jest.Mock).mockResolvedValue(mockProduct);

    const product = await productService.getProductByCode("123");
    expect(product).toEqual(mockProduct);
  });

  test("should return null if product is not found", async () => {
    (Product.findOne as jest.Mock).mockResolvedValue(null);

    const product = await productService.getProductByCode("123");
    expect(product).toBeNull();
  });

  test("should create or update a product", async () => {
    const mockProduct = { code: "123", product_name: "Updated Product" };
    (Product.findOneAndUpdate as jest.Mock).mockResolvedValue(mockProduct);

    const product = await productService.createOrUpdateProduct(mockProduct);
    expect(product).toEqual(mockProduct);
  });
});
