import { verify } from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { AppError } from "../errors";
import auth from "../../settings/auth";


export async function authSecurity(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;
    if(!authHeader) {
        throw new AppError("Token not found", 401);
    }

    const [ ,token ] = authHeader.split(" ");
    
    try {
        const { sub: id } = verify(token, auth.secret) as { sub: string };

        request.user = {
            id
        };

        next();

    } catch (error) {
        throw new AppError("Invalid Token", 401);
    }
}