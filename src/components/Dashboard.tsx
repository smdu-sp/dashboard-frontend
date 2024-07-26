'use client'

import Controle from "@/components/Controle";
import { Button, Modal, ModalClose, ModalDialog, ModalDialogProps, Stack } from "@mui/joy";

import React from "react";

export default function Dashboard({ mediaGeral, mediaMes, mediaAno, novos, atribuidos, chamado}: { mediaGeral: number, mediaMes: number, mediaAno: number, novos: number, atribuidos: number, chamado: any}) {
  const [layout, setLayout] = React.useState<ModalDialogProps['layout'] | undefined>(
      undefined,
    );
    return (
        <React.Fragment>
          <Stack direction="row" spacing={1}>
            <Button
              sx={{ position: 'fixed', bottom: 10, right: 10, zIndex: 1000 }}
              variant="soft"
              color="primary"
              onClick={() => {
                setLayout('fullscreen')
              }}
            >
              Mostrar Dashboard
            </Button>
          </Stack>
          <Modal open={!!layout} onClose={() => setLayout(undefined)}>
            <ModalDialog layout={layout}>
              <ModalClose />
              <Controle
                mt={0}
                novos={novos}
                atribuidos={atribuidos}
                mediaGeral={mediaGeral}
                mediaMes={mediaMes}
                mediaAno={mediaAno}
                chamado={chamado}
              />
            </ModalDialog>
          </Modal>
        </React.Fragment>
    );
}