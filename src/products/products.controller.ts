import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductDTO } from './product.dto';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async createProduct(
    @Body()
    data: ProductDTO,
  ) {
    return this.productsService.createProduct(data);
  }

  @Get(':id')
  async getProduct(@Param('id') id: string) {
    return this.productsService.getProduct(id);
  }

  @Get()
  async getProducts() {
    return this.productsService.getProducts();
  }

  @Put(':id')
  async updateProduct(
    @Param('id') id: string,
    @Body()
    data: ProductDTO,
  ) {
    return this.productsService.update(id, data);
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
