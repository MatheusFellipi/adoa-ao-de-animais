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


const ENV_TEST = process.env.NODE_ENV === 'TEST';

container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  ENV_TEST ? UserRepositoryInMemory : UsersRepository
  
);
container.registerSingleton<IAnimalRepository>(
  "IAnimalRepository",
  ENV_TEST ? AnimalRepositoryInMemory : AnimalRepository

);
container.registerSingleton<IOrganizationRepository>(
  "IOrganizationRepository",
  ENV_TEST ? OrganizationRepositoryInMemory : OrganizationRepository
);
