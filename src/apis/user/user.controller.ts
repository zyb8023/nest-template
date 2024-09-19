import { Body, Controller, Get, Inject, Post, Session } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor() {}

  @Inject() readonly userService: UserService;

  @Get()
  getUserHello() {
    return {
      data: '操作成功！',
    };
  }

  @Post('login')
  async login(@Body() user: any) {
    const findUser = await this.userService.login(user);
    return {
      msg: '登陆成功',
      data: findUser,
    };
  }
}
