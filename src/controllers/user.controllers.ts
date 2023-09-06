import { Request, Response } from "express";
import { create, read, getUserCourses } from "../services/user.services";
import { UserRead, UserReturn } from "../interfaces/user.interfaces";

const createUser = async (req: Request, res: Response): Promise<Response> => {
	const user: UserReturn = await create(req.body);
	return res.status(201).json(user);
};

const readUser = async (req: Request, res: Response): Promise<Response> => {
	const user: UserRead = await read();
	return res.status(200).json(user);
};

const listUser = async (req: Request, res: Response): Promise<Response> => {
	const userList = await getUserCourses(req.params.id);
	return res.status(200).json(userList);
};

export { createUser, readUser, listUser };
