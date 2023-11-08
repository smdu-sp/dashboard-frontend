'use client'

import Table from '@mui/joy/Table';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import Content from '@/components/Content';
import { Box, FormControl, FormLabel, Input, Select, IconButton, Option, Button } from '@mui/joy';
import { KeyboardArrowLeft, KeyboardArrowRight, Search } from '@mui/icons-material';


export default function Home() {
  
  return (
    <Content
      breadcrumbs={[
        { label: 'Cadastro', href: '/cadastro' },
        { label: 'Editar', href: '/cadastro/editar' },
      ]}
      titulo='Cadastro'
      pagina='/cadastro'
    >
    </Content>
  );
}