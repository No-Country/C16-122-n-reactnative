import { ProductModel, ProductCategoryModel } from '../database/models';
import { ProductProps } from '../interfaces';
import { AppError } from '../models';
import ProductCategoryService from './productCategory.services';

const productCategoryService = new ProductCategoryService();
class ProductService {
  constructor() {}

  async findProductsForBar(barId: number) {
    const categories = await ProductCategoryModel.findAll({
      where: {
        barId,
      },
      attributes: ['id'],
    });
    const categoryIds = categories.map(category => category.id);
    const products = await ProductModel.findAll({
      where: {
        productCategoryId: categoryIds,
      },
    });
    return products;
  }

  async findProductForBarOr404(productId: number, barId: number) {
    const product = await this.findProductOr404(productId);
    const findProductInCategory =
      await productCategoryService.findCategoryForBar(
        barId,
        product.productCategoryId
      );
    if (!findProductInCategory)
      throw new AppError(
        'No se encontró ningun producto en el bar con el ID especificado.',
        404
      );
    return product;
  }
  async createProductForBar(
    barId: number,
    { name, description, price, productCategoryId }: ProductProps
  ) {
    const category = await productCategoryService.findCategoryForBar(
      barId,
      productCategoryId
    );
    if (!category)
      throw new AppError('Esta categoria no existe en el bar.', 404);
    const product = await ProductModel.create({
      name,
      description,
      price,
      productCategoryId,
    });
    return product;
  }

  async findProductOr404(productId: number) {
    const product = await ProductModel.findOne({
      where: {
        id: productId,
      },
    });
    if (!product)
      throw new AppError(
        'No se encontró ningun producto con el ID especificado.',
        404
      );
    return product;
  }

  async updateProductForBar(
    productId: number,
    barId: number,
    { name, description, price, productCategoryId }: ProductProps
  ) {
    const product = await this.findProductForBarOr404(productId, barId);
    product.update({ name, description, price, productCategoryId });
    return product;
  }

  async removeProductForBar(productId: number, barId: number) {
    const product = await this.findProductForBarOr404(productId, barId);
    await product.destroy();
    return product;
  }
}

export default ProductService;
