import * as React from 'react';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import Typography from '@mui/joy/Typography';

export default function CardDashboard(props: any) {
  return (
    <Card variant="solid" color={props.color} invertedColors
     sx={{
        width: 500,
        height: 120,
        marginTop: '5px',
        marginLeft: '5px',
        "--Card-padding": "24px",
        "--Card-radius": "0px"
      }}>
      <CardContent orientation="horizontal">        
        <CardContent>
          <Typography level="body-lg" height={11}>{props.titulo} {props.ano} </Typography>          
          <Typography level="h1" marginTop={2}>{props.valor}</Typography>
        </CardContent>
      </CardContent>      
    </Card>
  );
}