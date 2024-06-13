import { inject, injectable } from "tsyringe";
import { IStateRepository } from "@modules/address/infra/repositories/IStateRepository";
import { ICityRepository } from "@modules/address/infra/repositories/ICityRepository";

import StateBrazil from "./estados-cidades.json";

@injectable()
export class AddressUseCase {
  constructor(
    @inject("ICityRepository")
    private _city_repository: ICityRepository,
    @inject("IStateRepository")
    private _state_repository: IStateRepository
  ) {}
  async execute(): Promise<void> {
    const count = await this._state_repository.count();
    console.log(count);
    if (count > 0) return;

    for (const state of StateBrazil.estados) {
      const stateSave = await this._state_repository.create({
        acronyms: state.sigla,
        name: state.nome,
      });

    }
  }
}
