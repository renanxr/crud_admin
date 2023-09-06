import { QueryResult } from "pg";
import { z } from "zod";
import { userSchema } from "../schemas/user.schemas";
import {
	createCourseSchema,
	readCourseSchema,
} from "../schemas/course.schemas";
import { userCourseAddSchema } from "../schemas/userCourse.schemas";

type Course = z.infer<typeof userSchema>;
type CourseResult = QueryResult<Course>;
type CourseCreate = z.infer<typeof createCourseSchema>;
type CourseAdd = z.infer<typeof userCourseAddSchema>;
type CourseRead = z.infer<typeof readCourseSchema>;

export { Course, CourseResult, CourseCreate, CourseAdd, CourseRead };
