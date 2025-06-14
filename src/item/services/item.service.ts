import { NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, MoreThan } from "typeorm";
import { ItemEntity } from "../entity/item.entity";
import { CreateItemDto, UpdateItemDto } from "../controllers/dto/item.dto";

export class ItemService {

  constructor(
    @InjectRepository(ItemEntity)
    private itemRepository: Repository<ItemEntity>,
  ) {}

  async create(createItemDto: CreateItemDto): Promise<ItemEntity> {
    const item = this.itemRepository.create(createItemDto);
    return this.itemRepository.save(item);
  }

  async findAll(): Promise<ItemEntity[]> {
    return this.itemRepository.find();
  }

  async findOne(id: string): Promise<ItemEntity> {
    const item = await this.itemRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async update(id: string, updateItemDto: UpdateItemDto): Promise<ItemEntity> {
    const item = await this.findOne(id);
    this.itemRepository.merge(item, updateItemDto);
    return this.itemRepository.save(item);
  }

  async remove(id: string): Promise<void> {
    const item = await this.findOne(id);
    await this.itemRepository.remove(item);
  }

  async listAvailableItems(){
    const items = await this.itemRepository.find({
      where: {
        stockQuantity: MoreThan(0)
      }
    })
    return items
  }

}