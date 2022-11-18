// import {
//   ForbiddenException,
//   HttpException,
//   HttpStatus,
//   Injectable,
//   NestMiddleware,
// } from '@nestjs/common';
// import { JwtSecretRequestType, JwtService } from '@nestjs/jwt';
// import { NextFunction, Request, Response } from 'express';
// import { AuthService } from 'src/auth/auth.service';
// import { UsersService } from 'src/users/users.service';
// import { JwtPayload } from '../jwt/jwt-payload.interface';
// import { verify } from 'jsonwebtoken';

// @Injectable()
// export class AuthMiddleware implements NestMiddleware {
//   constructor(private readonly userService: UsersService) {}

//   async use(req: Request, res: Response, next: () => void) {
//     const bearerHeader = req.headers.authorization;
//     const accessToken = bearerHeader && bearerHeader.split(' ')[1];
//     let user;

//     if (!accessToken || !accessToken) {
//       return next();
//     }
//     try {
//       const { id, email, active }: JwtPayload = verify(
//         accessToken,
//         'super-sign',
//       );
//       user = await this.userService.findById(id);
//     } catch (e) {
//       throw new ForbiddenException();
//     }

//     if (user) {
//       req.user = user;
//     }
//     next();
//   }
// }
