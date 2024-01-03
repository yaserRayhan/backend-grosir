import {
  Controller,
  Get,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Req,
  Post,
} from '@nestjs/common';
import { TransaksiService } from './transaksi.service';
import { UpdateTransaksiDto } from './dto/update-transaksi.dto';
import { AuthAdminGuard } from 'src/auth/authAdmin.guard';
import { AuthUserGuard } from 'src/auth/authUser.guard';
import { CreateTransaksiDto } from './dto/create-transaksi.dto';

@Controller('transaksi')
export class TransaksiController {
  constructor(private readonly transaksiService: TransaksiService) {}

  @UseGuards(AuthAdminGuard)
  @Get()
  findAll() {
    return this.transaksiService.findAll();
  }

  @UseGuards(AuthUserGuard)
  @Post('pembelian')
  async findPembelian(
    @Req() req,
    @Body() createTransaksiDto: CreateTransaksiDto,
  ) {
    return await this.transaksiService.createPembelian(
      req.user.id,
      createTransaksiDto,
    );
  }

  @UseGuards(AuthUserGuard)
  @Get('my')
  async findMy(@Req() req) {
    return await this.transaksiService.findMy(req.user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.transaksiService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTransaksiDto: UpdateTransaksiDto,
  ) {
    return this.transaksiService.update(+id, updateTransaksiDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.transaksiService.remove(+id);
  }
}
