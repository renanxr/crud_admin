import { Router } from "express";
import { createSession } from "../controllers/session.controllers";
import validatedBody from "../middlewares/validatedBody.middleware";
import { sessionCreateSchema } from "../schemas/session.schema";

const sessionRouter: Router = Router();

sessionRouter.post("", validatedBody(sessionCreateSchema), createSession);

export { sessionRouter };
