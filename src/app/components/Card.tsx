// components/Card.tsx
import Image from 'next/image';

interface CardProps {
  title: string;
  description: string;
  imageSrc: string;
  imageAlt: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageSrc, imageAlt }) => {
  return (
    <div className="w-64 h-64 bg-blue-50 rounded-lg shadow-lg overflow-hidden">
      <div className="h-40 bg-gray-200 flex items-center justify-center">
        <Image src={imageSrc} alt={imageAlt} width={256} height={160} className="object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
}

export default Card;
