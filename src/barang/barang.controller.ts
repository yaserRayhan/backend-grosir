import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { BarangService } from './barang.service';
import { CreateBarangDto } from './dto/create-barang.dto';
import { UpdateBarangDto } from './dto/update-barang.dto';
import { AuthAdminGuard } from 'src/auth/authAdmin.guard';

@Controller('barang')
export class BarangController {
  constructor(private readonly barangService: BarangService) {}

  @UseGuards(AuthAdminGuard)
  @Post()
  async create(@Body() createBarangDto: CreateBarangDto) {
    return await this.barangService.create(createBarangDto);
  }

  @Get()
  async findAll(@Req() req: any) {
    return await this.barangService.findAll(req.query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.barangService.findOne(+id);
  }

  @UseGuards(AuthAdminGuard)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateBarangDto: UpdateBarangDto) {
    return this.barangService.update(+id, updateBarangDto);
  }

  @UseGuards(AuthAdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.barangService.remove(+id);
  }
}
