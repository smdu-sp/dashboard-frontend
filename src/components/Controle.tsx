'use client'

import * as React from 'react';
import Card from "@/components/Card";
import { Box } from "@mui/joy";
import PessoasMes from "@/components/PessoasMes";
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
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

export default function Controle({ mediaGeral, mediaMes, mediaAno, novos, atribuidos, mt }: { mediaGeral: number, mt: number, mediaMes: number, mediaAno: number, novos: number, atribuidos: number }) {

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
  // mes.sort((a, b) => b.tickets - a.tickets);
  // ano.sort((a, b) => b.tickets - a.tickets);
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  const AutoPlaySwipeableViews = autoPlay(SwipeableViews);


  return (
    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ display: "flex", width: "100%", height: '300px', justifyContent: "center", gap: 2 }}>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <Card titulo="Chamados Novos" color="#f94668" size="30px" mt={10} sizeNum="60px" valor={novos}></Card>
          <Card titulo="Chamados Atribuídos" color="#f26e14" size="30px" mt={10} sizeNum="60px" valor={atribuidos}></Card>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <Card titulo="Média de Avaliação do Ano" ano={anoatual} mt={2} color="#14b1f2" valor={mediaAno} />
          <Card titulo="Média de Avaliação Geral" color="#517bee" mt={2} valor={mediaGeral} />
        </Box>
        <Box sx={{ display: "flex", flexDirection: "row", gap: 2 }}>
          <Card titulo="Média de Avaliação Mensal" size="30px" sizeNum="60px" mt={10} color="#0a3299" valor={mediaMes} />
        </Box>
      </Box>
      <Box>
        <Box sx={{ maxWidth: 1400, maxHeight: 300, flexGrow: 1 }}>
          <Paper
            square
            elevation={0}
            sx={{
              display: 'flex',
              alignItems: 'center',
              pl: 2,
              minWidth: "1400px",
              mt: 5
            }}
          >
          </Paper>
          <AutoPlaySwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={activeStep}
            onChangeIndex={handleStepChange}
            interval={30000}
            enableMouseEvents
          >
            {images.map((step, index) => (
              <Box key={step.labels} sx={{}}>
                {Math.abs(activeStep - index) <= 2 ? (
                  <PessoasMes data={step.grafic} label={step.labels} />
                ) : null}
              </Box>
            ))}
          </AutoPlaySwipeableViews>
        </Box>
      </Box>
    </Box>
  );
}
