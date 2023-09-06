import { NextFunction, Request, Response } from "express";
import { UserResult } from "../interfaces/user.interfaces";
import { client } from "../database";
import AppError from "../errors/AppError";

const validatedId = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const { userId } = req.params;

	const queryString: string  = 'SELECT * FROM "users" WHERE "id" = $1';

	const queryResult: UserResult = await client.query(queryString, [userId]);

	if (queryResult.rowCount === 0) {
		throw new AppError("User/course not found", 404);
	}

	res.locals = { ...res.locals, foundUser: queryResult.rows[0] };

	return next();
};

export default validatedId;
