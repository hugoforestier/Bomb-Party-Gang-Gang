import prisma, { Prisma } from '@prisma/client';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import KEYS from '../config/keys';
import { RequestError } from '../models/error.model';
import { User } from '../models/user.model';
import HashUtils from '../utils/hashutils';

export default class UserService {
  static async createUser(
    username: string,
    password?: string
  ): Promise<User> {
    let hash = null;
    let salt = null;
    if (password) {
      salt = HashUtils.generateSalt(12);
      hash = HashUtils.hashPassword(password, salt);
    }
    const uuid = uuidv4();

    try {
      const newUser = await prisma.user.create({
        data: {
          u_uuid: uuid,
          u_password: hash,
          u_username: username,
          u_salt: salt,
        },
      });
      return new User(
        newUser.u_uuid,
        newUser.u_username,
        newUser.u_email,
        newUser.u_provider_id
      );
    } catch (e: any) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new RequestError(StatusCodes.CONFLICT, 'User already exist.');
        } else {
          throw new RequestError(StatusCodes.INTERNAL_SERVER_ERROR, e.message);
        }
      }
      throw new RequestError(StatusCodes.INTERNAL_SERVER_ERROR, e.message);
    }
  }

  static async deleteUser(uuid: string): Promise<null> {
    try {
      await prisma.user.delete({
        where: {
          u_uuid: uuid,
        },
      });
      return null;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  static async confirmUser(uuid: string): Promise<null> {
    try {
      await prisma.user.update({
        where: {
          u_uuid: uuid,
        },
        data: {
          u_activated_email: true,
        },
      });
      return null;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  static async findUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await prisma.user.findUnique({
        where: {
          u_email: email,
        },
      });
      if (!user) return null;
      return new User(
        user?.u_uuid,
        user?.u_username,
        user?.u_password,
        user?.u_salt
      );
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
        user?.u_uuid,
        user?.u_username,
        user?.u_password,
        user?.u_salt
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
      return new User(user?.u_uuid, user?.u_username);
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
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return jwt.sign({ uuid: user.uuid }, KEYS.JWT_TOKEN_SECRET!, {
      expiresIn: '3600s',
    });
  }
}
