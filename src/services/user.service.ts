import { Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import prisma from '..//client';
import KEYS from '../config/keys';
import { v4 as uuidv4 } from 'uuid';
import { User } from '../models/user.model';
import HashUtils from '../utils/hashutils';
import RequestError from '../models/error.model';

export default class UserService {
  static async createUser(
    username: string,
    password?: string,
  ): Promise<User> {
    let hash = null;
    let salt = null;
    if (password) {
      salt = HashUtils.generateSalt(12);
      hash = HashUtils.hashPassword(password, salt);
    }
    const uuid = uuidv4();
    console.log('test123');
    try {
      const newUser = await prisma.user.create({
        data:{
          u_password: hash,
          u_username: username,
          u_salt: salt,
          u_uuid: uuid,
        },
      });
      return new User(
        newUser.u_id,
        newUser.u_uuid,
        newUser.u_username,
      );
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          // eslint-disable-next-line @typescript-eslint/no-throw-literal
          throw new RequestError(StatusCodes.CONFLICT, 'User already exist.');
        } else {
          // eslint-disable-next-line @typescript-eslint/no-throw-literal
          throw new RequestError(StatusCodes.INTERNAL_SERVER_ERROR, e.message);
        }
      }
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw new RequestError(StatusCodes.INTERNAL_SERVER_ERROR, e.message);
    }
  }

  static async deleteUser(id: bigint): Promise<null> {
    try {
      await prisma.user.delete({
        where: {
          u_id: id,
        },
      });
      return null;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  static async findUserByUsername(username: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          u_username: username,
        },
      });
      if (!user) return null;
      return new User(
        user?.u_id,
        user?.u_username,
        user?.u_uuid,
        user?.u_password,
        user?.u_salt,
      );
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  static async findUserByUuid(uuid: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          u_uuid: uuid,
        },
      });
      if (!user) return null;
      return new User(user?.u_id, user?.u_uuid, user?.u_username);
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  static hashPassword(password: string): [string, string] {
    const salt = HashUtils.generateSalt(12);
    const hash = HashUtils.hashPassword(password, salt);
    return [salt, hash];
  }

  static validatePassword(
    password: string,
    salt: string,
    tryPassword: string,
  ): boolean {
    const hash = HashUtils.hashPassword(tryPassword, salt);
    return hash === password;
  }

  static createAuthToken(user: User): string {
    return jwt.sign({ uuid: user.uuid }, KEYS.JWT_TOKEN_SECRET!, {
      expiresIn: '3600s',
    });
  }
}

