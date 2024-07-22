import { addDays } from "date-fns";
import { inject, injectable } from "tsyringe";

import { AppError } from "@shared/utils/errors/AppError";

import { IAccountRepository } from "@modules/account/infra/repositories/IAccountRepository";
import { ITokenRepository } from "@modules/account/infra/repositories/ITokenRepository";

import { AdaptarAccount } from "@modules/account/adaptar/account";
import { TokenReturnModel } from "@modules/account/model/Token.modal";
import { jwtHelpers } from "@shared/utils/helpers/jwt-helpers";
import { verify } from "jsonwebtoken";

interface IPayLoad {
  sub: string;
}
@injectable()
export class RefreshTokenUseCase {
  constructor(
    @inject("IAccountRepository")
    private _account_repository: IAccountRepository,
    @inject("ITokenRepository") private _token_repository: ITokenRepository
  ) {}

  async execute(
    token: string
  ): Promise<{ data: TokenReturnModel; refreshToken: string }> {
    if (!token)
      throw new AppError(
        "A sessão do expirou por favor fazer o login novamente"
      );
    const storedToken = await this._token_repository.findByToken(token);
    if (!storedToken)
      throw new AppError(
        "A sessão do expirou por favor fazer o login novamente"
      );

    try {
      const { sub: id } = verify(
        token,
        process.env.SECRET ?? "secret"
      ) as IPayLoad;

      const account = await this._account_repository.findById(id);
      if (!account) throw new AppError("A conta do usuária nao foi encontrada");
      const { newRefreshToken, newToken } = jwtHelpers.createToken({
        email: account.email,
        id: account.id,
      });

      await this._token_repository.update(storedToken, {
        account: account,
        token: newRefreshToken,
        expires_at: addDays(Date.now(), 7),
      });

      return {
        refreshToken: newRefreshToken,
        data: AdaptarAccount.accountReturn({
          token: newToken,
          avatar: account.user?.avatar,
          email: account.email,
          name: account.user?.name,
        }),
      };
    } catch (err) {
      await this._token_repository.delete(storedToken.id);
      throw new AppError(
        "A sessão do expirou por favor fazer o login novamente",
        403
      );
    }
  }
}
