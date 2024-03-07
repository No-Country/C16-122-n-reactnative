import { Role, TokenType } from '../interfaces';
import { AppError } from '../models';
import { BarService, ProfileService } from '../services';
import { catchAsync, verifyToken } from '../utils';

const barService = new BarService();
const profileService = new ProfileService();

const protect = (auths: TokenType[]) =>
  catchAsync(async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization || !authorization.startsWith('Bearer'))
      return next(
        new AppError(
          '¡Usted no se ha identificado! por favor inicie sesión para obtener acceso.',
          401
        )
      );
    const token = authorization.split(' ')[1];
    const { id, tokenType } = verifyToken(token);
    const correctTokenType = auths.includes(tokenType);

    if (tokenType === 'barSession') {
      if (!correctTokenType)
        throw new AppError(`Necesita iniciar sesión con su perfil.`, 401);

      const bar = await barService.findBarById(id);
      if (!bar)
        return next(
          new AppError(
            'El propietario de este token ya no está disponible.',
            401
          )
        );
      res.locals.barSession = bar;
    }
    if (tokenType === 'profileSession') {
      if (!correctTokenType)
        throw new AppError(`Necesita iniciar sesión.`, 401);
      const profile = await profileService.findProfileById(id);
      if (!profile)
        return next(
          new AppError(
            'El propietario de este token ya no está disponible.',
            401
          )
        );
      res.locals.profileSession = profile;
    }
    next();
  });

const checkRole = (roles: Role[]) =>
  catchAsync(async (req, res, next) => {
    const { profileSession } = res.locals;
    if (!roles.includes(profileSession.role)) {
      return next(
        new AppError(
          'Este perfil no tiene permisos para acceder a esta ruta.',
          403
        )
      );
    }
    next();
  });

export { protect, checkRole };
