'use client'

import Card from "@/components/Card";
import { Box } from "@mui/joy";
import PessoasMes from "@/components/PessoasMes";

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

export default function ({ mediaGeral, mediaMes, mediaAno, novos, atribuidos, mes, ano }: { mediaGeral: number, mediaMes: number, mediaAno: number, novos: number, atribuidos: number, mes: { name: string; tickets: number }[], ano: { name: string; tickets: number }[] }) {
  const anoatual = new Date().getFullYear();
  mes.sort((a, b) => b.tickets - a.tickets);
  ano.sort((a, b) => b.tickets - a.tickets);


  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ display: "flex", FlexDirection: "row", width: "100%", justifyContent: "center", gap: 2, mb: 5 }}>
        <Card titulo="Chamados Novos" color="#f94668" valor={novos}></Card>
        <Card titulo="Chamados Atribuídos" color="#f26e14" valor={atribuidos}></Card>
        <Card titulo="Média de Avaliação do Mês" color="#14b1f2" valor={mediaMes}/>
        <Card titulo="Média de Avaliação" ano={anoatual} color="#517bee" valor={mediaAno}/>
        <Card titulo="Média de Avaliação Geral" color="#0a3299" valor={mediaGeral}/>
      </Box>
      <Box sx={{ display: "flex", FlexDirection: "row", width: "80vw", justifyContent: "center", alignItems: "center" }}>
        <PessoasMes data={mes} label={meses[new Date().getMonth()]} />
      </Box>
    </Box>
  );
}
