import dotenv from "dotenv";
import { app } from "./index";

dotenv.config();

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
