/* eslint-disable import/no-anonymous-default-export */
/* eslint-disable react/display-name */

import Card from "@/components/Card";
import { Box } from "@mui/joy";
import PessoasMes from "@/components/PessoasMes";
import * as conexao from "@/shared/services/avalicao.services";

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

export default async function () {  
  const anoatual = new Date().getFullYear();
  const mes = await conexao.chamadosMes();
  const ano = await conexao.chamadosAno();
  const mesAmes = await conexao.chamadosPorMes();
  const quantidadeAtribuidos = await conexao.chamadosAtribuidos();
  const chamadosNovos = await conexao.chamadosNovos();
  mes.sort((a, b) => b.tickets - a.tickets);
  ano.sort((a, b) => b.tickets - a.tickets);
  return (
    <Box>
      <Box sx={{ display: "flex", FlexDirection: "row" }}>
        <Card titulo="Chamados Novos" color="#f94668" valor={chamadosNovos}></Card>
        <Card titulo="Chamados Atribuídos" color="#f26e14" valor={quantidadeAtribuidos}></Card>
        <Card
          titulo="Média de Avaliação do Mês"
          color="#14b1f2"
          valor="3.5"
        ></Card>
        <Card
          titulo="Média de Avaliação"
          ano={anoatual}
          color="#517bee"
          valor="4"
        ></Card>
        <Card
          titulo="Média de Avaliação Geral"
          color="#0a3299"
          valor="5"
        ></Card>
      </Box>
      <Box sx={{ display: "flex", FlexDirection: "row" }}>
        <PessoasMes data={mes} label={meses[new Date().getMonth()]} />
      </Box>
    </Box>
  );
}
