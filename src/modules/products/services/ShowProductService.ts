import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import { IProductId } from '../domain/models/IProductId';

class ListProductService {
  public async execute({ id }: IProductId): Promise<Product | undefined> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    return product;
  }
}

export default ListProductService;
