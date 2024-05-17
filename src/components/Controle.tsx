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

export default function ({ novos, atribuidos, mes, ano }: { novos: number, atribuidos: number, mes: { name: string; tickets: number }[], ano: { name: string; tickets: number }[] }) {
  const anoatual = new Date().getFullYear();
  mes.sort((a, b) => b.tickets - a.tickets);
  ano.sort((a, b) => b.tickets - a.tickets);
  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ display: "flex", FlexDirection: "row" }}>
        <Card titulo="Chamados Novos" color="#f94668" valor={novos}></Card>
        <Card titulo="Chamados Atribuídos" color="#f26e14" valor={atribuidos}></Card>
        <Card
          titulo="Média de Avaliação do Mês"
          color="#14b1f2"
          valor="3.5"
        />
        <Card
          titulo="Média de Avaliação"
          ano={anoatual}
          color="#517bee"
          valor="4"
        />
        <Card
          titulo="Média de Avaliação Geral"
          color="#0a3299"
          valor="5"
        />
      </Box>
      <Box sx={{ display: "flex", FlexDirection: "row" }}>
        <PessoasMes data={mes} label={meses[new Date().getMonth()]} />
      </Box>
    </Box>
  );
}
