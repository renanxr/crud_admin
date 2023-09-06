import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { client } from "../database";
import AppError from "../errors/AppError";
import { sessionCreate } from "../interfaces/session.interfaces";
import { UserResult } from "../interfaces/user.interfaces";

const create = async (sessionData: sessionCreate): Promise<string> => {
	const queryString: string = `
	  SELECT * FROM "users"
	  WHERE email = $1;
	`;

	const queryResult: UserResult = await client.query(queryString, [
		sessionData.email,
	]);

	if (!queryResult.rowCount) {
		throw new AppError("Wrong email/password", 401);
	}

	const matchPassword: boolean = await compare(
		sessionData.password,
		queryResult.rows[0].password
	);

	if (!matchPassword) {
		throw new AppError("Wrong email/password", 401);
	}

	const expiresIn = process.env.EXPIRES_IN || "1d";

	const token: string = sign(
		{ email: queryResult.rows[0].email },
		process.env.SECRET_KEY!,
		{
			expiresIn,
			subject: queryResult.rows[0].id.toString(),
		}
	);

	return token;
};

export { create };
