import {Request} from 'express';

export interface RequestWithUser extends Request {
  user: {
    username: string;
    password: string;
    userId: string;
  }
}