'use client'

import Card from "@/components/Card";
import { Box } from "@mui/joy";
import PessoasMes from "@/components/PessoasMes";
import * as chamadosServices from '@/shared/services/chamados.services';
import { ChamadosAvaliados } from "@/shared/services/chamados.services";
import { useEffect, useState } from "react";
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

  const [mediaGeral, setMediaGeral] = useState(0);
  const [mediaMes, setMediaMes] = useState(0);
  const [mediaAno, setMediaAno] = useState(0);


  function calcularMedia(avaliados: number[]) {
    var soma = 0;
    for (var i = 0; i < avaliados.length; i++) {
      soma += avaliados[i];
    }
    var media = soma / avaliados.length;
    return media;
  }

  const buscaValores = () => {
    chamadosServices.chamadosAvaliados().then((response) => {
      const filteredResponse = response.filter((chamado: ChamadosAvaliados) => chamado.satisfaction !== null);
      setMediaGeral(calcularMedia(filteredResponse.map((chamado: ChamadosAvaliados) => chamado.satisfaction)));
    });

    chamadosServices.chamadosAvaliados().then((response) => {
      const filteredResponse = response.filter((chamado: ChamadosAvaliados) => chamado.satisfaction !== null);
      setMediaMes(calcularMedia(filteredResponse.map((chamado: ChamadosAvaliados) => chamado.satisfaction)));
    });

    chamadosServices.chamadosAvaliados().then((response) => {
      const filteredResponse = response.filter((chamado: ChamadosAvaliados) => chamado.satisfaction !== null);
      setMediaAno(calcularMedia(filteredResponse.map((chamado: ChamadosAvaliados) => chamado.satisfaction)));
    });
  }

  useEffect(() => {
    buscaValores();
  }, []);

  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ display: "flex", FlexDirection: "row", width: "100%", justifyContent: "center", gap: 2, mb: 5 }}>
        <Card titulo="Chamados Novos" color="#f94668" valor={novos}></Card>
        <Card titulo="Chamados Atribuídos" color="#f26e14" valor={atribuidos}></Card>
        <Card
          titulo="Média de Avaliação do Mês"
          color="#14b1f2"
          valor={isNaN(mediaMes) ? '0' : mediaMes}
        />
        <Card
          titulo="Média de Avaliação"
          ano={anoatual}
          color="#517bee"
          valor={isNaN(mediaAno) ? '0' : mediaAno}
        />
        <Card
          titulo="Média de Avaliação Geral"
          color="#0a3299"
          valor={isNaN(mediaGeral) ? '0' : mediaGeral}
        />
      </Box>
      <Box sx={{ display: "flex", FlexDirection: "row", width: "80vw", justifyContent: "center", alignItems: "center" }}>
        <PessoasMes data={mes} label={meses[new Date().getMonth()]} />
      </Box>
    </Box>
  );
}
