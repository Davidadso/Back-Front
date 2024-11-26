import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.getAllAndOverride<number[]>('ROLES_KEY', [
      context.getHandler(),
      context.getClass(),
    ]);
    
    console.log('Roles Permitidos.',roles);
    
    if (!roles) {
      return true;
    }

    const { user } = context.switchToHttp().getRequest();
    
    if (!roles.includes(user.idRol)) {
      throw new UnauthorizedException(
        'No tienes permisos para acceder a esta ruta',
      );
    }
    return true;
  }
}
