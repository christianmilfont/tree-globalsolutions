"use client";

import { useState } from "react";
import { redirect } from "next/navigation"; // Importa o redirect para redirecionamento após o envio
import { GoCodeOfConduct } from "react-icons/go";

export default function CadastroPage() {
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [documento, setDocumento] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("cnpj"); // 'cnpj' por padrão

  // Função para manipular o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Define a URL com base no tipo de documento selecionado
    const apiUrl =
      tipoDocumento === "cnpj"
        ? "http://localhost:8080/pessoa/juridica/criar"
        : "http://localhost:8080/pessoa/fisica/criar";

    // Dados enviados
    const body =
      tipoDocumento === "cnpj"
        ? {
            nomeEmpresa,
            email,
            senha,
            cnpj: documento, // Campo esperado para pessoa jurídica
          }
        : {
            nome: nomeEmpresa, // Campo esperado para pessoa física
            email,
            senha,
            cpf: documento, // Campo esperado para pessoa física
          };

    console.log("Dados enviados para a API:", body); // Log para depuração

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        // Redireciona para a tela home se o cadastro for bem-sucedido
        redirect("/home");
      } else {
        console.error("Erro ao cadastrar usuário");
      }
    } catch (error) {
      console.error("Erro ao enviar dados para a API", error);
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-gray-800"
      style={{ backgroundImage: 'url("/images/fundo2.jpg")' }}
    >
      <h2 className="text-3xl text-white font-bold mb-2">Seja um Parceiro</h2>
      <GoCodeOfConduct className="text-6xl text-white" />

      <form onSubmit={handleSubmit} className="flex flex-col w-80 space-y-4">
        <input
          type="text"
          placeholder={
            tipoDocumento === "cnpj" ? "Nome da Empresa" : "Nome Completo"
          }
          value={nomeEmpresa}
          onChange={(e) => setNomeEmpresa(e.target.value)}
          className="p-2 border rounded opacity-60"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border rounded opacity-60"
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          className="p-2 border rounded opacity-60"
        />

        {/* Adiciona a opção de escolher entre CNPJ ou CPF */}
        <div className="flex items-center space-x-4">
          <label>
            <input
              type="radio"
              name="tipoDocumento"
              value="cnpj"
              checked={tipoDocumento === "cnpj"}
              onChange={() => setTipoDocumento("cnpj")}
              className="mr-2"
            />
            CNPJ
          </label>
          <label>
            <input
              type="radio"
              name="tipoDocumento"
              value="cpf"
              checked={tipoDocumento === "cpf"}
              onChange={() => setTipoDocumento("cpf")}
              className="mr-2"
            />
            CPF
          </label>
        </div>

        {/* O campo para inserir o CNPJ ou CPF */}
        <input
          type="text"
          placeholder={tipoDocumento === "cnpj" ? "CNPJ" : "CPF"} // Muda o placeholder dependendo da escolha
          value={documento}
          onChange={(e) => {
            setDocumento(e.target.value); // Atualiza o estado com o valor inserido
            console.log("Documento atualizado:", e.target.value); // Log para depuração
          }}
          className="p-2 border rounded opacity-60"
        />

        <button type="submit" className="bg-gray-600 text-white py-2 rounded opacity-60">
          Cadastrar
        </button>
      </form>
    </div>
  );
}
