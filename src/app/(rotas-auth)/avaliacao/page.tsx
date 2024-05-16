'use client'

import Content from '@/components/Content';
import React, { Suspense, useCallback, useContext, useEffect, useState } from 'react';
import * as avaliacaoServices from '@/shared/services/avalicao.services';
import { Autocomplete, AutocompleteOption, Box, Button, Chip, ChipPropsColorOverrides, ColorPaletteProp, FormControl, FormLabel, IconButton, Input, Option, Select, Snackbar, Stack, Table, Tooltip, Typography, useTheme } from '@mui/joy';
import { Add, Cancel, Check, Clear, Edit, Refresh, Search, Warning } from '@mui/icons-material';
import type { Avaliacao } from '@/shared/services/avalicao.services';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { AlertsContext } from '@/providers/alertsProvider';
import { Rating, TablePagination } from '@mui/material';
import { OverridableStringUnion } from '@mui/types';

export default function Avaliacao() {
  return (
    <Suspense>
      <SearchUsuarios />
    </Suspense>
  )
}

function SearchUsuarios() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const [avaliacao, setAvaliacao] = useState<Avaliacao[]>([]);
  const [pagina, setPagina] = useState(searchParams.get('pagina') ? Number(searchParams.get('pagina')) : 1);
  const [limite, setLimite] = useState(searchParams.get('limite') ? Number(searchParams.get('limite')) : 10);
  const [total, setTotal] = useState(searchParams.get('total') ? Number(searchParams.get('total')) : 1);
  const [status, setStatus] = useState(searchParams.get('status') ? Number(searchParams.get('status')) : 1);
  const [busca, setBusca] = useState(searchParams.get('busca') || '');
  const [permissao, setPermissao] = useState('');
  const [usuario, setUsuario] = useState<Avaliacao>({} as Avaliacao);

  const confirmaVazio: {
    aberto: boolean,
    confirmaOperacao: () => void,
    titulo: string,
    pergunta: string,
    color: OverridableStringUnion<ColorPaletteProp, ChipPropsColorOverrides>
  } = {
    aberto: false,
    confirmaOperacao: () => { },
    titulo: '',
    pergunta: '',
    color: 'primary'
  }
  const [confirma, setConfirma] = useState(confirmaVazio);
  const { setAlert } = useContext(AlertsContext);

  const theme = useTheme();
  const router = useRouter();

  useEffect(() => {
    avaliacaoServices.buscar()
      .then((response) => {
        console.log(response);
        setAvaliacao(response);
      })

  }, []);

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      params.set(name, value)
      return params.toString();
    },
    [searchParams]
  );

  const limpaFitros = () => {
    setBusca('');
    setStatus(1);
    setPermissao('');
    setPagina(1);
    setLimite(10);
    router.push(pathname);
  }


  const mudaPagina = (
    _: React.MouseEvent<HTMLButtonElement> | null, novaPagina: number,
  ) => {
    router.push(pathname + '?' + createQueryString('pagina', String(novaPagina + 1)));
    setPagina(novaPagina + 1);
  };

  const mudaLimite = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    router.push(pathname + '?' + createQueryString('limite', String(event.target.value)));
    setLimite(parseInt(event.target.value, 10));
    setPagina(1);
  };

  const permissoes: Record<string, { label: string, value: string, color: OverridableStringUnion<ColorPaletteProp, ChipPropsColorOverrides> | undefined }> = {
    'DEV': { label: 'Desenvolvedor', value: 'DEV', color: 'neutral' },
    'SUP': { label: 'Superadmin', value: 'SUP', color: 'primary' },
    'ADM': { label: 'Administrador', value: 'ADM', color: 'success' },
    'USR': { label: 'Usuário', value: 'USR', color: 'warning' },
  }

  return (
    <Content
      breadcrumbs={[
        { label: 'Avaliação', href: '/avaliacao' }
      ]}
      titulo='Avaliação'
      pagina='avaliacao'
    >
      <Snackbar
        variant="solid"
        color={confirma.color}
        size="lg"
        invertedColors
        open={confirma.aberto}
        onClose={() => setConfirma({ ...confirma, aberto: false })}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{ maxWidth: 360 }}
      >
        <div>
          <Typography level="title-lg">{confirma.titulo}</Typography>
          <Typography sx={{ mt: 1, mb: 2 }} level="title-md">{confirma.pergunta}</Typography>
          <Stack direction="row" spacing={1}>
            <Button variant="solid" color="primary" onClick={() => confirma.confirmaOperacao()}>
              Sim
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={() => setConfirma(confirmaVazio)}
            >
              Não
            </Button>
          </Stack>
        </div>
      </Snackbar>
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: { xs: 'none', sm: 'flex' },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: { xs: '120px', md: '160px' },
          },
          alignItems: 'end',
        }}
      >
        {/* <IconButton size='sm' onClick={'teste'}><Refresh /></IconButton> */}
        <IconButton size='sm' onClick={limpaFitros}><Clear /></IconButton>
        <FormControl sx={{ flex: 1 }} size="sm">
          <FormLabel>Buscar: </FormLabel>
          <Input
            startDecorator={<Search fontSize='small' />}
            value={busca}
            onChange={(event) => setBusca(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                router.push(pathname + '?' + createQueryString('busca', busca));

              }
            }}
          />
        </FormControl>
      </Box>
      <Table hoverRow sx={{ tableLayout: 'auto' }}>
        <thead>
          <tr>
            <th>Chamado</th>
            <th>Data Fechamento</th>
            <th>Técnico</th>
            <th>Avalicão</th>
            <th>Comentario</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {(avaliacao && avaliacao.length > 0) && avaliacao.map((avaliacao) => (
            <tr key={avaliacao.id}>
              <td onClick={() => router.push('/avaliacao/avaliar/')}>{avaliacao.Tickets.name}</td>
              <td onClick={() => router.push('/avaliacao/avaliar/')}>{avaliacao.Tickets.closedate.toString()}</td>
              <td onClick={() => router.push('/avaliacao/avaliar/')}>{avaliacao.Tickets.Usuarios[1] ? avaliacao.Tickets.Usuarios[1].user.firstname + ' ' + avaliacao.Tickets.Usuarios[1].user.realname : ''}</td>
              <td onClick={() => router.push('/avaliacao/avaliar/')}><Rating name="size-large" size="medium" value={avaliacao.satisfaction != null ? avaliacao.satisfaction : 0} readOnly /></td>
              <td onClick={() => router.push('/avaliacao/avaliar/')}>{avaliacao.comment}</td>
              <td onClick={() => router.push('/avaliacao/avaliar/')}>{avaliacao.satisfaction }</td>
            </tr>

          ))}
        </tbody>
      </Table>
      {(total && total > 0) ? <TablePagination
        component="div"
        count={total}
        page={(pagina - 1)}
        onPageChange={mudaPagina}
        rowsPerPage={limite}
        onRowsPerPageChange={mudaLimite}
        rowsPerPageOptions={[10, 25, 50, 100]}
        labelRowsPerPage="Registros por página"
        labelDisplayedRows={({ from, to, count }) => `${from}–${to} de ${count}`}
      /> : null}
      <IconButton onClick={() => router.push('/avaliacao/avaliar/')} color='primary' variant='soft' size='lg' sx={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
      }}><Add /></IconButton>
    </Content>
  );
}