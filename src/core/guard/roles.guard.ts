import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRepository } from 'src/modules/user/user.repository';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private userRepository: UserRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<any>('ROLES_KEY', [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }

    const { user } = await context.switchToHttp().getRequest();

    if (!user) return true;
    const userData = await this.userRepository.getUserByEmail(user.email);
    if (requiredRoles.some((role) => userData.role?.includes(role))) {
      return true;
    }
    // TODO: multiple language
    throw new UnauthorizedException('Quyền truy cập không hợp lệ');
  }
}
