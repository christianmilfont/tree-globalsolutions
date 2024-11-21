"use client"
import Card from './components/Card';
import { SlArrowDown } from "react-icons/sl";
import Footer from './components/Footer';
import { useState } from 'react';

export default function HomePage() {
  const [showOverlay, setShowOverlay] = useState(false);

  const toggleOverlay = () => {
    setShowOverlay(!showOverlay);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Seção de título com imagem de fundo */}
      <div className="relative h-screen bg-cover bg-center" style={{ backgroundImage: "url('/images/fundo.png')" }}>
        <div className="absolute top-32 left-20">
          <h1 className="text-6xl font-bold text-blue-950">Energia Sustentável</h1>
          <h2 className="text-5xl font-light text-gray-400 mt-2">Para Todos</h2>
        </div>

        <div className="absolute bottom-4 right-4 text-white text-3xl font-light">
          <p className='text-white-700'>Transformando o futuro</p>
          <p className='text-cyan-100 '>com energia limpa e acessível para todos.</p>
        </div>
      </div>

      {/* Seção de cards */}
      <div className="flex flex-col items-center bg-gray-100 bg-opacity-90 py-8">
        <button
          className="text-gray-700 font-semibold mb-4 flex items-center"
          onClick={toggleOverlay}
        >
          Nossa Missão <SlArrowDown className="ml-2" />
        </button>

        <div className="flex space-x-8 mt-4">
          <Card
            title="Energia Solar"
            description="Soluções de energia solar para um futuro sustentável."
            imageSrc="/images/card1.jpg"
            imageAlt="Imagem do Card 1"
          />
          <Card
            title="Energia Eólica"
            description="Explorando a energia do vento para gerar eletricidade limpa."
            imageSrc="/images/card2.jpg"
            imageAlt="Imagem do Card 2"
          />
          <Card
            title="Energia Hidrelétrica"
            description="Potencializando o uso da água para geração de energia."
            imageSrc="/images/card3.jpg"
            imageAlt="Imagem do Card 3"
          />
          <Card
            title="Energia Biomassa"
            description="Transformando resíduos orgânicos em energia limpa."
            imageSrc="/images/card4.jpg"
            imageAlt="Imagem do Card 4"
          />
        </div>
      </div>

      {/* Overlay com animação */}
      {showOverlay && (
        <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-50 animate-fadeIn">
          <div className="bg-white p-8 rounded-lg shadow-lg max-w-md text-center transition-opacity duration-300 ease-in-out">
            <h2 className="text-2xl font-bold text-gray-700">Nossa Missão</h2>
            <p className="mt-4 text-gray-600">
              Um sistema de monitoramento de projetos sustentáveis nacional, com detalhamento mais objetivo.
            </p>
            <button
              className="mt-6 px-4 py-2 bg-cyan-800 text-white rounded-lg hover:bg-blue-200 transition duration-300 ease-in-out"
              onClick={toggleOverlay}
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <Footer />

      <style jsx>{`
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in-out;
        }
        
        .animate-fadeOut {
          animation: fadeOut 0.5s ease-in-out;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fadeOut {
          from { opacity: 1; }
          to { opacity: 0; }
        }
      `}</style>
    </div>
  );
}
