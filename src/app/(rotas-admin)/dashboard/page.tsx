import Content from '@/components/Content';
import Controle from '@/components/Controle';
import Dashboard from './Dashboard';
import * as chamadosServices from '@/shared/services/chamados.services';
import AlertaSonoro from '@/components/alertaSonoro';
export default async function Home() {
  const novos = await chamadosServices.chamadosNovos();
  const atribuidos = await chamadosServices.chamadosAtribuidos();
  const mes = await chamadosServices.chamadosMes();
  const mediaGeral: number[] = [];  
  const mediaMes: number[] = [];  
  const mediaAno: number[] = [];  

  function calcularMedia(avaliados: number[]) {
    var soma = 0;
    for (var i = 0; i < avaliados.length; i++) {
      soma += avaliados[i];
    }
    var media = soma / avaliados.length;
    return media;
  }

  await chamadosServices.chamadosAvaliados().then((response) => {
    for (let index = 0; index < response.length; index++) {
      response[index].satisfaction != null ? mediaGeral.push(response[index].satisfaction) : null;
    }
  });

  await chamadosServices.chamadosAvaliadosNoAno().then((response) => {
    for (let index = 0; index < response.length; index++) {
      response[index].satisfaction != null ? mediaMes.push(response[index].satisfaction) : null;
    }
  })

  await chamadosServices.chamadosAvaliadosNoAno().then((response) => {
    for (let index = 0; index < response.length; index++) {
      response[index].satisfaction != null ? mediaAno.push(response[index].satisfaction) : null;
    }
  })


  const ano: any[] = [];
  return (
    <Content
      titulo='Dashboard SMUL/Suporte'
      pagina='/'
    >
      <AlertaSonoro chamados={novos.quantidade} />
      <Dashboard
        novos={novos.quantidade}
        atribuidos={atribuidos.quantidade}
        mes={mes}
        ano={ano}
      />
      <Controle
        novos={novos.quantidade}
        atribuidos={atribuidos.quantidade}
        mes={mes}
        ano={ano}
        mediaGeral={calcularMedia(mediaGeral)}
        mediaMes={calcularMedia(mediaMes)}
        mediaAno={calcularMedia(mediaAno)}
      />
      <div style={{ marginTop: '70px', display: 'flex ' }}>
        <div style={{ width: '60%' }}>
        </div>
      </div>
    </Content>
  );
}