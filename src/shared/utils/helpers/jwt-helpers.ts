import { sign } from "jsonwebtoken";

export const jwtHelpers = {
  createToken(account: { email: string; id: string }) {
    const newRefreshToken = sign(
      { email: account.email },
      process.env.SECRET_REFRESH ?? "secret",
      {
        subject: account.id,
        expiresIn: "7d",
      }
    );
    return newRefreshToken
  }
};
