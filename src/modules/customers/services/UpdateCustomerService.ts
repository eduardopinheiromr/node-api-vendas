import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { IUpdateCustomer } from '../domain/models/IUpdateCustomer';
import Customer from '../infra/typeorm/entities/Customer';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';

class UpdateCustomerService {
  public async execute({
    id,
    name,
    email,
  }: IUpdateCustomer): Promise<Customer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customer = await customersRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found');
    }

    const customerUpdateEmail = await customersRepository.findByEmail(email);

    if (customerUpdateEmail && customerUpdateEmail.id !== customer.id) {
      throw new AppError('Email already in use');
    }

    customer.name = name;
    customer.email = email;

    await customersRepository.save(customer);

    return customer;
  }
}

export default UpdateCustomerService;
