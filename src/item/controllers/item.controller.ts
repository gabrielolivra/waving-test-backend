import {
  Body,
  Controller,
  Delete,
  Get,
  Injectable,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ItemService } from '../services/item.service';
import { CreateItemDto, UpdateItemDto } from './dto/item.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Role } from 'src/auth/role.enum';
import { Roles } from 'src/shared/decorators/roles.decorator';

@Controller('item')
@Injectable()
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('')
  async findAll() {
    return await this.itemService.findAll();
  }
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.User)
  @Get('items-available')
  async itemsAvailable() {
    return await this.itemService.listAvailableItems();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('/:id')
  async find(@Param('id') id: string) {
    return await this.itemService.findOne(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post('')
  async create(@Body() createItemDto: CreateItemDto) {
    return await this.itemService.create(createItemDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Put('/:id')
  async update(@Param('id') id: string, @Body() updateItemDto: UpdateItemDto) {
    return await this.itemService.update(id, updateItemDto);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete('/:id')
  async remove(@Param('id') id: string) {
    return await this.itemService.remove(id);
  }
}
