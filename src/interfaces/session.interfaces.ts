import { z } from "zod";
import { sessionCreateSchema } from "../schemas/session.schema";

type sessionCreate = z.infer<typeof sessionCreateSchema>;

export { sessionCreate };
