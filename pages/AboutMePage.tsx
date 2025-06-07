
import React from 'react';
import { ABOUT_ME_PHOTO_URL } from '../constants';

const AboutMePage: React.FC = () => {
  return (
    <div 
      className="container mx-auto px-4 py-4 md:py-4 min-h-screen opacity-0 animate-fadeIn"
      style={{ animationDelay: '0.1s' }}
    >
      <header className="text-center mb-10 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-text">About Me</h1> {/* text-navy, Changed "About" to "About Me" */}
      </header>

      <div className="max-w-4xl mx-auto bg-background-800 shadow-2xl rounded-lg p-6 sm:p-8 md:p-10 flex flex-col md:flex-row items-center md:items-start gap-8"> {/* bg-white */}
        <div className="flex-shrink-0 w-full md:w-1/3">
          <div className="border-4 border-brand-text rounded-lg shadow-lg p-2 bg-background-800 mx-auto md:mx-0 inline-block">
            <img 
              src={ABOUT_ME_PHOTO_URL} 
              alt="My Photo" 
              className="block rounded-md w-full h-auto max-w-xs" 
            />
          </div>
        </div>
        <div className="text-brand-text md:w-2/3"> {/* text-navy */}
          <p className="text-lg mb-4 leading-relaxed">
            Hello! I'm a passionate and driven individual with a deep interest in technology, particularly in the fields of Artificial Intelligence, Software Development, and Cybersecurity. My journey is fueled by a constant curiosity and a desire to solve complex problems through innovative solutions.
          </p>
          <p className="text-lg mb-4 leading-relaxed">
            Throughout my academic and personal projects, I've focused on developing practical skills and a strong theoretical understanding. I believe in the power of continuous learning and am always exploring new technologies and methodologies to expand my expertise.
          </p>
          <p className="text-lg mb-4 leading-relaxed">
            This personal hub serves as a platform to share my work, insights, and aspirations. Whether it's a coding project, a research endeavor, or an academic exploration, my goal is to contribute meaningfully and connect with like-minded individuals and potential collaborators.
          </p>
          <p className="text-lg leading-relaxed">
            I am actively seeking opportunities to apply my skills in challenging environments that foster growth and innovation, aiming to make a positive impact in the tech world.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutMePage;
