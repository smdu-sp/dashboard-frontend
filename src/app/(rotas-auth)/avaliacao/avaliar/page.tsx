'use client'

import Content from '@/components/Content';
import { Suspense, useCallback, useContext, useEffect, useState } from 'react';
import { Autocomplete, AutocompleteOption, Box, Button, Card, CardActions, CardOverflow, Chip, ChipPropsColorOverrides, ColorPaletteProp, Divider, FormControl, FormLabel, IconButton, Input, Option, Select, Snackbar, Stack, Table, Textarea, Tooltip, Typography, useTheme } from '@mui/joy';
import { Add, Cancel, Check, Clear, Edit, Refresh, Search, Warning } from '@mui/icons-material';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import * as avaliacaoServices from '@/shared/services/avalicao.services';
import { AlertsContext } from '@/providers/alertsProvider';
import { Rating, TablePagination } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';
import { log } from 'console';

export default function Home() {

  const [estrelas, setEstrelas] = useState(0);
  const [comentario, setComentario] = useState('');

  // const { id } = props.params;
  const router = useRouter();
  const { setAlert } = useContext(AlertsContext);

  const inserir = () => {
    var usuario_id = 'awdawd';
    avaliacaoServices.criar(
      estrelas.toString(),
      comentario,
      usuario_id
    )
  }

  // useEffect(() => {
  // }, []);

  return (
    <Content
      titulo='Tickets'
      pagina='/'
    >
      <Box
        sx={{
          display: 'flex',
          mx: 'auto',
          width: '90%',
          maxWidth: 800,
          px: { xs: 2, md: 6 },
          py: { xs: 2, md: 3 },
        }}
      >
        <Card sx={{ width: '100%' }}>
          <Stack spacing={2} >

            <Stack>
              <Stack sx={{ display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center', flexDirection: 'column' }}>
                <FormLabel >Clique em uma das estrelas para avaliação</FormLabel>
                <Rating name="size-large" size="large" sx={{ p: 2 }} value={estrelas} onChange={(_, value) => value && setEstrelas(value)} />
              </Stack>
              <Divider />
              <Stack mt={2}>
                <FormControl>
                  <FormLabel>Comentário</FormLabel>
                  <Textarea
                    placeholder="Adicione seu comentário"
                    value={comentario}
                    onChange={(event) => setComentario(event.target.value)}
                    minRows={2}
                    maxRows={4}
                    endDecorator={
                      <Typography level="body-xs" sx={{ ml: 'auto' }}>
                        {comentario.length} character(s)
                      </Typography>
                    }
                    sx={{ minWidth: 300 }}
                  />
                </FormControl>
              </Stack>
            </Stack>
          </Stack>
          <CardOverflow sx={{ borderTop: '1px solid', borderColor: 'divider' }}>
            <CardActions sx={{ alignSelf: 'flex-end', pt: 2 }}>
              <Button size="sm" variant="outlined" color="neutral" onClick={() => router.back()}>
                Cancelar
              </Button>
              <Button size="sm" variant="solid" onClick={inserir}>
                Salvar
              </Button>
            </CardActions>
          </CardOverflow>
        </Card>
      </Box>
    </Content>
  );
}