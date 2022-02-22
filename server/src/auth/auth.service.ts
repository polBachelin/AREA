import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    
  ) {}

  async validateUser(email: string): Promise<any> {
    return await this.usersService.findOne(email)
  }

  async signUser(user: any) {
    const payload = { email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }

  public cookieLogout() {
    return 'Authentification=; HttpOnly; Path=/; Max-Age=0';
  }

  public verify(token: string) {
    token = token.replace("Bearer ", "");
    return this.jwtService.verify(token);
  }
}
