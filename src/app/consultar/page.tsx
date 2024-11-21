"use client";

import Footer from '../components/Footer';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface Projeto {
  id: number;
  custo: number;
  regiao: string;
  status: string;
  descricao: string;
}

export default function ProjectListPage() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [showFilterModal, setShowFilterModal] = useState(false); // Controla a exibição do modal
  const [filtroID, setFiltroID] = useState(''); // Armazena o ID do filtro
  const [filteredProjeto, setFilteredProjeto] = useState<Projeto | null>(null); // Resultado do filtro

  useEffect(() => {
    // Faz a requisição para carregar todos os projetos
    axios.get("http://localhost:8080/projetos/todos")
      .then((response) => {
        setProjetos(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar projetos:", error);
      });
  }, []);

  const handleFilter = () => {
    if (!filtroID) {
      alert("Digite um ID válido para filtrar!");
      return;
    }

    // Faz a requisição para buscar o projeto pelo ID
    axios.get(`http://localhost:8080/projetos/busca/${filtroID}`)
      .then((response) => {
        setFilteredProjeto(response.data); // Salva o projeto filtrado
        setShowFilterModal(false); // Fecha o modal
      })
      .catch((error) => {
        console.error("Erro ao buscar projeto:", error);
        alert("Projeto não encontrado ou erro na API.");
      });
  };

  const handleResetFilter = () => {
    setFilteredProjeto(null); // Remove o filtro aplicado
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Cabeçalho */}
      <header className="bg-white shadow-md py-6">
        <div className="container mx-auto px-6">
          <h1 className="text-4xl font-bold text-center text-blue-950">LISTAGEM DE PROJETOS</h1>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="flex-grow container mx-auto px-6 py-8">
        <div className="relative overflow-hidden bg-white shadow-lg rounded-lg" style={{ height: '500px' }}>
          <Image
            src="/images/fundo3.png"
            alt="Imagem de fundo"
            layout="fill"
            objectFit="cover"
            className="opacity-20"
          />
          <div className="relative z-10 p-4">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Id do Projeto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Custo do Projeto</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Região de Origem</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredProjeto ? (
                  <tr key={filteredProjeto.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{filteredProjeto.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">R$ {filteredProjeto.custo.toLocaleString('pt-BR')}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{filteredProjeto.regiao}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{filteredProjeto.status}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{filteredProjeto.descricao}</td>
                  </tr>
                ) : (
                  projetos.map((projeto) => (
                    <tr key={projeto.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{projeto.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">R$ {projeto.custo.toLocaleString('pt-BR')}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{projeto.regiao}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{projeto.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{projeto.descricao}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Botões de ação */}
        <div className="flex justify-center space-x-4 mt-6">
          <button
            onClick={() => setShowFilterModal(true)}
            className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded hover:bg-gray-300"
          >
            Filtrar
          </button>
          <button
            onClick={handleResetFilter}
            className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded hover:bg-gray-300"
          >
            Resetar Filtro
          </button>
        </div>
      </main>

      {/* Modal de Filtro */}
      {showFilterModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg">
            <h2 className="text-lg font-bold mb-4">Filtrar por ID</h2>
            <input
              type="text"
              value={filtroID}
              onChange={(e) => setFiltroID(e.target.value)}
              className="border border-gray-300 rounded px-4 py-2 w-full"
              placeholder="Digite o ID do projeto"
            />
            <div className="flex justify-end space-x-4 mt-4">
              <button
                onClick={() => setShowFilterModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded hover:bg-gray-300"
              >
                Cancelar
              </button>
              <button
                onClick={handleFilter}
                className="px-4 py-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
              >
                Filtrar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
