import Link from 'next/link';
import Image from 'next/image';
import { CiSearch } from "react-icons/ci";
import { GoPersonFill } from "react-icons/go";
import { GoCloud } from "react-icons/go";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-6 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center space-x-4">
        <Image src="/images/logo.png" alt="Logo" width={150} height={50} />
      </div>

      {/* Menu */}
      <div className="flex space-x-12 text-gray-700 text-lg">
        <Link href="/" className="flex flex-col items-center text-center space-y-1 hover:text-blue-600 transition duration-200">
          <span className="font-semibold text-xl">Home</span>
        </Link>

        <Link href="/consultar" className="flex flex-col items-center text-center space-y-1 hover:text-blue-600 transition duration-200">
          <CiSearch className="text-4xl" />
          <span className="font-semibold text-xl">Consultar</span>
          <h2 className="text-sm font-light text-gray-500">Projetos</h2>
        </Link>

        <Link href="/cadastrar_projeto" className="flex flex-col items-center text-center space-y-1 hover:text-blue-600 transition duration-200">
          <GoCloud className="text-4xl" />
          <span className="font-semibold text-xl">Cadastrar</span>
          <h2 className="text-sm font-light text-gray-500">Projetos</h2>
        </Link>

        <Link href="/cadastro" className="flex flex-col items-center text-center space-y-1 hover:text-blue-600 transition duration-200">
          <GoPersonFill className="text-4xl" />
          <span className="font-semibold text-xl">Cadastrar</span>
          <h2 className="text-sm font-light text-gray-500">Login</h2>
        </Link>
      </div>
    </nav>
  );
}