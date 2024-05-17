'use client'

import Controle from "@/components/Controle";
import { Button, Modal, ModalClose, ModalDialog, ModalDialogProps, Stack } from "@mui/joy";
import React from "react";

export default function Dashboard({ novos, atribuidos, mes, ano }: { novos: number, atribuidos: number, mes: { name: string; tickets: number }[], ano: { name: string; tickets: number }[] }) {
    const [layout, setLayout] = React.useState<ModalDialogProps['layout'] | undefined>(
      undefined,
    );
    return (
        <React.Fragment>
          <Stack direction="row" spacing={1}>
            <Button
              sx={{ position: 'fixed', bottom: 10, right: 10 }}
              variant="soft"
              color="primary"
              onClick={() => {
                setLayout('fullscreen');
              }}
            >
              Mostrar Dashboard
            </Button>
          </Stack>
          <Modal open={!!layout} onClose={() => setLayout(undefined)}>
            <ModalDialog layout={layout}>
              <ModalClose />
              <Controle
                novos={novos}
                atribuidos={atribuidos}
                mes={mes}
                ano={ano}
              />
            </ModalDialog>
          </Modal>
        </React.Fragment>
    );
}