/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */
'use client'
import Card from '@/components/Card';
import { Box } from '@mui/joy';
import PessoasMes from '@/components/PessoasMes';

export default function () {
    const anoatual = new Date().getFullYear();
    return (
        <Box>
            <Box sx={{ display: 'flex', FlexDirection: 'row' }}>
            <Card
                titulo="Chamados Novos"
                color="#151515"
                valor='0'
            ></Card>
            <Card
                titulo="Chamados Atribuídos"
                color="#35374B"
                valor='0'
            ></Card>
            <Card
                titulo="Média de Avaliação do Mês"
                color="#344955"
                valor="3.5"
            ></Card>
            <Card
                titulo="Média de Avaliação"
                ano={anoatual}
                color="#50727B"
                valor="4"
            ></Card>
            <Card
                titulo="Média de Avaliação Geral"
                color="#78A083"
                valor="5"
            ></Card>
            </Box>
            <Box sx={{ display: 'flex', FlexDirection: 'row' }}>
                <PessoasMes />
            </Box>
        </Box>
    )

}