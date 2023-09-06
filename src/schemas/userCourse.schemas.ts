import { z } from "zod";

const userCourseSchema = z.object({
	id: z.number().positive(),
	active: z.boolean().default(true),
	userId: z.number().positive(),
	courseId: z.number().positive(),
});

const userCourseAddSchema = userCourseSchema.partial();

export { userCourseSchema, userCourseAddSchema };
