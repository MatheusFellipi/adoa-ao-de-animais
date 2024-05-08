import { container } from "tsyringe";

import { AddressRepository } from "@modules/helper/address/infra/repositories/addressRepository";
import { IAddressRepository } from "@modules/helper/address/infra/repositories/IAddressRepository";
import { AddressRepositoryInMemory } from "@modules/helper/address/infra/repositories/in-memory/AddressRepositoryInMemory";

const useInMemoryRepository = process.env.NODE_ENV === 'test';

container.registerSingleton<IAddressRepository>("AddressRepository", useInMemoryRepository ? AddressRepositoryInMemory : AddressRepository);