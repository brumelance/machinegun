import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {RoleEnum} from "./role.enum";

export const IsAdmin = createParamDecorator((data, ctx: ExecutionContext): boolean => {
    const req = ctx.switchToHttp().getRequest();
    return req.user.role === RoleEnum.ADMIN;
});
