'use client'

import Content from '@/components/Content';
import React, { Suspense, useCallback, useContext, useEffect, useState } from 'react';
import * as chamadosServices from '@/shared/services/chamados.services';
import { Autocomplete, AutocompleteOption, Box, Button, ButtonGroup, Chip, ChipPropsColorOverrides, ColorPaletteProp, FormControl, FormLabel, IconButton, Input, Option, Select, Snackbar, Stack, Table, Textarea, Typography, useTheme } from '@mui/joy';
import { Add, Cancel, Check, Clear, Edit, Refresh, Search, Warning } from '@mui/icons-material';
import type { Avaliacao } from '@/shared/services/chamados.services';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Rating, TablePagination } from '@mui/material';
import { OverridableStringUnion } from '@mui/types'
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import * as usuarioServices from "@/shared/services/usuario.services";
import { IUsuario } from "@/shared/services/usuario.services";
import { AlertsContext } from "@/providers/alertsProvider";

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
  const [open, setOpen] = useState(false);
  const [comentario, setComentario] = useState('');
  const [estrelas, setEstrelas] = useState(0);
  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [usuario, setUsuario] = useState<IUsuario>();
  const { setAlert } = useContext(AlertsContext);


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

  const theme = useTheme();
  const router = useRouter();

  const avaliar = () => {
  chamadosServices.avaliar(
      id,
      estrelas.toString(),
      comentario,
    ).then(() => {
      setOpen(false);
      buscar();
      setAlert('Avaliação feita com Sucesso!', 'Agradecemos sua avaliação!', 'success', 3000, Check);
    })
  }

  useEffect(() => {
    buscar();
    usuarioServices.validaUsuario()
      .then((response: IUsuario) => {
        console.log(response);
        setUsuario(response);
      });
  }, []);

  const buscar = async () => {
    chamadosServices.buscar()
      .then((response) => {
        console.log(response);
        setAvaliacao(response);
      })
  }


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
            <th>N° Ticket</th>
            <th>Chamado</th>
            <th>Data Fechamento</th>
            <th>Técnico</th>
            <th>Avalicão</th>
          </tr>
        </thead>
        <tbody>
          {(avaliacao && avaliacao.length > 0) && avaliacao.map((avaliacao) => (

            <Tooltip color='transparent' title={avaliacao.comment != null ? avaliacao.comment : ''} followCursor key={avaliacao.id}>
              <tr key={avaliacao.id} className="cursor-pointer !important" >
                <td>{avaliacao.Tickets.id}</td>
                <td>{avaliacao.Tickets.name}</td>
                <td>{new Date(avaliacao.Tickets.closedate).toLocaleString('pt-BR').replace(',', '')}</td>
                <td>{avaliacao.Tickets.Usuarios[1] ? avaliacao.Tickets.Usuarios[1].user.firstname + ' ' + avaliacao.Tickets.Usuarios[1].user.realname : ''}</td>
                <td>
                  {avaliacao.satisfaction != null ? <Rating name="size-large" size="medium" value={avaliacao.satisfaction} readOnly />
                    : <Button variant="soft" color="danger" onClick={() => {
                      setId(avaliacao.id.toString());
                      setName(avaliacao.Tickets.name);
                      usuario != null && usuario.login == avaliacao.Tickets.Usuarios[0].user.name.toLocaleLowerCase() ?
                        (avaliacao.satisfaction == 0 || avaliacao.satisfaction == null ? setOpen(true) : setAlert('Tente novamente!', 'Chamado ja avaliado.', 'danger', 3000, Check)) :
                        setAlert('Tente novamente!', 'Voce não pode avaliar o chamado de outro usuário.', 'danger', 3000, Check);
                    }}>Avaliar
                    </Button>}
                </td>
              </tr>
            </Tooltip>

          ))}
        </tbody>
      </Table>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Avaliar Chamado</DialogTitle>
          <DialogContent>{name}</DialogContent>
          <form
            onSubmit={(event: React.FormEvent<HTMLFormElement>) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Name</FormLabel>
                <Rating name="size-large" size="large" sx={{ p: 2 }} value={estrelas} onChange={(_, value) => value && setEstrelas(value)} aria-required />
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
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
              <Button size="sm" variant="solid" onClick={avaliar}>
                Salvar
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
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
    </Content>
  );
}