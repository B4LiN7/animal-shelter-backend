import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ParamWithRequest = (paramKey: string) =>
  createParamDecorator((data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const param = request.params[paramKey];
    return { param, request };
  })();
