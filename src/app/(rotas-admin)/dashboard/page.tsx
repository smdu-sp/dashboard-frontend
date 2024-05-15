'use client'

import Content from '@/components/Content';
import { useSearchParams } from 'next/navigation';
import * as React from 'react';
import Button from '@mui/joy/Button';
import Stack from '@mui/joy/Stack';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import ModalDialog, { ModalDialogProps } from '@mui/joy/ModalDialog';
import GraficoMes from '@/components/GraficoMes';
import PessoasMes from '@/components/PessoasMes';
import { Grid, Sheet } from '@mui/joy';
import Controle from '@/components/Controle';
export default function Home() {
  const [layout, setLayout] = React.useState<ModalDialogProps['layout'] | undefined>(
    undefined,
  );
  return (
    <Content
      titulo='Dashboard SMUL/Suporte'
      pagina='/'
    >
      <Controle />
      <React.Fragment>
        <Stack direction="row" spacing={1}>
          <Button
            sx={{ position: 'fixed', bootom: 0, right: '10px', width: 200 }}
            variant="soft"
            color="primary"
            onClick={() => {
              setLayout('fullscreen');
            }}
          >
            Mostrar Dashborad
          </Button>
        </Stack>
        <Modal open={!!layout} onClose={() => setLayout(undefined)}>
          <ModalDialog layout={layout}>
            <ModalClose />
            <Controle />
          </ModalDialog>
        </Modal>
      </React.Fragment>
      <div style={{ marginTop: '70px', display: 'flex ' }}>
        <div style={{ width: '60%' }}>
        </div>
      </div>
    </Content>
  );
}