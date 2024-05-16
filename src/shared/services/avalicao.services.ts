'use server'

import { authOptions } from "@/shared/auth/authOptions";
import { getServerSession } from "next-auth";
import { signOut } from "next-auth/react";
export interface ICreateUsuario {
    avaliacao: string;
    comentario: string;
    id_usuario: string;
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

export { criar }