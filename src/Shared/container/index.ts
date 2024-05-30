import { container } from "tsyringe";

import { IAnimalRepository } from "@modules/animal/infra/repositories/IAnimalRepository";
import { AnimalRepository } from "@modules/animal/infra/typeorm/repositories/AnimalRepository";
import { IOrganizationRepository } from "@modules/organization/infra/repositories/IOrganizationsRepository";
import { OrganizationRepository } from "@modules/organization/infra/typeorm/repositories/OrganizationRepository";
import { IUsersRepository } from "@modules/user/infra/repositories/IUsersRepository";
import { UsersRepository } from "@modules/user/infra/typeorm/repositories/UsersRepository";
import { UserRepositoryInMemory } from "@modules/user/infra/repositories/in-memory/UserRepositoryInMemory";
import { AnimalRepositoryInMemory } from "@modules/animal/infra/repositories/in-memory/AnimalRepositoryInMemory";
import { OrganizationRepositoryInMemory } from "@modules/organization/infra/repositories/in-memory/OrganizationRepositoryInMemory";
import { IAddressRepository } from "@modules/address/infra/repositories/IAddressRepository";
import { AddressRepository } from "@modules/address/infra/typeorm/repositories/addressRepository";
import { AddressRepositoryInMemory } from "@modules/address/infra/repositories/in-memory/AddressRepositoryInMemory";


const ENV_TEST = process.env.NODE_ENV === 'test';

container.registerSingleton<IUsersRepository>(
  "IUsersRepository",
  ENV_TEST ? UserRepositoryInMemory : UsersRepository
  
);

container.registerSingleton<IAddressRepository>(
  "IAddressRepository",
  ENV_TEST ? AddressRepositoryInMemory : AddressRepository
  
);

container.registerSingleton<IAnimalRepository>(
  "IAnimalRepository",
  ENV_TEST ? AnimalRepositoryInMemory : AnimalRepository

);
container.registerSingleton<IOrganizationRepository>(
  "IOrganizationRepository",
  ENV_TEST ? OrganizationRepositoryInMemory : OrganizationRepository
);
