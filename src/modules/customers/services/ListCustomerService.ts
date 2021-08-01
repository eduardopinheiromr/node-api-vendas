import { getCustomRepository } from 'typeorm';
import { IPaginateCustomer } from '../domain/models/IPaginateCustomer';
import CustomersRepository from '../infra/typeorm/repositories/CustomersRepository';

class ListCustomerService {
  public async execute(): Promise<IPaginateCustomer> {
    const customersRepository = getCustomRepository(CustomersRepository);

    const customers = await customersRepository.createQueryBuilder().paginate();

    return customers as IPaginateCustomer;
  }
}

export default ListCustomerService;
