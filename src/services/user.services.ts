import { hash } from "bcryptjs";
import {
	UserCreate,
	UserRead,
	UserResult,
	UserReturn,
} from "../interfaces/user.interfaces";
import format from "pg-format";
import { client } from "../database";
import { readUserSchema, userWithoutPassword } from "../schemas/user.schemas";
import AppError from "../errors/AppError";

const create = async (payload: UserCreate): Promise<UserReturn> => {
	payload.password = await hash(payload.password, 10);
	const queryFormat: string = format(
		'INSERT INTO "users" (%I) VALUES (%L) RETURNING *;',
		Object.keys(payload),
		Object.values(payload)
	);

	const queryResult: UserResult = await client.query(queryFormat);
	return userWithoutPassword.parse(queryResult.rows[0]);
};

const read = async (): Promise<UserRead> => {
	const queryResult: UserResult = await client.query('SELECT * FROM "users";');
	return readUserSchema.parse(queryResult.rows);
};

const getUserCourses = async (userId: string) => {
	const queryString: string = `SELECT 
        "c"."name" AS "courseName",
        "c"."description" AS "courseDescription",
		"uc"."courseId" AS "courseId",
        "uc"."active" AS "userActiveInCourse",
        "u"."id" AS "userId",
        "u"."name" AS "userName"
      FROM "userCourses" AS "uc"
      JOIN "courses" AS "c" ON "uc"."courseId" = "c"."id"
      JOIN "users" AS "u" ON "uc"."userId" = "u"."id"
      WHERE "u"."id" = $1;
    `;

	const queryResult = await client.query(queryString, [userId]);

	if (queryResult.rowCount === 0) {
		throw new AppError("No course found", 404);
	}

	return queryResult.rows;
};

export { create, read, getUserCourses };
