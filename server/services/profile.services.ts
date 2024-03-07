import { ProfileModel } from '../database/models';
import { ProfileProps } from '../interfaces/profile';
import { AppError } from '../models';
import { encrypt } from '../utils';

class ProfileService {
  constructor() {}

  async findProfilesForBar(barId: number) {
    const profiles = await ProfileModel.findAll({
      where: {
        barId,
      },
    });
    return profiles;
  }

  async profileIdsForBar(barId: number) {
    const profiles = await ProfileModel.findAll({
      where: {
        barId,
      },
      attributes: ['id'],
    });
    const profileIds = profiles.map(profile => profile.id);
    return profileIds;
  }

  async createProfileForBar({ name, role, pinCode, barId }: ProfileProps) {
    const hashedPin = await encrypt(pinCode);
    const profile = await ProfileModel.create({
      name,
      role,
      pinCode: hashedPin,
      barId,
    });
    return profile;
  }
  async updateProfileForBar(
    profileId: number,
    { name, role, pinCode, barId }: ProfileProps
  ) {
    const profile = await ProfileModel.findOne({
      where: {
        id: profileId,
        barId,
      },
    });
    if (!profile)
      throw new AppError(
        'No se encontró ningún perfil en el bar con el ID especificado.',
        404
      );
    const hashedPin = await encrypt(pinCode);
    profile.update({ name, role, pinCode: hashedPin });
    return profile;
  }
  async removeProfileForBar(profileId: number, barId: number) {
    const profile = await ProfileModel.findOne({
      where: {
        id: profileId,
        barId,
      },
    });
    if (!profile)
      throw new AppError(
        'No se encontró ningún perfil en el bar con el ID especificado.',
        404
      );
    await profile.destroy();
    return profile;
  }

  async findProfileById(id: number) {
    const profile = await ProfileModel.findByPk(id);
    return profile;
  }

  async findProfileForBar(profileId: number, barId: number) {
    if (!profileId) throw new AppError('Verifique sus datos.', 401);
    const profile = await ProfileModel.findOne({
      where: {
        barId,
        id: profileId,
      },
    });
    return profile;
  }
  async findProfileByIdAndBarIdOr404(profileId: number, barId: number) {
    if (!profileId || !barId)
      throw new AppError('Credenciales incorrectas. Verifique sus datos.', 401);
    const profile = await ProfileModel.findOne({
      where: {
        id: profileId,
        barId,
      },
    });
    if (!profile)
      throw new AppError('Credenciales incorrectas. Verifique sus datos.', 401);
    return profile;
  }
}

export default ProfileService;
