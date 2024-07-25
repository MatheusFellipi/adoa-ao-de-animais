import { Account } from "@modules/account/infra/typeorm/entities/Account.entity";
import { Tokens } from "@modules/account/infra/typeorm/entities/Token.entity";
import { User } from "@modules/user/infra/typeorm/entities/Users.entity";
import { DataSource } from "typeorm";
import { Seeder, SeederFactoryManager } from "typeorm-extension";
import { hash } from "bcrypt";
import { jwtHelpers } from "@shared/utils/helpers/jwt-helpers";
import { addDays } from "date-fns";
import userTest from "../../../../../resources/user-test.json";

const data = userTest;

function RandomCpf(): string {
  const timestamp = Date.now();
  let timestampStr = timestamp.toString();
  if (timestampStr.length < 12) {
    const randomSuffix = Math.floor(
      Math.random() * Math.pow(10, 12 - timestampStr.length)
    ).toString();
    timestampStr += randomSuffix.padStart(12 - timestampStr.length, "0");
  } else if (timestampStr.length > 12) {
    timestampStr = timestampStr.substring(0, 12);
  }
  return timestampStr;
}

export class UserTestSeeder implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const _account_repository = dataSource.getRepository(Account);
    const _user_Repository = dataSource.getRepository(User);
    const _token_Repository = dataSource.getRepository(Tokens);
    
    if ( await _account_repository.exists({ where: { email: data.email } })) {
      return;
    }

    data.user.cnpj_cpf = RandomCpf();
    const user = await _user_Repository.save(
      _user_Repository.create(data.user)
    );
    const account = await _account_repository.save(
      _account_repository.create({
        ...data,
        password: await hash(data.password, process.env.SECRET_HASH ?? 8),
        user: user,
      })
    );

    const newRefreshToken  = jwtHelpers.createToken({
      email: account.email,
      id: account.id,
    });

    await _token_Repository.save(
      _token_Repository.create({
        account: account,
        token: newRefreshToken,
        expires_at: addDays(Date.now(), 1),
      })
    );
  }
}
