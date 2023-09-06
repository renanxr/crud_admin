import { Router } from "express";
import {
	createCourse,
	readCourse,
	createUserCourse,
	destroyCourseUser,
	listCourse,	
} from "../controllers/course.controllers";
import requireAdmin from "../middlewares/requireAdmin.middleware";
import validatedBody from "../middlewares/validatedBody.middleware";
import validatedToken from "../middlewares/validatedToken.middleware";
import validatedCourse from "../middlewares/validatedCourse.middleware";
import validatedId from "../middlewares/validatedId.middleware";
import { userCourseAddSchema } from "../schemas/userCourse.schemas";
import { createCourseSchema } from "../schemas/course.schemas";
import validatedUsersCourse from "../middlewares/validatedUsersCourse.middleware";

const courseRouter: Router = Router();

courseRouter.post(
	"",
	validatedToken,
	requireAdmin,
	validatedBody(createCourseSchema),
	createCourse
);

courseRouter.get("", readCourse);

courseRouter.post(
	"/:courseId/users/:userId",
	validatedToken,
	requireAdmin,
	validatedCourse,
	validatedId,
	validatedBody(userCourseAddSchema),
	createUserCourse
);

courseRouter.delete(
	"/:courseId/users/:userId",
	validatedToken,
	requireAdmin,
	validatedCourse,
	validatedId,
	destroyCourseUser
);

courseRouter.get("/:courseId/users", validatedToken, requireAdmin, validatedUsersCourse, listCourse);

export { courseRouter };
