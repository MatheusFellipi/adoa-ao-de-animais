import { container } from "tsyringe";

import { IAnimalRepository } from "@modules/animal/infra/repositories/IAnimalRepository";
import { AnimalRepository } from "@modules/animal/infra/typeorm/repositories/Animal.repository";

import { IUsersRepository } from "@modules/user/infra/repositories/IUsersRepository";
import { IAddressRepository } from "@modules/address/infra/repositories/IAddressRepository";
import { ILinkRepository } from "@modules/contacts/infra/repositories/ILinksRepository";
import { IContactRepository } from "@modules/contacts/infra/repositories/IContactRepository";
import { IVaccinationRepository } from "@modules/animal/infra/repositories/IVaccinationRepository";
import { VaccinationRepository } from "@modules/animal/infra/typeorm/repositories/Vaccination.repository";
import { IVaccinationCardRepository } from "@modules/animal/infra/repositories/IVaccinationCardRepository";
import { IDoseRepository } from "@modules/animal/infra/repositories/IDoseRepository";
import { IAccountRepository } from "@modules/account/infra/repositories/IAccountRepository";
import { ITokenRepository } from "@modules/account/infra/repositories/ITokenRepository";
import { TokenRepository } from "@modules/account/infra/typeorm/repositories/Token.repository";
import { UsersRepository } from "@modules/user/infra/typeorm/repositories/Users.repository";
import { AccountRepository } from "@modules/account/infra/typeorm/repositories/Account.repository";
import { IPhotosRepository } from "@modules/photos/infra/repositories/IPhotosRepository";
import { PhotoRepository } from "@modules/photos/infra/typeorm/repositories/Photo.repository";
import { AddressRepository } from "@modules/address/infra/typeorm/repositories/address.repository";
import { ContactRepository } from "@modules/contacts/infra/typeorm/repositories/contact.repository";
import { VaccinationCardRepository } from "@modules/animal/infra/typeorm/repositories/Vaccinationcard.repository";
import { LinkRepository } from "@modules/contacts/infra/typeorm/repositories/link.repository";
import { ICityRepository } from "@modules/address/infra/repositories/ICityRepository";
import { IStateRepository } from "@modules/address/infra/repositories/IStateRepository";
import { CityRepository } from "@modules/address/infra/typeorm/repositories/City.repository";
import { StateRepository } from "@modules/address/infra/typeorm/repositories/State.repository";
import { DoseRepository } from "@modules/animal/infra/typeorm/repositories/Dose.repository";
import { IAdRepository } from "@modules/ad/infra/repositories/IAdRepository";
import { AdRepository } from "@modules/ad/infra/typeorm/repositories/Ad.repository";

container.registerSingleton<IAccountRepository>(
  "IAccountRepository",
  AccountRepository
);

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

container.registerSingleton<ILinkRepository>("ILinkRepository", LinkRepository);

container.registerSingleton<IContactRepository>(
  "IContactRepository",
  ContactRepository
);

container.registerSingleton<IVaccinationRepository>(
  "IVaccinationRepository",
  VaccinationRepository
);

container.registerSingleton<IVaccinationCardRepository>(
  "IVaccinationCardRepository",
  VaccinationCardRepository
);

container.registerSingleton<IDoseRepository>("IDoseRepository", DoseRepository);

container.registerSingleton<ITokenRepository>(
  "ITokenRepository",
  TokenRepository
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

container.registerSingleton<IAdRepository>("IAdRepository", AdRepository);
