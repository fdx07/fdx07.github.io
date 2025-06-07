import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  description: string;
  imageUrl: string;
  linkTo: string;
  tags?: string[];
  className?: string;
}

const Card: React.FC<CardProps> = ({ title, description, imageUrl, linkTo, tags, className }) => {
  return (
    <Link
      to={linkTo}
      className={`flex flex-col group bg-background-800 rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 ${className}`} // Added flex flex-col
    >
      <div className="relative w-full h-48 overflow-hidden flex-shrink-0"> {/* Added flex-shrink-0 */}
        <img src={imageUrl} alt={title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
      </div>
      <div className="p-6 flex-grow flex flex-col"> {/* Added flex-grow flex flex-col */}
        <div className="flex-grow"> {/* Wrapper for title and description to allow them to push tags down */}
          <h3 className="text-xl font-semibold mb-2 text-brand-core group-hover:opacity-90 transition-colors">{title}</h3>
          <p className="text-sm text-brand-text opacity-70 mb-3 line-clamp-3">{description}</p>
        </div>
        {tags && tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-auto pt-3 border-t border-brand-secondary border-opacity-20"> {/* Pushed to bottom, added padding and border */}
            {tags.slice(0, 3).map(tag => (
              <span key={tag} className="text-xs bg-brand-secondary text-text-on-secondary px-2 py-1 rounded-full">{tag}</span>
            ))}
          </div>
        )}
      </div>
    </Link>
  );
};

export default Card;