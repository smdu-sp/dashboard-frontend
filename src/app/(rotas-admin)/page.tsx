
'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Content from '@/components/Content';
import Controle from '@/components/Controle';
import Dashboard from '../../components/Dashboard';
import * as chamadosServices from '@/shared/services/chamados.services';
import { UltimosChamados } from '@/shared/services/chamados.services';
import AlertaSonoro from '@/components/alertaSonoro';
import { Box } from '@mui/material';
import DashboardInicial from '@/components/DashboardInicial';

export default function Home() {
  const [novos, setNovos] = useState({ quantidade: 0 });
  const [atribuidos, setAtribuidos] = useState({ quantidade: 0 });
  const [mediaGeral, setMediaGeral] = useState([]);
  const [mediaMes, setMediaMes] = useState([]);
  const [mediaAno, setMediaAno] = useState([]);
  const [chamado, setChamado] = useState({});

  useEffect(() => {

    const fetchData = async () => {
      const novosData = await chamadosServices.chamadosNovos();
      const atribuidosData = await chamadosServices.chamadosAtribuidos();
      const avaliadosData = await chamadosServices.chamadosAvaliados();
      const avaliadosNoMesData = await chamadosServices.chamadosAvaliadosNoMes();
      const avaliadosNoAnoData = await chamadosServices.chamadosAvaliadosNoAno();
      await chamadosServices.ultimoChamado()
        .then((response: UltimosChamados) => {
          setChamado(response)
        })


      setNovos(novosData);
      setAtribuidos(atribuidosData);
      setMediaGeral(avaliadosData.filter((chamado: { satisfaction?: any }) => chamado.satisfaction !== null).map((chamado: { satisfaction: any }) => chamado.satisfaction));
      setMediaMes(avaliadosNoMesData.filter((chamado: { satisfaction?: any }) => chamado.satisfaction !== null).map((chamado: { satisfaction: any }) => chamado.satisfaction));
      setMediaAno(avaliadosNoAnoData.filter((chamado: { satisfaction?: any }) => chamado.satisfaction !== null).map((chamado: { satisfaction: any }) => chamado.satisfaction));
    };

    fetchData();

    const interval = setInterval(fetchData, 61000);

    return () => clearInterval(interval);
  }, []);


  return (
    <Box>
      <Content
        breadcrumbs={[
          { label: 'Dashboard', href: '/dashboard' }
        ]}
        titulo='Dashboard SMUL/Suporte'
        pagina='dashboard'
      >
        <AlertaSonoro chamados={novos.quantidade} />
        <Dashboard
          novos={novos.quantidade}
          atribuidos={atribuidos.quantidade}
          mediaGeral={calcularMedia(mediaGeral)}
          mediaMes={calcularMedia(mediaMes)}
          mediaAno={calcularMedia(mediaAno)}
          chamado={chamado}
        />
        <DashboardInicial
          novos={novos.quantidade}
          atribuidos={atribuidos.quantidade}
          mediaGeral={calcularMedia(mediaGeral)}
          mediaMes={calcularMedia(mediaMes)}
          mediaAno={calcularMedia(mediaAno)}
          chamado={chamado}
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
