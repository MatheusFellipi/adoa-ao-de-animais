import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";

import { State } from "@modules/address/infra/typeorm/entities/State.entity";
import { City } from "@modules/address/infra/typeorm/entities/City.entity";

import StateBrazil from "../../../../../resources/estados-cidades.json";

export class StateSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const _state_repository = dataSource.getRepository(State);
    const _city_Repository = dataSource.getRepository(City);

    const count = await _state_repository.count();
    if (count > 0) return;

    for (const state of StateBrazil.estados) {
      const stateCreate = _state_repository.create({
        acronyms: state.sigla,
        name: state.nome,
      });
      const stateSave = await _state_repository.save(stateCreate);
      for (const cityState of state.cidades) {
        const cityCreate = _city_Repository.create({
          name: cityState,
          state: stateSave,
        });
        await _city_Repository.save(cityCreate);
      }
    }
  }
}
