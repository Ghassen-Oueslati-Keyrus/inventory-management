import { FileHandle } from "./file-handle";

export interface Product {
    id?: number;
    name: String,
    description: String,
    price: number,
    quantity: number;
    categoryId: number;
    photos: FileHandle[],
    reference?: String;
    discountedPrice?: number;
    brand: string;
    location?: boolean;
    groupeElectrogeneType?: string,
    puissanceContinue?: number,
    origine?: string,
    moteur?: string,
    alternateur?: string,
    refroidissement?: string,
    nombreCylindres?: string,
    demarrage?: string,
    carteDemarrage?: string,
    consommation?: string,
    poids?: number,
    dimension?: string,
    volumeExpedie?: string,
    nombreHeures?: number,
    capotage?: string,
    typeCarburant?: string
    capaciteReservoirCarburant?:number
	vitesseMoteur?: number
	amperage?: number
	typeAlimentation?: string;
}

