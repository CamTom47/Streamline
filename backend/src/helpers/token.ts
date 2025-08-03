import jwt from 'jsonwebtoken';
import { SECRET_KEY } from "../../config";

interface Payload {
    id: number;
    username: string;
    isAdmin: boolean;
}

const createToken = ({id, username, isAdmin}: Payload) => {
    let payload = {
        'id': id,
        "username": username,
        "isAdmin": isAdmin || false,
    };
    return jwt.sign(payload, SECRET_KEY);
}

export default createToken;