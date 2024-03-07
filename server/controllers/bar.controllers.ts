import { BarService } from "../services";
import { catchAsync } from "../utils";

const barService = new BarService()

const getBars = catchAsync(async (req, res, next) =>{
  const { barSession } = res.locals;
  const barId = barSession.id;
  const bars = await barService.findBarById(barId);
  res.status(200).json({ status: true, bars });
});

const deleteBar = catchAsync(async (req, res, next) =>{
  const { id } = req.params;
  await barService.removeBar(+id);
  res.status(204).json({ status: true, msg: 'Bar eliminado exitosamente.' });
});

const editBar = catchAsync(async (req, res, next) =>{
  const { body, params} = req;
  const { id } = params;
  const data = { ...body };
  const bar = await barService.updateBar(+id, data);
  res
    .status(200)
    .json({ status: true, msg: 'Bar editado exitosamente.', bar });
});

export {
  getBars,
  deleteBar,
  editBar
}
