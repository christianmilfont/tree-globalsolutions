"use client"
import { useState } from "react";
import { redirect } from "next/navigation"; // Importa o redirect para redirecionamento após o envio

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  // Função para manipular o envio do formulário
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica se o usuário já está cadastrado no localStorage
    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      const user = JSON.parse(storedUser);

      // Verifica se os dados de login correspondem aos armazenados
      if (user.email === email && user.senha === senha) {
        // Redireciona para a home se o login for bem-sucedido
        redirect("/");
      } else {
        alert("Email ou senha inválidos.");
      }
    } else {
      alert("Nenhum usuário cadastrado.");
    }
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center text-gray-800"
      style={{ backgroundImage: 'url("/images/fundo2.jpg")' }}
    >
      <h2 className="text-3xl text-white font-bold mb-2">Faça seu Login</h2>

      <form onSubmit={handleLogin} className="flex flex-col w-80 space-y-4">
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
        <button type="submit" className="bg-gray-600 text-white py-2 rounded opacity-60">
          Entrar
        </button>
      </form>

      <div className="mt-4 text-center text-blue">
        <p className="text-sm">
          Não possui uma conta?{" "}
          <a href="/cadastro" className="text-blue-400 hover:underline">
            Clique aqui
          </a>{" "}
          para se cadastrar.
        </p>
      </div>
    </div>
  );
}
