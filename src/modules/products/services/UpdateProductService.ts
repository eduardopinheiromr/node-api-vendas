import AppError from '@shared/errors/AppError';
import Product from '../infra/typeorm/entities/Product';
import { getCustomRepository } from 'typeorm';
import { ProductRepository } from '../infra/typeorm/repositories/ProductsRepository';
import redisCache from '@shared/cache/RedisCache';
import { IUpdateProduct } from '../domain/models/IUpdateProduct';

class UpdateProductService {
  public async execute({
    id,
    name,
    price,
    quantity,
  }: IUpdateProduct): Promise<Product> {
    const productsRepository = getCustomRepository(ProductRepository);

    const product = await productsRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found');
    }

    const productExists = await productsRepository.findByName(name);

    if (productExists) {
      throw new AppError(`Product ${name} already exists`);
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productsRepository.save(product);

    return product;
  }
}

export default UpdateProductService;
