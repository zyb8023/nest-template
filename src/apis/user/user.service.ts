import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '@app/entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  @InjectRepository(User)
  private userRepository: Repository<User>;

  async login(user: any) {
    const findUser = await this.userRepository.findOneBy({
      username: user.userName,
    });

    if (!findUser) {
      throw new HttpException('用户不存在', HttpStatus.ACCEPTED);
    }

    if (user.password !== findUser.password) {
      throw new HttpException('密码错误', HttpStatus.ACCEPTED);
    }
    return findUser;
  }

  async findByUsername(username: string) {
    const user = await this.userRepository.findOne({
      where: {
        username,
      },
      relations: {
        permissions: true,
      },
    });
    return user;
  }
}
