'use client';

import { useEffect } from 'react';

interface AlertaSonoroProps {
  chamados: number;
}

export default function AlertaSonoro({ chamados }: AlertaSonoroProps) {
  useEffect(() => {
    if (chamados > 0) {
      const audio = new Audio('/alert.mp3');
      audio.play();
    }
  }, [chamados]);

  console.log('O numero de novos chamados e: ', chamados);

  return null;
}