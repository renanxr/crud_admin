import { Request, Response } from "express";
import { create } from "../services/session.services";

const createSession = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const token: string = await create(req.body);
	return res.status(200).json({ token });
};

export { createSession };
