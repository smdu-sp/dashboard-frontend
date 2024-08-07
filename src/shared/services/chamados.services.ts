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
    id?: number;
    name?: string;
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

export interface IPaginadoAvaliacoes {
    data: Avaliacao[];
    total: number;
    pagina: number;
    limite: number;
}

export interface ChamadosAvaliados {
    satisfaction?: number;
}

export interface UltimosChamados {
    name: string;
    user: UsuarioGlpi;
}

const baseURL = process.env.API_URL || 'http://localhost:3000/';

async function buscarTudo(pagina: number = 1, limite: number = 10): Promise<IPaginadoAvaliacoes> {
    const session = await getServerSession(authOptions);
    const buscaTudo = await fetch(`${baseURL}chamados/buscar-tudo?&pagina=${pagina}&limite=${limite}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) signOut();
        return response.json();
    })
    return buscaTudo;
}

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
        //if (response.status === 401) signOut();
        return response.json();
    })
    return avaliado;
}

async function chamadosMes() {
    const session = await getServerSession(authOptions);
    const chamados = await fetch(`${baseURL}chamados/mes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) signOut();
        if (response.status !== 200) return;
        return response.json();
    })
    return chamados;

}

async function chamadosPorMes() {
    const session = await getServerSession(authOptions);
    const chamados = await fetch(`${baseURL}chamados/mensal`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) signOut();
        if (response.status !== 200) return;
        return response.json();
    })
    return chamados;

}

async function chamadosAno() {
    const session = await getServerSession(authOptions);
    const chamados = await fetch(`${baseURL}chamados/ano`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) signOut();
        if (response.status !== 200) return;
        return response.json();
    })
    return chamados;
}

async function chamadosNovos() {
    const session = await getServerSession(authOptions);
    const chamados = await fetch(`${baseURL}chamados/novos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) signOut();
        if (response.status !== 200) return;
        return response.json();
    })
    return chamados;

}

async function chamadosAtribuidos() {
    const session = await getServerSession(authOptions);
    const chamados = await fetch(`${baseURL}chamados/atribuidos`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) signOut();
        if (response.status !== 200) return;
        return response.json();
    })
    return chamados;

}

async function chamadosAvaliados(){
    const session = await getServerSession(authOptions);
    const avaliados = await fetch(`${baseURL}chamados/avaliados`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) signOut();
        return response.json();
    })
    return avaliados;
}

async function chamadosAvaliadosNoAno(){
    const session = await getServerSession(authOptions);
    const avaliadosAno = await fetch(`${baseURL}chamados/avaliados/ano`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) signOut();
        return response.json();
    })
    return avaliadosAno;
}

async function chamadosAvaliadosNoMes(){
    const session = await getServerSession(authOptions);
    const avaliadosMes = await fetch(`${baseURL}chamados/avaliados/mes`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) signOut();
        return response.json();
    })
    return avaliadosMes;
}

async function avaliarSeteDias(){
    const session = await getServerSession(authOptions);
    const avaliacao = await fetch(`${baseURL}chamados/avaliar-sete-dias`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) signOut();
        return response.json();
    })
    return avaliacao;
}

async function ultimoChamado(): Promise<UltimosChamados>{
    const session = await getServerSession(authOptions);
    const avaliacao = await fetch(`${baseURL}chamados/ultimo`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${session?.access_token}`
        }
    }).then((response) => {
        if (response.status === 401) signOut();
        return response.json();
    })
    return avaliacao;
}
export { 
    criar, 
    buscar, 
    avaliar, 
    chamadosMes, 
    chamadosPorMes, 
    chamadosAno, 
    chamadosNovos, 
    chamadosAtribuidos, 
    chamadosAvaliados,
    chamadosAvaliadosNoAno,
    chamadosAvaliadosNoMes,
    buscarTudo,
    avaliarSeteDias,
    ultimoChamado,
}