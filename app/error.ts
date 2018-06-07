import { Context } from 'koa';

export async function errorHandler(ctx: Context, next: () => Promise<any>) {
  try {
    await next();
  } catch (e) {
    if (e instanceof SoftError) {
      ctx.body = e.message;
    } else {
      ctx.body = {
        stack: e.stack,
        message: e.message,
      };
      ctx.status = 500;
    }
  }
}

export class SoftError extends Error {
  constructor(message?: string) {
    super(message);
  }

  static create(ctx: Context, msg?: string, status?: number) {
    ctx.status = status || 400;
    return new SoftError(msg);
  }
}

export class HardError extends Error {
  constructor(message?: string) {
    super(message);
  }

  static create(ctx: Context,  msg?: string, status?: number) {
    ctx.status = status || 500;
    return new HardError(msg);
  }
}
