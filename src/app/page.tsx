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
      breadcrumbs={[]}
      titulo='Página Inicial'
      pagina='/'
    >
      <Box
        className="SearchAndFilters-tabletUp"
        sx={{
          borderRadius: 'sm',
          py: 2,
          display: {
            xs: 'none',
            sm: 'flex',
          },
          flexWrap: 'wrap',
          gap: 1.5,
          '& > *': {
            minWidth: {
              xs: '120px',
              md: '160px',
            },
          },
        }}
      >
      </Box>      
    </Content>
  );
}