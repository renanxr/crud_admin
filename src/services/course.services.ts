import { client } from "../database";
import {
	CourseAdd,
	CourseCreate,
	CourseRead,
	CourseResult,
} from "../interfaces/course.interfaces";
import { readCourseSchema } from "../schemas/course.schemas";

const create = async (payload: CourseCreate): Promise<CourseCreate> => {
	const queryString: string = `
    INSERT INTO "courses" ("name", "description")
    VALUES ($1, $2)
    RETURNING *
  `;

	const values = [payload.name, payload.description];
	const result = await client.query(queryString, values);
	return result.rows[0];
};

const read = async (): Promise<CourseRead> => {
	const queryResult: CourseResult = await client.query(
		'SELECT * FROM "courses";'
	);
	return readCourseSchema.parse(queryResult.rows);
};

const addUserCourse = async (payload: CourseAdd): Promise<void> => {
	const queryString: string = `
	  INSERT INTO "userCourses" ("userId", "courseId")
	  VALUES ($1, $2)
	`;

	const values = [payload.userId, payload.courseId];
	await client.query(queryString, values);
};

const destroy = async (courseId: string, userId: string): Promise<void> => {
	const queryString: string = `UPDATE "userCourses" SET active = false  WHERE "courseId" = $1 AND "userId" = $2 ;`;
	await client.query(queryString, [courseId, userId]);
};

const getCourse = async (courseId: string) => {
	const queryString: string = `SELECT
      "u"."id" AS "userId",
      "u"."name" AS "userName",
      "u"."email" AS "userEmail",
      "c"."id" AS "courseId",
      "c"."name" AS "courseName",
      "c"."description" AS "courseDescription",
	  "uc"."active" AS "userActiveInCourse"
    FROM "users" AS "u" 
    JOIN "userCourses" AS "uc" ON "u"."id" = "uc"."userId" 
    JOIN "courses" AS "c" ON "c"."id" = "uc"."courseId"
    WHERE "c"."id" = $1;`;

	const queryResult = await client.query(queryString, [courseId]);

	return queryResult.rows;
};

export { create, read, addUserCourse, destroy, getCourse };
