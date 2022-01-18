import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      email: 'admin@gmail.com',
      password: 'admin',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.email === username);
  }
}
