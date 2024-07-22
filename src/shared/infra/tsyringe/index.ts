import { container } from "tsyringe";

import { IAnimalRepository } from "@modules/animal/infra/repositories/IAnimalRepository";
import { AnimalRepository } from "@modules/animal/infra/typeorm/repositories/Animal.repository";

import { IUsersRepository } from "@modules/user/infra/repositories/IUsersRepository";
import { IAddressRepository } from "@modules/address/infra/repositories/IAddressRepository";
import { IOrganizationRepository } from "@modules/organization/infra/repositories/IOrganizationsRepository";
import { ILinkRepository } from "@modules/contacts/infra/repositories/ILinksRepository";
import { IContactRepository } from "@modules/contacts/infra/repositories/IContactRepository";
import { IVaccinationRepository } from "@modules/animal/infra/repositories/IVaccinationRepository";
import { VaccinationRepository } from "@modules/animal/infra/typeorm/repositories/Vaccination.repository";
import { IVaccinationCardRepository } from "@modules/animal/infra/repositories/IVaccinationCardRepository";
import { IDoseRepository } from "@modules/animal/infra/repositories/IDoseRepository";
import { DoseRepository } from "@modules/animal/infra/typeorm/repositories/RelationshipVaccination.repository";
import { IAccountRepository } from "@modules/account/infra/repositories/IAccountRepository";
import { ITokenRepository } from "@modules/account/infra/repositories/ITokenRepository";
import { TokenRepository } from "@modules/account/infra/typeorm/repositories/Token.repository";
import { UsersRepository } from "@modules/user/infra/typeorm/repositories/Users.repository";
import { AccountRepository } from "@modules/account/infra/typeorm/repositories/Account.repository";
import { IPhotosRepository } from "@modules/photos/infra/repositories/IPhotosRepository";
import { OrganizationRepository } from "@modules/organization/infra/typeorm/repositories/Organization.repository";
import { PhotoRepository } from "@modules/photos/infra/typeorm/repositories/Photo.repository";
import { AddressRepository } from "@modules/address/infra/typeorm/repositories/address.repository";
import { ContactRepository } from "@modules/contacts/infra/typeorm/repositories/contact.repository";
import { VaccinationCardRepository } from "@modules/animal/infra/typeorm/repositories/Vaccinationcard.repository";
import { LinkRepository } from "@modules/contacts/infra/typeorm/repositories/link.repository";
import { ICityRepository } from "@modules/address/infra/repositories/ICityRepository";
import { IStateRepository } from "@modules/address/infra/repositories/IStateRepository";
import { CityRepository } from "@modules/address/infra/typeorm/repositories/City.repository";
import { StateRepository } from "@modules/address/infra/typeorm/repositories/State.repository";
import { UserRepositoryInMemory } from "@modules/user/infra/repositories/in-memory/User.Repository.InMemory";
import { AddressRepositoryInMemory } from "@modules/address/infra/repositories/in-memory/Address.Repository.InMemory";
import { AnimalRepositoryInMemory } from "@modules/animal/infra/repositories/in-memory/Animal.repository.inMemory";
import { OrganizationRepositoryInMemory } from "@modules/organization/infra/repositories/in-memory/Organization.Repository.InMemory";
import { VaccinationRepositoryInMemory } from "@modules/animal/infra/repositories/in-memory/Vaccination.repository.inMemory";
import { VaccinationCardRepositoryInMemory } from "@modules/animal/infra/repositories/in-memory/VaccinationCard.repository.inMemory";
import { AccountRepositoryInMemory } from "@modules/account/infra/repositories/in-memory/Account.repository.inMemory copy";
import { TokenRepositoryInMemory } from "@modules/account/infra/repositories/in-memory/Token.Repository.InMemory";

const ENV_TEST = process.env.NODE_ENV === "test";

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

container.registerSingleton<ILinkRepository>("ILinkRepository", LinkRepository);

container.registerSingleton<IContactRepository>(
  "IContactRepository",
  ContactRepository
);

container.registerSingleton<IVaccinationRepository>(
  "IVaccinationRepository",
  ENV_TEST ?  VaccinationRepositoryInMemory  : VaccinationRepository
);

container.registerSingleton<IVaccinationCardRepository>(
  "IVaccinationCardRepository",
  ENV_TEST ?  VaccinationCardRepositoryInMemory  : VaccinationCardRepository
);

container.registerSingleton<IDoseRepository>("IDoseRepository", DoseRepository);

container.registerSingleton<IAccountRepository>(
  "IAccountRepository",
 AccountRepositoryInMemory 
);

container.registerSingleton<ITokenRepository>(
  "ITokenRepository",
  ENV_TEST ?  TokenRepositoryInMemory  : TokenRepository
);

container.registerSingleton<IPhotosRepository>(
  "IPhotosRepository",
  PhotoRepository
);

container.registerSingleton<ICityRepository>("ICityRepository", CityRepository);

container.registerSingleton<IStateRepository>(
  "IStateRepository",
  StateRepository
);
