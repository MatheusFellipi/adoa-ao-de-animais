import { IUsersRepository } from "@modules/user/infra/repositories/IUsersRepository";
import { UsersRepository } from "@modules/user/infra/typeorm/repositories/UsersRepository";
import { container } from "tsyringe";


container.registerSingleton<IUsersRepository>(
  "UsersRepository",
  UsersRepository
);
