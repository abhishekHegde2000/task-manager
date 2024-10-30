import type { NextFunction, Request, Response } from "express";
import jwt, { JsonWebTokenError, type JwtPayload } from "jsonwebtoken";

export const auth = (req: Request, res: Response, next: NextFunction) => {
  const authHeaders = req.headers.authorization;

  if (!authHeaders || !authHeaders.startsWith("Bearer")) {
    return res
      .status(401)
      .json({ message: "Unauthorized access", success: false });
  }

  const token = authHeaders.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.userId = (decoded as JwtPayload).id;
    next();
  } catch (err) {
    if (err instanceof JsonWebTokenError) {
      return res.status(401).json({ msg: "Invalid token", success: false });
    } else {
      console.error("Error while verifying token: ", err);
      return res.status(500).json({
        msg: "Internal server error",
        success: false,
      });
    }
  }
};
