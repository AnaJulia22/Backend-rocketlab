import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { ProductDTO } from './product.dto';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async createProduct(data: ProductDTO) {
    try {
      const productExists = await this.prisma.product.findFirst({
        where: {
          name: data.name,
        },
      });
      if (productExists) {
        throw new Error('Product already exists');
      }

      const product = await this.prisma.product.create({
        data,
      });

      return product;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  async getProduct(id: string): Promise<Product> {
    return await this.prisma.product.findUnique({
      where: { id },
    });
  }

  async getProducts(): Promise<Product[]> {
    return await this.prisma.product.findMany();
  }

  async update(id: string, data: ProductDTO) {
    const productExists = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!productExists) {
      throw new Error('Product does not exists!');
    }

    return await this.prisma.product.update({
      data,
      where: {
        id,
      },
    });
  }

  async delete(id: string) {
    const productExists = await this.prisma.product.findUnique({
      where: {
        id,
      },
    });

    if (!productExists) {
      throw new Error('Product does not exists!');
    }

    return await this.prisma.product.delete({
      where: {
        id,
      },
    });
  }
}
