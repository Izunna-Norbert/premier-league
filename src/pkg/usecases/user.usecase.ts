import { IAdvancedFind, ICreateUser, ISignIn, IUpdateUser, IUserUseCaseResponse } from '../interfaces/user.interface';
import UserRepo from '../repos/user.repo';

export default class UserUseCase {
  private readonly userRepo: UserRepo;

  constructor(userRepo: UserRepo) {
    this.userRepo = userRepo;
  }

  async createUser(payload: ICreateUser): Promise<IUserUseCaseResponse> {
    try {
      const { email } = payload;
      const userExists = await this.userRepo.findOneByEmail(email);
      if (userExists) {
        return {
          success: false,
          message: 'User already exists',
        };
      }
      const user = await this.userRepo.create(payload);
      if (!user) {
        return {
          success: false,
          message: 'Cannot create user',
        };
      }
      const token = user.generateToken();
      return {
        success: true,
        message: 'User created successfully',
        data: { token, user },
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot create user',
        error: error.message,
      };
    }
  }

  async createAdmin(payload: ICreateUser): Promise<IUserUseCaseResponse> {
    try {
      const { email } = payload;
      const userExists = await this.userRepo.findOneByEmail(email);
      if (userExists) {
        return {
          success: false,
          message: 'User already exists',
        };
      }
      const params = { ...payload, isAdmin: true };
      const user = await this.userRepo.create(params);
      if (!user) {
        return {
          success: false,
          message: 'Cannot create admin',
        };
      }
      return {
        success: true,
        message: 'Admin created successfully',
        data: user,
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot create admin',
        error: error.message,
      };
    }
  }

  async signIn(payload: ISignIn): Promise<IUserUseCaseResponse> {
    try {
      const { email, password } = payload;
      const user = await this.userRepo.findOneByEmail(email);
      if (!user) {
        return {
          success: false,
          message: 'User not found',
        };
      }
      const isMatch = await user.comparePassword(password);
      if (!isMatch) {
        return {
          success: false,
          message: 'Wrong password',
        };
      }
      const token = user.generateToken();
      return {
        success: true,
        message: 'User signed in successfully',
        data: { token, user },
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot sign in',
        error: error.message,
      };
    }
  }

  async findOneById(id: string): Promise<IUserUseCaseResponse> {
    try {
      const user = await this.userRepo.findOneById(id);
      if (!user) {
        return {
          success: false,
          message: 'User not found',
        };
      }
      return {
        success: true,
        message: 'User found',
        data: user,
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot find user',
        error: error.message,
      };
    }
  }

  async updateOneById(id: string, payload: IUpdateUser): Promise<IUserUseCaseResponse> {
    try {
      const { email } = payload;
      if (email) {
        const userExists = await this.userRepo.findOneByEmail(email);
        if (userExists) {
          return {
            success: false,
            message: 'User already exists',
          };
        }
      }
      const user = await this.userRepo.updateOneById(id, payload);
      if (!user) {
        return {
          success: false,
          message: 'User not found',
        };
      }
      return {
        success: true,
        message: 'User updated',
        data: user,
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot update user',
        error: error.message,
      };
    }
  }

  async deleteOneById(id: string): Promise<IUserUseCaseResponse> {
    try {
      const user = await this.userRepo.deleteOneById(id);
      if (!user) {
        return {
          success: false,
          message: 'User not found',
        };
      }
      return {
        success: true,
        message: 'User deleted',
        data: user,
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot delete user',
        error: error.message,
      };
    }
  }

  async findAll(): Promise<IUserUseCaseResponse> {
    try {
      const users = await this.userRepo.findAll();
      if (!users) {
        return {
          success: false,
          message: 'Users not found',
        };
      }
      return {
        success: true,
        message: 'Users found',
        data: users,
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot find users',
        error: error.message,
      };
    }
  }

  async advancedFind(payload: IAdvancedFind): Promise<IUserUseCaseResponse> {
    try {
      const users = await this.userRepo.advancedFind(payload);
      if (!users) {
        return {
          success: false,
          message: 'No data found',
        };
      }
      return {
        success: true,
        message: 'Data found',
        data: users,
      };
    } catch (error: any) {
      console.error('error', error);
      return {
        success: false,
        message: 'Cannot find data',
        error: error.message,
      };
    }
  }
}
