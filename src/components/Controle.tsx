'use client'
import Card from '@/components/Card';
import { Box } from '@mui/joy';
import PessoasMes from '@/components/PessoasMes';


export default function () {
    const anoatual = new Date().getFullYear();
    return (
        <Box sx={{ display: 'flex', gap: 2, flexDirection: 'row' }}>
            <Box>
            <Card
                titulo="Chamados Novos"
                color="primary"
                valor='0'
            ></Card>
            <Card
                titulo="Chamados Atribuídos"
                color="success"
                valor='0'
            ></Card>
            <Card
                titulo="Média de Avaliação do Mês"
                color="neutral"
                valor="3.5"
            ></Card>
            <Card
                titulo="Média de Avaliação"
                ano={anoatual}
                color="danger"
                valor="4"
            ></Card>
            <Card
                titulo="Média de Avaliação Geral"
                color="warning"
                valor="5"
            ></Card>
            </Box>
            <Box>
                <PessoasMes />
            </Box>

        </Box>
    )

}