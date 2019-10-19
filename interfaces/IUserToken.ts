import { ObjectID } from "bson";

export interface IUserToken {
    _id: ObjectID;
    username: string;
    admin: string;
}