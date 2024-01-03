import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartDto } from './dto/create-cart.dto';
import { AuthUserGuard } from 'src/auth/authUser.guard';

@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @UseGuards(AuthUserGuard)
  @Post()
  async create(@Body() createCartDto: CreateCartDto, @Req() req) {
    return await this.cartService.create(createCartDto, req.user.id);
  }

  @UseGuards(AuthUserGuard)
  @Get()
  async findAll(@Req() req) {
    return await this.cartService.findAll(req.user.id);
  }

  @UseGuards(AuthUserGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cartService.findOne(+id);
  }

  @UseGuards(AuthUserGuard)
  @Delete(':id')
  remove(@Param('id') id: string, @Req() req) {
    return this.cartService.remove(+id, req.user.id);
  }
}
