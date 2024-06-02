import { container } from "tsyringe";

import { IAnimalRepository } from "@modules/animal/infra/repositories/IAnimalRepository";
import { AnimalRepository } from "@modules/animal/infra/typeorm/repositories/Animal.repository";

import { IUsersRepository } from "@modules/user/infra/repositories/IUsersRepository";
import { UsersRepository } from "@modules/user/infra/typeorm/repositories/UsersRepository";
import { UserRepositoryInMemory } from "@modules/user/infra/repositories/in-memory/UserRepositoryInMemory";
import { AnimalRepositoryInMemory } from "@modules/animal/infra/repositories/in-memory/AnimalRepositoryInMemory";
import { IAddressRepository } from "@modules/address/infra/repositories/IAddressRepository";
import { AddressRepository } from "@modules/address/infra/typeorm/repositories/address.repository";
import { AddressRepositoryInMemory } from "@modules/address/infra/repositories/in-memory/AddressRepositoryInMemory";
import { IOrganizationRepository } from "@modules/organization/infra/repositories/IOrganizationsRepository";
import { OrganizationRepository } from "@modules/organization/infra/typeorm/repositories/OrganizationRepository";
import { OrganizationRepositoryInMemory } from "@modules/organization/infra/repositories/in-memory/OrganizationRepositoryInMemory";
import { ILinkRepository } from "@modules/contacts/infra/repositories/ILinksRepository";
import { LinkRepository } from "@modules/contacts/infra/typeorm/repositories/link.repository";
import { IContactRepository } from "@modules/contacts/infra/repositories/IContactRepository";
import { ContactRepository } from "@modules/contacts/infra/typeorm/repositories/contact.repository";
import { IVaccinationRepository } from "@modules/animal/infra/repositories/IVaccinationRepository";
import { VaccinationRepository } from "@modules/animal/infra/typeorm/repositories/Vaccination.repository";
import { IVaccinationCardRepository } from "@modules/animal/infra/repositories/IVaccinationCardRepository";
import { VaccinationCardRepository } from "@modules/animal/infra/typeorm/repositories/Vaccinationcard.repository";
import { IDoseRepository } from "@modules/animal/infra/repositories/IDoseRepository";
import { DoseRepository } from "@modules/animal/infra/typeorm/repositories/RelationshipVaccination.repository";


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

container.registerSingleton<ILinkRepository>(
  "ILinkRepository",
  LinkRepository
);

container.registerSingleton<IContactRepository>(
  "IContactRepository",
  ContactRepository
);

container.registerSingleton<IAnimalRepository>(
  "IAnimalRepository",
  ENV_TEST ? AnimalRepositoryInMemory : AnimalRepository
);

container.registerSingleton<IVaccinationRepository>(
  "IVaccinationRepository",
  VaccinationRepository
);

container.registerSingleton<IVaccinationCardRepository>(
  "IVaccinationCardRepository",
  VaccinationCardRepository
);

container.registerSingleton<IDoseRepository>(
  "IDoseRepository",
  DoseRepository
);

