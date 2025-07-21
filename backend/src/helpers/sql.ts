import { BadRequestError } from "../ExpressError";

const sqlForPartialUpdate = (dataToUpdate: {}, jsToSql: {}) => {
	let keys = Object.keys(dataToUpdate);
	if (keys.length === 0) throw new BadRequestError("No Data");

	const cols = keys.map((colName, idx) => `"${jsToSql[colName] || colName} = $${idx + 1}`);
	return {
		setCols: cols.join(", "),
		values: Object.values(dataToUpdate),
	};
};

export default sqlForPartialUpdate;
