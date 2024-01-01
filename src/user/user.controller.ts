// eslint-disable-next-line prettier/prettier
import { Controller, Get, Post, Body, Param, Delete, Query, UseGuards, Put, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthAdminGuard } from 'src/auth/authAdmin.guard';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthAdminGuard)
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @UseGuards(AuthAdminGuard)
  @Get()
  async findAll(@Query() req: any) {
    return await this.userService.findAll(req);
  }

  @UseGuards(AuthGuard)
  @Put('me')
  async updateMe(@Body() updateUserDto: UpdateUserDto, @Req() req: any) {
    return await this.userService.update(req.user.id, updateUserDto);
  }

  @UseGuards(AuthAdminGuard)
  @Get(':username')
  findOne(@Param('username') username: string) {
    return this.userService.findOne(username);
  }

  @UseGuards(AuthAdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }
  @UseGuards(AuthAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('daftar')
  async daftar(@Body() createUserDto: CreateUserDto) {
    return await this.userService.daftar(createUserDto);
  }
}
