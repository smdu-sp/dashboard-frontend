'use client'

import Content from '@/components/Content';
import { useEffect, useState } from 'react';

export default function Home() {
  const [ usuarios, setUsuarios ] = useState<any[]>([]);
  return (
    <Content
      titulo='Página Inicial'
      pagina='/'
    >
      {usuarios?.map((usuario) => (
        <div key={usuario.id}>
          {usuario.login}
        </div>
      ))}
    </Content>
  );
}