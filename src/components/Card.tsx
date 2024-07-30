import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

export default function CardDashboard(props: any) {
  return (
    <Card variant="solid" invertedColors
     sx={{
        bgcolor: props.color,
        borderRadius: 10,
        width: props.width,
        maxHeight: '100%',
        height: 295,
        marginTop: '5px',
        marginLeft: '5px',
        "--Card-padding": "24px",
        "--Card-radius": "0px",
        boxShadow: '1px 1px 10px 1px rgba(0, 0, 0, 0.2)',
      }}>
      <CardContent orientation="horizontal">        
        <CardContent>
          <Typography level="body-lg" fontSize={props.size} height={11}>{props.titulo} {props.ano} </Typography>          
          <Typography level="h1" fontSize={props.sizeNum} marginTop={props.mt}>{props.valor.toString().length > 3 ? Math.floor(props.valor * 10) / 10 : props.valor}</Typography>
        </CardContent>
      </CardContent>      
    </Card>
  );
}