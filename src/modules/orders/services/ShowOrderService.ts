import AppError from '@shared/errors/AppError';
import Order from '../infra/typeorm/entities/Order';
import { getCustomRepository } from 'typeorm';
import { OrderRepository } from '../infra/typeorm/repositories/OrdersRepository';
import { IOrderId } from '../domain/models/IOrderId';

class ShowOrderService {
  public async execute({ id }: IOrderId): Promise<Order> {
    const ordersRepository = getCustomRepository(OrderRepository);

    const order = await ordersRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found.');
    }

    return order;
  }
}

export default ShowOrderService;
