'use server'

import { authOptions } from "@/shared/auth/authOptions";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
export interface ICreateAvaliacao {
    avaliacao: string;
    comentario: string;
    id_usuario: string;
}
export interface UsuarioGlpi {
    id: number;
    name: string;
    firstname: string;
    realname: string;
}
export interface TicketsUsuarios {
    id: number;
    type: number;
    user: UsuarioGlpi;
}
export interface Tickets{
    id: number;
    name: string;
    closedate: Date;
    solvedate: Date;
    Usuarios: TicketsUsuarios[]
}
export interface Avaliacao{
    satisfaction?: number;
    comment?: string;
    id: number;
    date_answered?: Date;
    date_begin: Date;
    type: number;
    Tickets: Tickets;
}

const baseURL = process.env.API_URL || 'http://localhost:3000/';

async function criar(avaliacao: string, comentario: string, id_usuario: string) {
    const session = await getServerSession(authOptions);
    const criado = await fetch(`${baseURL}avaliacoes/criar`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }, body: JSON.stringify({ avaliacao, comentario, id_usuario })
    }).then((response) => {
        if (response.status === 401) signOut();
        // if (response.status !== 200) return;
        return response.json();
    })
    return criado;
}

async function buscar() {
    const session = await getServerSession(authOptions);
    const criado = await fetch(`${baseURL}chamados`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) signOut();
        return response.json();
    })
    return criado;
}



async function avaliar(id: string, satisfaction: string, comment: string) {
    const session = await getServerSession(authOptions);
    const avaliado = await fetch(`${baseURL}chamados/avaliar/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }, body: JSON.stringify({ satisfaction, comment })
    }).then((response) => {
        if (response.status === 401) signOut();
        return response.json();
    })
    return avaliado;
}

export { criar, buscar, avaliar }