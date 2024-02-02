import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { User } from "./user.entity";

// This extracts the user from the request.
// This was set due the way AuthGuard works. 
// But since the user is not given in parameter, it gets it from execution context
// Here execution context is the context for the specific handler where the param is decorated with this decorator

export const GetUser = createParamDecorator(
  (data, ctx: ExecutionContext): User => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
  }
);
