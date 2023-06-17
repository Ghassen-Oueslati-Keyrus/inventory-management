import { Role } from "./role";

export interface User {
    id?: number;
    firstName : string
    lastName:string;
    username:string;
    email: string;
    enabled:boolean;
    verificationCode: string;
    resetPasswordToken:string;
    password: string;
    roles : Role[];
}
