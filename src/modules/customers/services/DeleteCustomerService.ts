import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ICustomerId } from '../domain/models/ICustomerId';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';

class DeleteCustomerService {
  public async execute({ id }: ICustomerId): Promise<void> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    await customersRepository.remove(customer);
  }
}

export default DeleteCustomerService;
