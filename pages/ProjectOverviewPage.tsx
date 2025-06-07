
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { MOCK_PROJECTS } from '../constants';
import { Project } from '../types';
import Card from '../components/Card.tsx';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon.tsx';
import HorizontalScrollerWithArrows from '../components/HorizontalScrollerWithArrows.tsx';
import CodeIcon from '../components/icons/CodeIcon.tsx';
import DataIcon from '../components/icons/DataIcon.tsx';
import ShareIcon from '../components/icons/ShareIcon.tsx';

const ProjectOverviewPage: React.FC = () => {
  const navigate = useNavigate();
  const { slug } = useParams<{ slug: string }>();
  
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    setIsLoading(true);
    setError(null);
    setHtmlContent(null);

    const currentProject = MOCK_PROJECTS.find(p => p.slug === slug);
    setProject(currentProject);

    if (!currentProject) {
      setError(`Project with slug '${slug}' not found. Please check project constants.`);
      setIsLoading(false);
      return;
    }

    // If a project is found but does not have an overviewContentUrl,
    // it implies it should be viewed on the ProjectDetailPage directly.
    // This page is specifically for overviews.
    if (!currentProject.overviewContentUrl) {
      // setError(`Overview content is not available for '${currentProject.title}'. Navigating to details page.`);
      // setIsLoading(false);
      // Consider navigating to details page or showing a message.
      // For now, let's treat it as an error for this page.
      // Or redirect to details page if appropriate for UX
      navigate(`/projects/${slug}/details`, { replace: true });
      return;
    }

    fetch(currentProject.overviewContentUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status} while fetching ${currentProject.overviewContentUrl}`);
        }
        return response.text();
      })
      .then(data => {
        setHtmlContent(data);
        setIsLoading(false);
      })
      .catch(fetchError => {
        console.error("Failed to fetch project overview content:", fetchError);
        setError(`Failed to load project overview: ${fetchError instanceof Error ? fetchError.message : String(fetchError)}`);
        setIsLoading(false);
      });

  }, [slug, navigate]); 

  const otherProjects = useMemo(() => {
    if (!project) return [];
    return MOCK_PROJECTS.filter(p => p.slug !== project.slug);
  }, [project]);

  const getProjectLink = (proj: Project): string => {
    if (proj.overviewContentUrl) {
      return `/projects/${proj.slug}`;
    }
    return `/projects/${proj.slug}/details`;
  };

  const handleShare = async () => {
    if (!project) return;

    const shareData = {
      title: project.title,
      text: project.description,
      url: window.location.href,
    };
    setShowCopyNotification(false);

    try {
      if (!navigator.share) {
        throw new Error('navigator.share not supported');
      }
      await navigator.share(shareData);
    } catch (err) {
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShowCopyNotification(true);
        setTimeout(() => setShowCopyNotification(false), 3000); 
      } catch (copyError) {
        alert('Sharing and automatic copy failed. Please copy the link from your browser\'s address bar.');
      }
    }
  };

  if (isLoading) { 
    return (
      <div 
        className="container mx-auto px-4 py-4 max-w-4xl min-h-screen opacity-0 animate-fadeIn"
        style={{ animationDelay: '0.1s' }}
      >
        <p className="text-brand-text text-center py-10 text-xl">Loading project overview...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div 
        className="container mx-auto px-4 py-4 max-w-4xl min-h-screen opacity-0 animate-fadeIn"
        style={{ animationDelay: '0.1s' }}
      >
        <button
          onClick={() => navigate('/projects')}
          className="mb-8 inline-flex items-center text-brand-accent hover:opacity-80 transition-colors group" 
        >
          <ChevronLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
          Back to Projects/Courses
        </button>
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline ml-2">{error}</span>
        </div>
      </div>
    );
  }
  
  if (!project) { 
     return (
        <div 
            className="container mx-auto px-4 py-4 text-center min-h-screen flex flex-col justify-center items-center opacity-0 animate-fadeIn"
            style={{ animationDelay: '0.1s' }}
        >
            <h1 className="text-3xl font-bold text-brand-text mb-4">Project Not Found</h1>
            <p className="text-brand-text opacity-70 mb-8">The project or course with slug '{slug}' could not be found.</p>
            <button
                onClick={() => navigate('/projects')}
                className="inline-flex items-center px-6 py-3 bg-brand-accent text-text-on-primary rounded-lg hover:opacity-90 transition-colors"
            >
                <ChevronLeftIcon className="w-5 h-5 mr-2" />
                Go Back to Projects/Courses
            </button>
        </div>
    );
  }

  // Specific URLs for earthquake-ai project
  const codeUrl = "https://colab.research.google.com/drive/18HbOpe4-QWwrWUYsObeiZMY4cvRVV8uI?usp=sharing";
  const dataUrl = "https://www.drivendata.org/competitions/57/nepal-earthquake";

  return (
    <div 
      className="container mx-auto px-4 py-4 max-w-4xl min-h-screen opacity-0 animate-fadeIn"
      style={{ animationDelay: '0.1s' }}
    >
      <button
        onClick={() => navigate('/projects')}
        className="mb-8 inline-flex items-center text-brand-accent hover:opacity-80 transition-colors group" 
      >
        <ChevronLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Back to Projects/Courses
      </button>

      <article className="bg-background-800 shadow-2xl rounded-lg p-6 sm:p-8 lg:p-10"> 
        <header className="mb-6 border-b border-brand-secondary border-opacity-30 pb-6">
          <div className="flex justify-between items-start gap-4">
            <div className="flex-grow">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-core mb-2">{project.title}</h1>
              {project.displayDate && (
                <p className="text-md text-brand-text opacity-60 mb-3">{project.displayDate}</p>
              )}
              <p className="text-lg text-brand-text opacity-80">{project.description}</p>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={handleShare}
                className="p-2 text-brand-accent hover:text-opacity-80 transition-colors rounded-full hover:bg-brand-secondary hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-brand-core"
                aria-label="Share this project/course"
                title="Share this project/course"
              >
                <ShareIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
        </header>

        {project.imageUrl && (
            <div className="my-6">
                <img 
                    src={project.imageUrl} 
                    alt={`${project.title} visual representation`} 
                    className="w-full h-auto max-h-96 object-contain rounded-lg shadow-md mx-auto" 
                />
            </div>
        )}
        
        {htmlContent && (
          <div className="prose max-w-none text-brand-text leading-relaxed mt-6 mb-8" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        )}

        {/* Conditionally render Code and Data buttons for earthquake-ai project */}
        {project.slug === 'earthquake-ai' && (
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <a
              href={codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex flex-col items-center justify-center p-4 bg-brand-secondary text-text-on-secondary rounded-lg hover:bg-opacity-90 transition-colors aspect-square sm:aspect-auto text-center"
            >
              <CodeIcon className="w-8 h-8 sm:w-10 sm:h-10 mb-2" />
              <span className="text-sm sm:text-base font-medium">View Code</span>
            </a>
            <a
              href={dataUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex flex-col items-center justify-center p-4 bg-brand-secondary text-text-on-secondary rounded-lg hover:bg-opacity-90 transition-colors aspect-square sm:aspect-auto text-center"
            >
              <DataIcon className="w-8 h-8 sm:w-10 sm:h-10 mb-2" />
              <span className="text-sm sm:text-base font-medium">Data Source</span>
            </a>
          </div>
        )}

        <hr className="border-brand-secondary border-opacity-30 my-6" />
        
        <footer className="mt-6"> 
          <Link
            to={`/projects/${project.slug}/details`} 
            className="flex items-center justify-center w-full px-6 py-3 bg-brand-core text-text-on-primary rounded-lg hover:bg-opacity-90 transition-colors text-lg font-semibold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-800 focus:ring-brand-core"
          >
            Go to Full Project/Course Details
          </Link>
        </footer>
      </article>

      {otherProjects.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-brand-core mb-6">More Projects & Courses</h2> 
          <HorizontalScrollerWithArrows>
            {otherProjects.map(otherProj => (
              <div key={otherProj.id} className="flex-none w-full sm:w-[48%] md:w-[31.5%] lg:w-[31.5%] xl:w-[31.5%]">
                 <Card
                    title={otherProj.title}
                    description={otherProj.description}
                    imageUrl={otherProj.imageUrl}
                    linkTo={getProjectLink(otherProj)} 
                    className="h-full" 
                 />
              </div>
            ))}
          </HorizontalScrollerWithArrows>
        </section>
      )}

      {showCopyNotification && (
        <div 
          className="fixed bottom-4 right-4 bg-background-800 text-brand-core p-3 rounded-lg shadow-xl border border-brand-secondary z-50 animate-fadeIn"
          role="status"
          aria-live="polite"
        >
          Link copied to clipboard!
        </div>
      )}
    </div>
  );
};

export default ProjectOverviewPage;