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
import { AddressRepository } from "@modules/address/infra/typeorm/repositories/Address.repository";
import { OrganizationRepository } from "@modules/organization/infra/typeorm/repositories/Organization.repository";
import { LinkRepository } from "@modules/contacts/infra/typeorm/repositories/Link.repository";
import { ContactRepository } from "@modules/contacts/infra/typeorm/repositories/Contact.repository";
import { VaccinationCardRepository } from "@modules/animal/infra/typeorm/repositories/VaccinationCard.repository";
import { PhotoRepository } from "@modules/photos/infra/typeorm/repositories/Photo.repository";


const ENV_TEST = process.env.NODE_ENV === 'test';

container.registerSingleton<IUsersRepository>(
  "IUsersRepository",
  UsersRepository
);

container.registerSingleton<IAddressRepository>(
  "IAddressRepository",
   AddressRepository
);

container.registerSingleton<IAnimalRepository>(
  "IAnimalRepository",
 AnimalRepository
);

container.registerSingleton<IOrganizationRepository>(
  "IOrganizationRepository",
 OrganizationRepository
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
   AnimalRepository
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

container.registerSingleton<IAccountRepository>(
  "IAccountRepository",
  AccountRepository
);

container.registerSingleton<ITokenRepository>(
  "ITokenRepository",
  TokenRepository
);

container.registerSingleton<IPhotosRepository>(
  "IPhotosRepository",
  PhotoRepository
);