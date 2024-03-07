import { ProfileService } from '../services';
import { catchAsync } from '../utils';

const profileService = new ProfileService();

const getProfilesForBar = catchAsync(async (req, res, next) => {
  const { barSession, profileSession } = res.locals;
  const barId = barSession ? barSession.id : profileSession.barId;
  const profiles = await profileService.findProfilesForBar(barId);
  res.status(200).json({ status: true, profiles });
});

const createProfileForBar = catchAsync(async (req, res, next) => {
  const { body } = req;
  const { profileSession } = res.locals;
  const data = { ...body, barId: profileSession.barId };
  const profile = await profileService.createProfileForBar(data);
  res
    .status(200)
    .json({ status: true, profile: { ...profile.get(), pinCode: 'unknow' } });
});

const deleteProfileForBar = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const { profileSession } = res.locals;
  await profileService.removeProfileForBar(+id, profileSession.barId);
  res.status(204).json({ status: true, msg: 'Perfil eliminado exitosamente.' });
});
const editProfileForBar = catchAsync(async (req, res, next) => {
  const { body, params } = req;
  const { profileSession } = res.locals;
  const { id } = params;
  const data = { ...body, barId: profileSession.barId };
  const profile = await profileService.updateProfileForBar(+id, data);
  res
    .status(200)
    .json({ status: true, profile: { ...profile.get(), pinCode: 'unknow' } });
});

export {
  getProfilesForBar,
  createProfileForBar,
  deleteProfileForBar,
  editProfileForBar,
};
