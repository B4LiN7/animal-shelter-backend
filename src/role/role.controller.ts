import { Controller, Get } from '@nestjs/common';
import { RoleService } from './role.service';

@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  async getRoles() {
    return {
      message:
        'This endpoint not meant to be used by the client. It is for internal use only, yet.',
    };
  }
}
