import { ProductService } from '../services';
import { catchAsync } from '../utils';

const productService = new ProductService();

const getProductsForBar = catchAsync(async (req, res, next) => {
  const { profileSession } = res.locals;
  const products = await productService.findProductsForBar(
    profileSession.barId
  );
  res.status(200).json({ status: true, products });
});

const createProductForBar = catchAsync(async (req, res, next) => {
  const { body } = req;
  const { profileSession } = res.locals;
  const product = await productService.createProductForBar(
    profileSession.barId,
    body
  );
  res.status(200).json({ status: true, product });
});

const editProductForBar = catchAsync(async (req, res, next) => {
  const { body, params } = req;
  const { profileSession } = res.locals;
  const { id } = params;
  const product = await productService.updateProductForBar(
    +id,
    profileSession.barId,
    body
  );
  res.status(200).json({ status: true, product });
});

const deleteProductForBar = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { profileSession } = res.locals;
  await productService.removeProductForBar(+id, profileSession.barId);
  res
    .status(204)
    .json({ status: true, msg: 'Producto eliminado exitosamente.' });
});

export {
  getProductsForBar,
  createProductForBar,
  deleteProductForBar,
  editProductForBar,
};
