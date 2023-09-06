import { z } from "zod";

const sessionCreateSchema = z.object({
	email: z.string().email().max(50).nonempty(),
	password: z.string().max(120).nonempty(),
});

export { sessionCreateSchema };
