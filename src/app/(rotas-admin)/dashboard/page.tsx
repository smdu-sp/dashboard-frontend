import Content from '@/components/Content';
import Controle from '@/components/Controle';
import Dashboard from './Dashboard';
import * as chamadosServices from '@/shared/services/chamados.services';
import AlertaSonoro from '@/components/alertaSonoro';
export default async function Home() {
  const novos = await chamadosServices.chamadosNovos();
  const atribuidos = await chamadosServices.chamadosAtribuidos();
  const mes = await chamadosServices.chamadosMes();
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
      />
      <div style={{ marginTop: '70px', display: 'flex ' }}>
        <div style={{ width: '60%' }}>
        </div>
      </div>
    </Content>
  );
}