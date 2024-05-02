import pool from "../db";
import { getRowsByID, getAllRowsSorted } from "../queries";
import { COLUMN_ALIASES } from "../tables/tables";

const TABLE_SHAPE = COLUMN_ALIASES.languages;
const TABLE_NAME = "languages";
const TABLE_ID = TABLE_SHAPE.id;

const getAllLanguages = async () => {
	const sortCol = TABLE_ID;
	const name = TABLE_NAME;

	const data = await getAllRowsSorted(sortCol, name);
	return data;
};

export { getAllLanguages };
