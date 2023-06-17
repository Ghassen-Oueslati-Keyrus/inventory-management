import { User } from "./user";

export interface Devis {
    id?: number;
    entreprise: string;
    number: string;
    preference: string;
    country: string;
    details: string;
    codePostal: string;
    user: User;
}
