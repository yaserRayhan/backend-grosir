import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SHA1 } from 'crypto-js';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const checkEmail = await this.checkEmail(createUserDto.email);
    if (checkEmail.status) {
      createUserDto['username'] =
        createUserDto.username || createUserDto.email.split('@')[0];
    } else {
      return {
        statusCode: 400,
        message: checkEmail.message,
      };
    }
    createUserDto.password = SHA1(createUserDto.password).toString();
    const user = await this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll(req: any) {
    const where = [];

    if (req.search) {
      where.push(
        {
          name: Like(`%${req.search}%`),
        },
        {
          username: Like(`%${req.search}%`),
        },
        {
          email: Like(`%${req.search}%`),
        },
      );
    }
    //Get All User Data From Database
    const take = parseInt(req.pageSize ? req.pageSize : 10);
    const skip = ((req.page ? req.page : 1) - 1) * take;
    const users = await this.userRepository.findAndCount({
      take: take,
      skip: skip,
      where: where,
    });

    //Return All User Data
    return {
      statusCode: 200,
      message: 'Get All User Data',
      data: users[0],
      pagination: {
        page: parseInt(req.page ? req.page : 1),
        pageSize: take,
        total: users[1],
        totalPage: Math.ceil(users[1] / take),
      },
    };
  }

  findOne(username: string) {
    const user = this.userRepository.findOne({ where: { username: username } });
    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    console.log(updateUserDto);
    if (updateUserDto.password) {
      updateUserDto.password = SHA1(updateUserDto.password).toString();
    }
    const user = this.userRepository.update(id, updateUserDto);
    return user;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async daftar(createUserDto: CreateUserDto) {
    createUserDto.level = 'user';
    const checkEmail = await this.checkEmail(createUserDto.email);
    if (checkEmail.status) {
      createUserDto['username'] = createUserDto.email.split('@')[0];
    } else {
      return {
        statusCode: 400,
        message: checkEmail.message,
      };
    }
    try {
      createUserDto['password'] = SHA1(createUserDto.password).toString();
      console.log(createUserDto);
      const user = await this.userRepository.create(createUserDto);
      const save = await this.userRepository.save(user);
      return {
        statusCode: 200,
        message: 'User berhasil ditambahkan',
        data: save,
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: error.message,
      };
    }
  }

  async findEmail(email: string) {
    return await this.userRepository.findOne({
      where: {
        email: email,
      },
    });
  }

  async checkEmail(email: string) {
    const paternEmail = new RegExp(
      /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
    );
    if (
      email != null &&
      email != '' &&
      email != undefined &&
      paternEmail.test(email)
    ) {
      const checkEmail = await this.userRepository.findOne({
        where: {
          email: email,
        },
      });
      if (checkEmail) {
        return {
          status: false,
          message: 'Email sudah terdaftar',
        };
      }
    } else {
      return {
        status: false,
        message: 'Email tidak valid',
      };
    }

    return {
      status: true,
    };
  }
}
