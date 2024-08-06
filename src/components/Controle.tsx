'use client'

import * as React from 'react';
import Card from "@/components/Card";
import CardChamado from "@/components/CardChamado";
import { Box } from "@mui/joy";
import PessoasMes from "@/components/PessoasMes";
import { useTheme } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';
import * as chamadosServices from '@/shared/services/chamados.services';
import { useEffect, useState } from 'react';
import {UltimosChamados} from '@/shared/services/chamados.services';

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

export default function Controle({ mediaGeral, mediaMes, mediaAno, novos, atribuidos, chamado }: { mediaGeral: number, mt: number, mediaMes: number, mediaAno: number, novos: number, atribuidos: number, chamado?: any }) {

  const [mesAtual, setMes] = useState<any[]>([]);
  const [dozeMeses, setDoze] = useState<any[]>([]);

  const mes = async () => await chamadosServices.chamadosMes();
  const ano = async () => await chamadosServices.chamadosAno();

  useEffect(() => {

    async function fetchData() {
      const mesData = await mes();
      const anoData = await ano();
      setMes(mesData);
      setDoze(anoData);
    }
    fetchData();

    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
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
      <Box sx={{ display: "flex", width: "120%", justifyContent: "center", gap: 2}}>
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: '300px', height: '900px' }}>
          <Card titulo="Chamados Novos" width="380" color="#f94668" size="30px" mt={10} sizeNum="90px" valor={novos}></Card>
          <Card titulo="Chamados Atribuídos"  width="480" color="#f26e14" size="30px" mt={10} sizeNum="90px" valor={atribuidos}></Card>
        </Box>
        <Box>
          <Box sx={{ display: "flex", flexDirection: "row", gap: 2, height: '300px', justifyContent: 'center' }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Card titulo="Média de Avaliação do Ano" ano={anoatual} mt={2} color="#14b1f2" valor={isNaN(mediaAno) ? 0 : mediaAno} />
              <Card titulo="Média de Avaliação Geral" color="#517bee" mt={2} valor={isNaN(mediaGeral) ? 0 : mediaGeral} />
            </Box>
            <Card titulo="Média de Avaliação Mensal" size="30px" sizeNum="60px" mt={10} color="#0a3299" valor={isNaN(mediaMes) ? 0 : mediaMes} />
            <CardChamado width="350px" nome={(chamado.Usuarios != undefined ? chamado.Usuarios[0].user.firstname : '') + " " + (chamado.Usuarios != undefined ? chamado.Usuarios[0].user.realname : '')} descricao={chamado.name} />
          </Box>
          <Box>
            <Box sx={{ maxWidth: 1200, maxHeight: 300, flexGrow: 1 }}>
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
      </Box>

    </Box>
  );
}
