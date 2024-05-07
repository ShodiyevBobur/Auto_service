import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Observable } from 'rxjs';
// import { Observable } from 'rxjs';

@Injectable()
export class SelfAdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    console.log('req', req.admin);

    console.log('req.admin ', req.admin);
    console.log('req.params.id  ', req.params.id);
    console.log('req.admin.id  ', req.params.id);

    console.log(req.admin.id);
    
    if (String(req.admin.id) != req.params.id) {
      throw new ForbiddenException({
        message: 'Ruxsat etilmagan admin',
      });
    }

    if (req.admin.is_active === false) {
      throw new ForbiddenException({
        message:
          'Ruxsat etilmagan admin',
      });
    }
    return true;
  }
}
