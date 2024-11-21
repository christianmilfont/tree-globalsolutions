"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter para redirecionamento
import { GoCodeOfConduct } from "react-icons/go";
import axios from "axios"; // Importa Axios

export default function CadastroPage() {
  const router = useRouter(); // Hook para redirecionamento
  const [nomeEmpresa, setNomeEmpresa] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [documento, setDocumento] = useState("");
  const [tipoDocumento, setTipoDocumento] = useState("cnpj"); // 'cnpj' por padrão
  const [loading, setLoading] = useState(false); // Para controlar o estado de carregamento durante a requisição

  // Função para manipular o envio do formulário
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Inicia o carregamento

    const apiUrl =
      tipoDocumento === "cnpj"
        ? "http://localhost:8080/pessoa/juridica/criar"
        : "http://localhost:8080/pessoa/fisica/criar";

    const body =
      tipoDocumento === "cnpj"
        ? {
            nomeEmpresa,
            email,
            senha,
            cnpj: documento,
          }
        : {
            nome: nomeEmpresa,
            email,
            senha,
            cpf: documento,
          };

    try {
      const response = await axios.post(apiUrl, body, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Dados retornados pela API:", response.data);

      if (response.status === 200 || response.status === 201) {
        if (response.data && typeof response.data === "object") {
          // Salva os dados retornados pela API
          localStorage.setItem("user", JSON.stringify(response.data));
        } else {
          // Cria manualmente o objeto caso o retorno seja insuficiente
          const userData = {
            nomeEmpresa,
            email,
            senha,
            documento,
            tipoDocumento,
          };
          localStorage.setItem("user", JSON.stringify(userData));
        }
        alert("Cadastro realizado com sucesso!");
        // Redireciona para a página de login
        router.push("/login");
      } else {
        alert("Erro ao cadastrar usuário. Tente novamente.");
      }
    } catch (error) {
      console.error("Erro ao enviar dados para a API", error);
      alert("Erro ao cadastrar usuário.");
    } finally {
      setLoading(false); // Finaliza o carregamento
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
          placeholder={tipoDocumento === "cnpj" ? "Nome da Empresa" : "Nome Completo"}
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

        <input
          type="text"
          placeholder={tipoDocumento === "cnpj" ? "CNPJ" : "CPF"}
          value={documento}
          onChange={(e) => setDocumento(e.target.value)}
          className="p-2 border rounded opacity-60"
        />

        <button
          type="submit"
          className="bg-gray-600 text-white py-2 rounded opacity-60"
          disabled={loading}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
      <div className="mt-4 text-center text-white">
        <p className="text-sm">
          Já possui uma conta?{" "}
          <a href="/login" className="text-blue-400 hover:underline">
            Clique aqui
          </a>{" "}
          para fazer login.
        </p>
      </div>
    </div>
  );
}
