import { ProductModel, ProductCategoryModel } from '../database/models';
import { ProductCategoryProps } from '../interfaces';
import { AppError } from '../models';

class ProductCategoryService {
  constructor() {}

  async findCategoriesForBar(barId: number) {
    const category = await ProductCategoryModel.findAll({
      where: {
        barId,
      },
      include: {
        model: ProductModel,
      },
    });
    return category;
  }

  async findCategoryForBar(barId: number, productCategoryId: number) {
    if (!productCategoryId) throw new AppError('Verifique sus datos.', 409);
    const category = await ProductCategoryModel.findOne({
      where: {
        barId,
        id: productCategoryId,
      },
    });
    return category;
  }

  async createCategoryForBar({
    name,
    description,
    barId,
  }: ProductCategoryProps) {
    const category = await ProductCategoryModel.create({
      name,
      description,
      barId,
    });
    return category;
  }
  async updateCategoryForBar(
    categoryId: number,
    { name, description, barId }: ProductCategoryProps
  ) {
    const category = await ProductCategoryModel.findOne({
      where: {
        id: categoryId,
        barId,
      },
    });
    if (!category)
      throw new AppError(
        'No se encontró ninguna categoria en el bar con el ID especificado.',
        404
      );
    category.update({ name, description });
    return category;
  }
  async removeCategoryForBar(categoryId: number, barId: number) {
    const category = await ProductCategoryModel.findOne({
      where: {
        id: categoryId,
        barId,
      },
    });
    if (!category)
      throw new AppError(
        'No se encontró ninguna categoria en el bar con el ID especificado.',
        404
      );
    await category.destroy();
    return category;
  }
}

export default ProductCategoryService;
