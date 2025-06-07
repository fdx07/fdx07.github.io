import React from 'react';
import { EMAIL_ADDRESS, LINKEDIN_URL } from '../constants';
import LinkedInIcon from '../components/icons/LinkedInIcon';
import EmailIcon from '../components/icons/EmailIcon';

const ContactPage: React.FC = () => {
  return (
    <div 
      className="container mx-auto px-4 py-12 md:py-8 opacity-0 animate-fadeIn" // Removed min-h-screen
      style={{ animationDelay: '0.1s' }}
    >
      <header className="text-center mb-10 md:mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-brand-text">Get In Touch</h1> {/* text-navy */}
        <p className="text-lg text-brand-text opacity-70 mt-2 max-w-2xl mx-auto"> {/* text-navy opacity-70 (was text-gray-400) */}
          I'm always open to discussing new projects, creative ideas, or opportunities to be part of something great.
        </p>
      </header>

      <div className="max-w-4xl mx-auto"> {/* Adjusted max-width for two columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10"> {/* Two-column grid */}
          <section className="bg-background-800 p-6 sm:p-8 rounded-xl shadow-2xl flex flex-col"> {/* bg-white, Added flex flex-col for equal height if content differs */}
            <h2 className="text-3xl font-semibold text-brand-core mb-6 text-center">Contact Details</h2> {/* text-dark-blue */}
            <div className="space-y-6 flex-grow"> {/* Added flex-grow to push content if one card is shorter */}
              <div className="flex items-start space-x-4">
                <EmailIcon className="w-7 h-7 text-brand-core mt-1 flex-shrink-0" /> {/* text-dark-blue */}
                <div>
                  <h3 className="text-xl font-medium text-brand-text mb-1">Email Address</h3> {/* text-navy */}
                  <a
                    href={`mailto:${EMAIL_ADDRESS}`}
                    className="text-brand-core hover:opacity-80 transition-colors break-all text-lg" // text-dark-blue
                  >
                    {EMAIL_ADDRESS}
                  </a>
                  <p className="text-sm text-brand-text opacity-70 mt-1">Preferred method for detailed inquiries.</p> {/* text-navy opacity-70 (was text-gray-400) */}
                </div>
              </div>

              <hr className="border-brand-secondary border-opacity-30" /> {/* border-dark-blue opacity-30 */}

              <div className="flex items-start space-x-4">
                <LinkedInIcon className="w-7 h-7 text-brand-core mt-1 flex-shrink-0" /> {/* text-dark-blue */}
                <div>
                  <h3 className="text-xl font-medium text-brand-text mb-1">LinkedIn Profile</h3> {/* text-navy */}
                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-brand-core hover:opacity-80 transition-colors group text-lg" // text-dark-blue
                  >
                    View My LinkedIn
                    <span className="ml-1.5 transform transition-transform duration-200 group-hover:translate-x-1">&rarr;</span>
                  </a>
                  <p className="text-sm text-brand-text opacity-70 mt-1">Connect for professional networking.</p> {/* text-navy opacity-70 (was text-gray-400) */}
                </div>
              </div>
            </div>
          </section>

          <section className="bg-background-800 p-6 sm:p-8 rounded-xl shadow-2xl flex flex-col"> {/* bg-white, Added flex flex-col */}
            <h2 className="text-3xl font-semibold text-brand-core mb-6 text-center">Why Connect?</h2> {/* text-dark-blue */}
            <div className="flex-grow"> {/* Added flex-grow */}
              <ul className="list-disc text-brand-text opacity-85 space-y-2 text-lg pl-4"> {/* text-navy opacity-85 (was text-gray-300) */}
                <li>Collaborations on technology and research projects</li>
                <li>Professional networking and knowledge sharing</li>
                <li>Discussions on AI, software development, or cybersecurity</li>
                <li>Feedback or questions about my work</li>
              </ul>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;