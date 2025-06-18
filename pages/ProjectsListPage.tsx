
import React, { useState, useEffect, useMemo } from 'react';
import { MOCK_PROJECTS } from '../constants';
import Card from '../components/Card.tsx';
import SearchBar from '../components/SearchBar.tsx';
import { Project } from '../types';

const ProjectsListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredProjects = useMemo(() => {
    if (!MOCK_PROJECTS || MOCK_PROJECTS.length === 0) {
      return [];
    }
    return MOCK_PROJECTS.filter(project =>
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase())
      // Note: Projects don't currently have tags in the data structure.
      // If they did, we could add:
      // || (project.tags && project.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
    );
  }, [searchTerm]);

  const [visibleItems, setVisibleItems] = useState<Project[]>([]);
  const [loadIndex, setLoadIndex] = useState(0);

  useEffect(() => {
    setVisibleItems([]);
    setLoadIndex(0);
  }, [filteredProjects]);

  useEffect(() => {
    if (loadIndex < filteredProjects.length) {
      const timer = setTimeout(() => {
        setVisibleItems(prev => [...prev, filteredProjects[loadIndex]]);
        setLoadIndex(prev => prev + 1);
      }, 100); // Staggered loading delay
      return () => clearTimeout(timer);
    }
  }, [filteredProjects, loadIndex]);


  const getProjectLink = (project: Project): string => {
    if (project.overviewContentUrl) {
      return `/projects/${project.slug}`; 
    }
    return `/projects/${project.slug}/details`;
  };

  return (
    <div 
      className="container mx-auto px-4 py-4 min-h-screen opacity-0 animate-fadeIn"
      style={{ animationDelay: '0.1s' }}
    >
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-brand-text mb-2">Projects & Course Work</h1>
        <p className="text-lg text-brand-text opacity-70">A showcase of practical applications and academic achievements.</p>
      </header>

      <div className="mb-8 max-w-xl mx-auto">
        <SearchBar 
          searchTerm={searchTerm} 
          onSearchChange={setSearchTerm} 
          placeholder="Search projects & courses..." 
        />
      </div>

      {MOCK_PROJECTS.length === 0 && !searchTerm && (
        <p className="text-center text-brand-text opacity-70 text-lg">No projects or course work available yet. Check back soon!</p>
      )}

      {filteredProjects.length === 0 && searchTerm && MOCK_PROJECTS.length > 0 && (
        <p className="text-center text-brand-text opacity-70 text-lg">No items found matching your search criteria.</p>
      )}

      {filteredProjects.length > 0 && (
        <section>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
             {visibleItems.map((project, index) => (
               <div
                key={project.id}
                className="opacity-0 animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }} 
              >
                <Card
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl}
                  linkTo={getProjectLink(project)}
                  className="h-full"
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ProjectsListPage;
