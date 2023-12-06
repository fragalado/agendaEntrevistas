import { Cliente } from "./cliente";

export interface Cita {
    id?: string;
    entrevistadoPor: string;
    cliente?: Cliente;
    visto: boolean;
    diaCita: string;
    horaCita: string;
}

export interface DatosCita {
    id?: string;
    entrevistadoPor: string;
    idCliente: string;
    visto: boolean;
    diaCita: string;
    horaCita: string;
}