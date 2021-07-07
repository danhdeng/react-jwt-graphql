import { Response } from "express";

export const sendRefreshToken = (res: Response, token: string) => {
  return res.cookie("jid", token, { expires: new Date(Date.now() + 900000), httpOnly: true });
};
