import jwt from 'jsonwebtoken';
import { SECRET_KEY } from "../../config";

interface Payload {
    id: number;
    username: string;
    role: string;
}

const createToken = ({id, username, role}: Payload): {} => {
    let payload = {
        'id': id,
        "username": username,
        "role": role || "member",
    };
    return jwt.sign(payload, SECRET_KEY);
}

export default createToken;