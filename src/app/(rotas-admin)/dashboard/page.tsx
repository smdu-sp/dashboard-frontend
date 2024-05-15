"use client";

import Content from "@/components/Content";
import Card from "@/components/Card";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const anoatual = new Date().getFullYear();
  return (
    <Content titulo="Dashboard SMUL/Suporte" pagina="/">
      {" "}
      <div className="flex flex-wrap">
        <Card titulo="Chamados Novos" color="primary" valor="0"></Card>
        <Card titulo="Chamados Atribuídos" color="success" valor="0"></Card>
        <Card
          titulo="Média de Avaliação do Mês"
          color="neutral"
          valor="3.5"
        ></Card>
        <Card
          titulo="Média de Avaliação"
          ano={anoatual}
          color="danger"
          valor="4"
        ></Card>
        <Card
          titulo="Média de Avaliação Geral"
          color="warning"
          valor="5"
        ></Card>
      </div>
      <div style={{ marginTop: "70px", display: "flex " }}>
        <div style={{ width: "60%" }}></div>
      </div>
    </Content>
  );
}
