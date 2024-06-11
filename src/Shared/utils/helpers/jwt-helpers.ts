import { sign, verify } from "jsonwebtoken";

export const jwtHelpers = {
  createToken(account: { email: string; id: number }) {
    const newToken = sign(
      { email: account.email },
      process.env.SECRET ?? "secret",
      {
        subject: account.id.toString(),
        expiresIn: process.env.NODE_ENV === "production" ? "60s" : "1m",
      }
    );
    const newRefreshToken = sign(
      { email: account.email },
      process.env.SECRET_REFRESH ?? "secret",
      {
        subject: account.id.toString(),
        expiresIn: "7d",
      }
    );
    return {
      newToken,
      newRefreshToken,
    };
  },
};
