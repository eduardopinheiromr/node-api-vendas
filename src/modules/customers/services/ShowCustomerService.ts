import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { ICustomerId } from '../domain/models/ICustomerId';
import Customer from '../infra/typeorm/entities/Customer';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';

class ShowCustomerService {
  public async execute({ id }: ICustomerId): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    return customer;
  }
}

export default ShowCustomerService;
