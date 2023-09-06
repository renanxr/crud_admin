import { z } from "zod";
import { QueryResult } from "pg";
import {
	createUserSchema,
	readUserSchema,
	userSchema,
	userWithoutPassword,
} from "../schemas/user.schemas";

type User = z.infer<typeof userSchema>;
type UserCreate = z.infer<typeof createUserSchema>;
type UserRead = z.infer<typeof readUserSchema>;
type UserReturn = z.infer<typeof userWithoutPassword>;
type UserResult = QueryResult<User>;

export { User, UserCreate, UserReturn, UserResult, UserRead };
