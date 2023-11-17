'use client'

import Content from '@/components/Content';
import Head from 'next/head'

export default function Home() {
  return (
    <Content
      breadcrumbs={[]}
      titulo='Página Inicial'
      pagina='/'
    >
    </Content>
  );
}