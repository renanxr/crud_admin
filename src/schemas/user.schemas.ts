import { z } from "zod";

const userSchema = z.object({
	id: z.number().positive(),
	name: z.string().max(50).nonempty(),
	email: z.string().email().max(50).nonempty(),
	password: z.string().max(120).nonempty(),
	admin: z.boolean().default(false),
});

const createUserSchema = userSchema.omit({
	id: true,
});

const userWithoutPassword = userSchema.omit({
	password: true,
});

const readUserSchema = userWithoutPassword.array();

export {
	userSchema,
	createUserSchema,
	userWithoutPassword,
	readUserSchema,
};
