"use client";

import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CadastrarProjeto() {
  const [nomeDoProjeto, setNomeDoProjeto] = useState("");
  const [regiao, setRegiao] = useState("");
  const [custo, setCusto] = useState("");
  const [status, setStatus] = useState(""); // Adicionando o estado para status
  const [descricao, setDescricao] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/projetos/criar", {
        nomeDoProjeto,
        regiao,
        custo,
        status,
        descricao,
      });

      if (response.status === 200 || response.status === 201) {
        // Redireciona para a página inicial após o cadastro bem-sucedido
        router.push("/");
      } else {
        console.error("Erro ao cadastrar projeto");
      }
    } catch (error) {
      console.error("Erro ao enviar dados para a API", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-150">
      <header className="bg-white py-6 w-full shadow-md text-center">
        <h1 className="text-4xl font-bold text-blue-950">CADASTRAR PROJETOS</h1>
        <p className="text-gray-600 font-light text-1xl">Novo Projeto? Cadastre abaixo.</p>
      </header>

      <main className="flex-grow w-full max-w-lg p-6 bg-white shadow-lg rounded-lg relative">
        <div className="absolute inset-0 opacity-20">
          <Image
            src="/images/fundo3.png"
            alt="Imagem de fundo"
            layout="fill"
            objectFit="cover"
          />
        </div>

        <form onSubmit={handleSubmit} className="relative z-10 space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fontes de Energia: Tipos
            </label>
            <input
              type="text"
              value={nomeDoProjeto}
              onChange={(e) => setNomeDoProjeto(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Região: Estado (UF)
            </label>
            <input
              type="text"
              value={regiao}
              onChange={(e) => setRegiao(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Custo
            </label>
            <input
              type="number"
              value={custo}
              onChange={(e) => setCusto(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Status: Iniciado, em Desenvolvimento, etc
            </label>
            <input
              type="text"
              value={status} // Usando o estado status
              onChange={(e) => setStatus(e.target.value)} // Atualizando o estado status
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Descrição: Resumo do projeto
            </label>
            <textarea
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              rows={4}
            />
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 mt-4 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
          >
            Enviar
          </button>
        </form>
      </main>
    </div>
  );
}
