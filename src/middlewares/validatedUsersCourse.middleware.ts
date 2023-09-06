import { NextFunction, Request, Response } from "express";
import { client } from "../database";
import AppError from "../errors/AppError";

const validatedUsersCourse = async (
	req: Request,
	res: Response,
	next: NextFunction
): Promise<void> => {
	const { courseId } = req.params;

	const queryString: string  = `SELECT * FROM "courses" WHERE "id" = $1`;

	const queryResult = await client.query(queryString, [courseId]);

	if (queryResult.rowCount === 0) {
		throw new AppError("No course found", 404);
	}

	res.locals = { ...res.locals, foundCourse: queryResult.rows[0] };

	return next();
};

export default validatedUsersCourse;
