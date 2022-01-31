import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { HttpService } from '@nestjs/axios';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import {map, lastValueFrom, tap} from 'rxjs'

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private httpService: HttpService
  ) {}

  async validateUser(email: string): Promise<any> {
    return await this.usersService.findOne(email)
  }

  async signUser(user: any) {
    const payload = { email: user.email };
    return { access_token: this.jwtService.sign(payload) };
  }

  async sendNotionCode(code: string) {
    const codeUrl = "https://api.notion.com/v1/oauth/token"
    const notionAuthorization = "NjkxNTY1MDctYjJhMC00NmFjLWFlYTktYWZlNWE0MjI3YjFmOnNlY3JldF8xSUVTZXNxUVNRZU5sWElkMVFmc25acnpjMno2YTM1YUZwa1VJT0x5ckVl"
    const codeRedirect = "http%3A%2F%2Flocalhost%3A8080%2Fauth%2Fnotion"
    const requestConfig: AxiosRequestConfig = {
      headers: {
        'Content-Type': 'application/json', 'Authorization': 'Base ' + notionAuthorization, 'Access-Control-Allow-Origin': '*'
      },
      params: {
        'grant_type': 'authorization_code',
        'code': code,
        'redirect_uri': codeRedirect  
      }
    }
    const response = await lastValueFrom(
      this.httpService.post(codeUrl, null, requestConfig).pipe(
        tap((resp) => console.log(resp)),
        map((resp) => {
          resp.data
        }),
        tap((data) => console.log(data))
      )
    );
  };
}
