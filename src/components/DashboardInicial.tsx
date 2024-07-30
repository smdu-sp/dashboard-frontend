'use client'

import * as React from 'react';
import Card from "@/components/Card";
import CardChamado from "@/components/CardChamado";
import { Box } from "@mui/joy";
import { useTheme } from '@mui/material/styles';
import * as chamadosServices from '@/shared/services/chamados.services';
import { useEffect, useState } from 'react';

const meses = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
];

export default function DashboardInicial({ mediaGeral, mediaMes, mediaAno, novos, atribuidos, chamado }: { mediaGeral: number, mediaMes: number, mediaAno: number, novos: number, atribuidos: number, chamado: any }) {

    const [mesAtual, setMes] = useState<any[]>([]);
    const [dozeMeses, setDoze] = useState<any[]>([]);

    const mes = async () => await chamadosServices.chamadosMes();
    const ano = async () => await chamadosServices.chamadosAno();

    useEffect(() => {
        // Resolva as promessas aqui e atualize o estado
        async function fetchData() {
            const mesData = await mes();
            const anoData = await ano();
            setMes(mesData);
            setDoze(anoData);
        }
        fetchData();
    }, []);

    const images = [
        {
            grafic: dozeMeses,
            labels: 'Últimos 12 meses'
        },
        {
            grafic: mesAtual,
            labels: meses[new Date().getMonth()]
        },
    ];

    const anoatual = new Date().getFullYear();


    return (
        <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', p: 0, m: 0 }}>
                <Card titulo="Chamados Novos" width="100%" color="#f94668" size="30px" mt={10} sizeNum="90px" minWidth="100%" valor={novos}></Card>
                <Card titulo="Chamados Atribuídos" width="100%" color="#f26e14" size="30px" mt={10} sizeNum="90px" minWidth="100%" valor={atribuidos}></Card>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                <Card titulo="Média de Avaliação do Ano" color="#14b1f2" size="30px" sizeNum="60px" width="25%" mt={10} valor={isNaN(mediaAno) ? 0 : mediaAno} ano={anoatual}/>
                <Card titulo="Média de Avaliação Geral" color="#517bee" size="30px" sizeNum="60px" width="25%" mt={10} valor={isNaN(mediaGeral) ? 0 : mediaGeral} />
                <Card titulo="Média de Avaliação Mensal" color="#0a3299" size="30px" sizeNum="60px" width="25%" mt={10}  valor={isNaN(mediaMes) ? 0 : mediaMes} />
                <CardChamado width='25%' nome={(chamado.Usuarios != undefined ? chamado.Usuarios[0].user.firstname : '') + " " + (chamado.Usuarios != undefined ? chamado.Usuarios[0].user.realname : '')} descricao={chamado.name} />
            </Box>
        </Box>
    );
}
