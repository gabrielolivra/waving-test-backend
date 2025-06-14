import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ItemRepository } from "../entity/item.entity";
import { CreateItemDto, UpdateItemDto } from "../controllers/dto/item.dto";

export class ItemService {

  constructor(
    @InjectRepository(ItemRepository)
    private itemRepository: Repository<ItemRepository>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<ItemRepository> {
    const item = this.itemRepository.create(createItemDto);
    return this.itemRepository.save(item);
  }

  async findAll(): Promise<ItemRepository[]> {
    return this.itemRepository.find();
  }

  async findOne(id: string): Promise<ItemRepository> {
    const item = await this.itemRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<ItemRepository> {
    const item = await this.findOne(id);
    this.itemRepository.merge(item, updateItemDto);
    return this.itemRepository.save(item);
  }

  async remove(id: string): Promise<void> {
    const item = await this.findOne(id);
    await this.itemRepository.remove(item);
  }

}