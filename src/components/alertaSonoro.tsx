'use client';

import { Button } from '@mui/joy';
import { useEffect } from 'react';

interface AlertaSonoroProps {
  chamados: number;
}

export default function AlertaSonoro({ chamados }: AlertaSonoroProps) {
  const main = () => {
    const text = `${chamados.toString()} chamado${chamados > 1 || chamados === 0 ? 's' : ''} aberto${chamados > 1 || chamados === 0? 's' : ''} no GLPI`;
    const speed = 2;
    if (window.speechSynthesis.getVoices().length) {
      const value: any = new SpeechSynthesisUtterance(text);
      value.rate = speed;
      value.voices = 'female';
      window.speechSynthesis.speak(value);
    } else {
      window.speechSynthesis.onvoiceschanged = () => {
        const value: any = new SpeechSynthesisUtterance(text);
        value.rate = speed;
        value.voices = 'female';
        window.speechSynthesis.speak(value);
      };
    }
  };
  useEffect(() => {
    if (chamados > 0) {
      main();
    }
  }, [chamados]);

  return (null);
}