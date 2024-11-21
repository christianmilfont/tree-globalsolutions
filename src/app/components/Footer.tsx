// components/Footer.tsx
import { AiFillLinkedin } from "react-icons/ai";
import { AiFillInstagram } from "react-icons/ai";

import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-cyan-900 text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between px-4">
        <div className="mb-4 md:mb-0">
          <h3 className="text-1xl font-light">Tree Sustentability Energy</h3>
        </div>

        <div className="text-sm text-gray-400">
          © {new Date().getFullYear()} Tree. Todos os direitos reservados.
        </div>

        <div className="flex top-0 text-5xl justify-between space-x-4">
        <Link href={'https://www.linkedin.com/'}><AiFillLinkedin /></Link>
        <Link href={'https://www.instagram.com/'}><AiFillInstagram /></Link>
        </div>
      </div>
    </footer>
  );
}
