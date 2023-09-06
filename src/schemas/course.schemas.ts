import { z } from "zod";

const courseSchema = z.object({
	id: z.number().positive(),
	name: z.string().max(150).nonempty(),
	description: z.string().nonempty(),
});

const createCourseSchema = courseSchema.omit({
	id: true,
});

const updateCourseSchema = courseSchema.partial();
const readCourseSchema = courseSchema.array();

export {
	courseSchema,
	createCourseSchema,
	updateCourseSchema,
	readCourseSchema,
};
