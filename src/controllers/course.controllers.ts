import { Request, Response } from "express";
import {
	CourseAdd,
	CourseCreate,
	CourseRead,
} from "../interfaces/course.interfaces";
import {
	create,
	read,
	addUserCourse,
	destroy,
	getCourse,
} from "../services/course.services";

const createCourse = async (req: Request, res: Response): Promise<Response> => {
	const course: CourseCreate = await create(req.body);
	return res.status(201).json(course);
};

const readCourse = async (req: Request, res: Response): Promise<Response> => {
	const course: CourseRead = await read();
	return res.status(200).json(course);
};

const createUserCourse = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const userCourseData: CourseAdd = req.body;
	await addUserCourse(userCourseData);
	return res.status(201).json({ message: "User successfully vinculed to course" });
};

const destroyCourseUser = async (
	req: Request,
	res: Response
): Promise<Response> => {
	const userId: string = req.params.userId;
	const courseId: string = req.params.courseId;
	await destroy(courseId, userId);
	return res.status(204).json();
};

const listCourse = async (req: Request, res: Response): Promise<Response> => {
	const userCourses = await getCourse(req.params.courseId);
	return res.status(200).json(userCourses);
};

export {
	createCourse,
	readCourse,
	createUserCourse,
	destroyCourseUser,
	listCourse,
};
