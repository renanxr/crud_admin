import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import { UserResult } from "../interfaces/user.interfaces";
import AppError from "../errors/AppError";

const validatedEmail = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const { email } = req.body;
	if (!email) return next();

	const queryString: string  = 'SELECT * FROM "users" WHERE "email" = $1';

	const queryResult: UserResult = await client.query(queryString, [email]);

	if (queryResult.rowCount !== 0) {
		throw new AppError("Email already registered", 409);
	}

	return next();
};

export default validatedEmail;
