import {
  BarModel,
  ProfileModel,
  ProductModel,
  TableModel,
  ProductCategoryModel,
  BillOrderModel,
  OrderDetailModel,
  VerificationModel,
} from './';

const initModels = () => {
  //relacion uno a muchos bar con profile
  BarModel.hasMany(ProfileModel, { onDelete: 'RESTRICT' });
  ProfileModel.belongsTo(BarModel);
  //-----------------------
  //relacion uno a muchos bar con mesas
  BarModel.hasMany(TableModel, { onDelete: 'RESTRICT' });
  TableModel.belongsTo(BarModel);
  //-----------------------
  //relacion uno a muchos bar con categorias
  BarModel.hasMany(ProductCategoryModel, { onDelete: 'RESTRICT' });
  ProductCategoryModel.belongsTo(BarModel);
  //-----------------------
  //relacion uno a muchos categorias con productos
  ProductCategoryModel.hasMany(ProductModel, { onDelete: 'RESTRICT' });
  ProductModel.belongsTo(ProductCategoryModel);
  //-----------------------
  // relacion uno a muchos mesas con facturas
  TableModel.hasMany(BillOrderModel, { onDelete: 'RESTRICT' });
  BillOrderModel.belongsTo(TableModel);
  //-----------------------
  //relacion uno a muchos perfiles con facturas
  ProfileModel.hasMany(BillOrderModel, { onDelete: 'RESTRICT' });
  BillOrderModel.belongsTo(ProfileModel);
  //-----------------------
  //relacion uno a muchos facturas con ordenes
  BillOrderModel.hasMany(OrderDetailModel, { onDelete: 'RESTRICT' });
  OrderDetailModel.belongsTo(BillOrderModel);
  //-----------------------
  //relacion uno a uno producto con ordenes
  ProductModel.hasOne(OrderDetailModel, { onDelete: 'RESTRICT' });
  OrderDetailModel.belongsTo(ProductModel);
  //-----------------------
  //relacion uno a uno bar con codigo de verificacion
  BarModel.hasOne(VerificationModel, { foreignKey: 'barId' });
  VerificationModel.belongsTo(BarModel, { foreignKey: 'barId' });
  //-----------------------
};

export default initModels;
