import { Injectable } from "@nestjs/common";
import { ItemService } from "../services/item.service";

@Injectable()
export class ItemController {
    constructor(private readonly itemService: ItemService) {}

}