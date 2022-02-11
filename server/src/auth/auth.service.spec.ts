import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { RegisterDTO } from 'src/users/register.dto';
import { UsersModule } from 'src/users/users.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtSecret } from './constant';
import { PassportModule } from '@nestjs/passport';
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from 'src/models/User';
import { AuthController } from './auth.controller';

describe('AuthService', () => {
  let users : UsersService;
  let service: AuthService;
  let jwt: JwtService;
  let authcontroller: AuthController;
  // beforeEach(async () => {
  //   const module: TestingModule = await Test.createTestingModule({
  //     controllers: [AuthController],
  //     providers: [AuthService],
  //   }).compile();
  beforeEach(() => {
    users = new UsersService(null);
    jwt = new JwtService(null);
    service = new AuthService(users, jwt);
    authcontroller = new AuthController(service, users);
  });
    // service = module.get<AuthService>(AuthService);
  // });
  describe('root', () => {
    it('should return "LoGIN"', async () => {
      const result = 'Authentification=; HttpOnly; Path=/; Max-Age=0';
      jest.spyOn(service, 'cookieLogout').mockImplementation(() => result);
      // let userService: UsersService;
      // let registerdto : RegisterDTO
      // registerdto.email = 'root@gmail.com'
      // registerdto.password = 'root';
      // const user = userService.createUser(registerdto)
      expect(await service.cookieLogout()).toBe(result);
    });
  });
});