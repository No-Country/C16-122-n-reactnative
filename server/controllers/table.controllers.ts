import { TableService } from '../services';
import { catchAsync } from '../utils';

const tableService = new TableService();

const getTablesForBar = catchAsync(async (req, res, next) => {
  const { profileSession } = res.locals;
  const tables = await tableService.findTablesForBar(profileSession.barId);
  res.status(200).json({ status: true, tables });
});

const createTableForBar = catchAsync(async (req, res, next) => {
  const { body } = req;
  const { profileSession } = res.locals;
  const data = { ...body, barId: profileSession.barId };
  const profile = await tableService.createTableForBar(data);
  res.status(200).json({ status: true, profile });
});

const deleteTableForBar = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { profileSession } = res.locals;
  await tableService.removeTableForBar(+id, profileSession.barId);
  res.status(204).json({ status: true, msg: 'Mesa eliminado exitosamente.' });
});
const editableForBar = catchAsync(async (req, res, next) => {
  const { body, params } = req;
  const { profileSession } = res.locals;
  const { id } = params;
  const data = { ...body, barId: profileSession.barId };
  const table = await tableService.updateTableForBar(+id, data);
  res.status(200).json({ status: true, table });
});

export {
  getTablesForBar,
  createTableForBar,
  deleteTableForBar,
  editableForBar,
};
