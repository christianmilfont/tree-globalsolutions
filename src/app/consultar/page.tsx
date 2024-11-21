"use client"

import Footer from '../components/Footer';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';  // Importando o axios

// Defina a interface para o tipo dos projetos
interface Projeto {
  id: number;
  custo: number;
  tipoFonte: string;
  regiao: string;
  status: string;
  descricao: string;
}

export default function ProjectListPage() {
  // Declare o estado com o tipo `Projeto[]`
  const [projetos, setProjetos] = useState<Projeto[]>([]);

  useEffect(() => {
    // Faz a requisição para a API do backend usando axios
    axios.get("http://localhost:8080/projetos/buscar")
      .then((response) => {
        setProjetos(response.data);  // A resposta já é um objeto JSON
      })
      .catch((error) => {
        console.error("Erro ao buscar projetos:", error);  // Tratamento de erro
      });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Título da página */}
      <header className="bg-white shadow-md py-6">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center text-blue-950">LISTAGEM DE PROJETOS</h1>
        </div>
      </header>

      {/* Tabela de Projetos */}
      <main className="flex-grow container mx-auto px-6 py-8">
        <div className="relative overflow-hidden bg-white shadow-lg rounded-lg" style={{ height: '500px' }}>
          {/* Imagem de fundo */}
          <Image
            src="/images/fundo3.png"
            alt="Imagem de fundo"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
          />
          
          {/* Tabela sobre a imagem */}
          <div className="relative z-10 p-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id do Projeto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Custo do Projeto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo de Fonte Utilizada</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Região de Origem</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {projetos.map((projeto) => (
                  <tr key={projeto.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{projeto.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">R$ {projeto.custo.toLocaleString('pt-BR')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{projeto.tipoFonte}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{projeto.regiao}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{projeto.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{projeto.descricao}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex justify-center space-x-4 mt-6">
          <button className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded hover:bg-gray-300">Filtrar</button>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded hover:bg-gray-300">Atualizar</button>
          <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700">Cadastrar</button>
        </div>
      </main>

      {/* Rodapé */}
      <Footer />
    </div>
  );
}
