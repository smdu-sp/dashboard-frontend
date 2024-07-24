import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';
import { Chip } from '@mui/joy';

interface Chamado {
  nome: string
  descricao: string
}

export default function CardChamado(props: Chamado) {
  return (
    <Card variant="solid" invertedColors
      sx={{
        bgcolor: '#517bee',
        borderRadius: 10,
        width: 390,
        height: 295,
        marginTop: '5px',
        marginLeft: '5px',
        "--Card-padding": "24px",
        "--Card-radius": "0px",
        boxShadow: '1px 1px 10px 1px rgba(0, 0, 0, 0.2)',
      }}>
      <CardContent orientation="horizontal">
      <CardContent sx={{ width: "100%" }}>
          <Typography sx={{ color: "white", fontSize: "15px", textAlign: 'left', mb: 1 }}>Último Chamado</Typography>
          <Chip color='neutral' variant='soft' sx={{ margin: "0 auto" }} >
            <Typography sx={{ color: "white", fontSize: "30px" }}>{props.nome}</Typography>
          </Chip>
          <Typography sx={{ color: "white", fontSize: "25px", mt: "10px" }}>{props.descricao}</Typography>
        </CardContent>
      </CardContent>
    </Card>
  );
}