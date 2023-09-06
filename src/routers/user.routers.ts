import { Router } from "express";
import {
	createUser,
	listUser,
	readUser,
} from "../controllers/user.controllers";
import { createUserSchema } from "../schemas/user.schemas";
import validatedBody from "../middlewares/validatedBody.middleware";
import requireAdmin from "../middlewares/requireAdmin.middleware";
import validatedEmail from "../middlewares/validatedEmail.middleware";
import validatedToken from "../middlewares/validatedToken.middleware";
import validatedUsersCourse from "../middlewares/validatedUsersCourse.middleware";

const userRouter: Router = Router();

userRouter.post(
	"",
	validatedBody(createUserSchema),
	validatedEmail,
	createUser
);

userRouter.get("", validatedToken, requireAdmin, readUser);

userRouter.get(
	"/:id/courses",
	validatedToken,
	requireAdmin,
	listUser
);

export { userRouter };
