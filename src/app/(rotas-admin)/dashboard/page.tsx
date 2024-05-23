'use client'
import Content from '@/components/Content';
import Controle from '@/components/Controle';
import Dashboard from './Dashboard';
import * as chamadosServices from '@/shared/services/chamados.services';
import AlertaSonoro from '@/components/alertaSonoro';
import { Box } from '@mui/material';
import { useEffect, useState } from 'react';

export default function Home() {
  const [novos, setNovos] = useState<{ quantidade: number }>({ quantidade: 0 });
  const [atribuidos, setAtribuidos] = useState<{ quantidade: number }>({ quantidade: 0 });
  // const [mes, setMes] = useState<any[]>([]);
  // const [doze, setDoze] = useState<any[]>([]);
  const [mediaGeral, setMediaGeral] = useState<number[]>([]);
  const [mediaMes, setMediaMes] = useState<number[]>([]);
  const [mediaAno, setMediaAno] = useState<number[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const novosData = await chamadosServices.chamadosNovos();
      const atribuidosData = await chamadosServices.chamadosAtribuidos();
      const avaliadosData = await chamadosServices.chamadosAvaliados();
      const avaliadosNoMesData = await chamadosServices.chamadosAvaliadosNoMes();
      const avaliadosNoAnoData = await chamadosServices.chamadosAvaliadosNoAno();

      setNovos(novosData);
      setAtribuidos(atribuidosData);
      setMediaGeral(avaliadosData.filter((chamado: { satisfaction?: any }) => chamado.satisfaction !== null).map((chamado: { satisfaction: any }) => chamado.satisfaction));
      setMediaMes(avaliadosNoMesData.filter((chamado: { satisfaction?: any }) => chamado.satisfaction !== null).map((chamado: { satisfaction: any }) => chamado.satisfaction));
      setMediaAno(avaliadosNoAnoData.filter((chamado: { satisfaction?: any }) => chamado.satisfaction !== null).map((chamado: { satisfaction: any }) => chamado.satisfaction));
    };

    fetchData();

    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box>
      <Content
        titulo='Dashboard SMUL/Suporte'
        pagina='/'
      >
        <AlertaSonoro chamados={novos.quantidade} />
        <Dashboard
          novos={novos.quantidade}
          atribuidos={atribuidos.quantidade}
          mediaGeral={calcularMedia(mediaGeral)}
          mediaMes={calcularMedia(mediaMes)}
          mediaAno={calcularMedia(mediaAno)}
        />
        <Controle
          novos={novos.quantidade}
          atribuidos={atribuidos.quantidade}
          mediaGeral={calcularMedia(mediaGeral)}
          mediaMes={calcularMedia(mediaMes)}
          mediaAno={calcularMedia(mediaAno)}
        />
        <div style={{ marginTop: '70px', display: 'flex ' }}>
          <div style={{ width: '60%' }}>
          </div>
        </div>
      </Content>
    </Box>
  );
}

function calcularMedia(avaliados: number[]) {
  var soma = 0;
  for (var i = 0; i < avaliados.length; i++) {
    soma += avaliados[i];
  }
  var media = soma / avaliados.length;
  return media;
}
