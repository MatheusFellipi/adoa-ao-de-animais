import { sign } from "jsonwebtoken";

export const jwtHelpers = {
  createToken(account: { email: string; id: string }) {
    const newToken = sign(
      { email: account.email },
      process.env.SECRET ?? "secret",
      {
        subject: account.id,
        expiresIn: process.env.NODE_ENV !== "test" ? "60s" : "5m",
      }
    );
    const newRefreshToken = sign(
      { email: account.email },
      process.env.SECRET_REFRESH ?? "secret",
      {
        subject: account.id,
        expiresIn: "7d",
      }
    );
    return {
      newToken,
      newRefreshToken,
    };
  },
};
