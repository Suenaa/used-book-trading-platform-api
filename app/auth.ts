import { app } from './app';
import * as jwt from 'koa-jwt';

const jwtVerify = jwt({ secret: (<any>app).secret });

export default jwtVerify;

// export default async function auth(ctx: Context, next: () => Promise<any>) {

//   await jwtVerify(ctx, next);
//   console.log(ctx);

//   // const data = await jwt.verify(token.split(' ')[1] || '', (<any>app).secret);

//   // if (data && (<any>data).user) {
//   //   ctx.user = (<any>data).user;
//   //   return next();
//   // } else {
//   //   throw SoftError.create(ctx, '您还没有登陆', 401);
//   // }
// }