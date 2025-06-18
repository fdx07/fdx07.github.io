
import React, { useEffect, useMemo, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MOCK_PROJECTS } from '../constants';
import { Project } from '../types';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon.tsx';
import Card from '../components/Card.tsx';
import HorizontalScrollerWithArrows from '../components/HorizontalScrollerWithArrows.tsx';
import ShareIcon from '../components/icons/ShareIcon.tsx';

const ProjectDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const project = MOCK_PROJECTS.find(p => p.slug === slug);

  const [detailsHtmlContent, setDetailsHtmlContent] = useState<string | null>(null);
  const [isDetailsLoading, setIsDetailsLoading] = useState<boolean>(false);
  const [detailsError, setDetailsError] = useState<string | null>(null);
  const [showCopyNotification, setShowCopyNotification] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);

    if (project && project.detailsContentUrl) { // Check if detailsContentUrl exists
      setIsDetailsLoading(true);
      setDetailsError(null);
      setDetailsHtmlContent(null);

      fetch(project.detailsContentUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status} fetching ${project.detailsContentUrl}`);
          }
          return response.text();
        })
        .then(data => {
          setDetailsHtmlContent(data);
          setIsDetailsLoading(false);
        })
        .catch(fetchError => {
          console.error("Failed to fetch project details content:", fetchError);
          setDetailsError("Failed to load detailed project/course content. Please try again later.");
          setIsDetailsLoading(false);
        });
    } else if (project && !project.detailsContentUrl) {
      // If project exists but has no specific HTML details, clear any previous state
      setDetailsHtmlContent(null); 
      setIsDetailsLoading(false);
      setDetailsError(null);
    } else {
      // Project not found
      setIsDetailsLoading(false);
      setDetailsError(null); 
      setDetailsHtmlContent(null);
    }
  }, [slug, project]); 

  const otherProjects = useMemo(() => {
    if (!project || !MOCK_PROJECTS) {
      return [];
    }
    return MOCK_PROJECTS.filter(p => p.slug !== project.slug);
  }, [project]);

  const getProjectLink = (proj: Project): string => {
    if (proj.overviewContentUrl) {
      return `/projects/${proj.slug}`;
    }
    return `/projects/${proj.slug}/details`;
  };
  
  const handleBackNavigation = () => {
    if (project && project.overviewContentUrl) {
      navigate(`/projects/${project.slug}`); // Go to overview page if it exists
    } else {
      navigate('/projects'); // Default to projects/courses list
    }
  };
  
  const backButtonText = (project && project.overviewContentUrl) ? 'Back to Overview' : 'Back to Projects/Courses';


  if (!project) {
    return (
      <div
        className="container mx-auto px-4 py-4 text-center min-h-screen flex flex-col justify-center items-center opacity-0 animate-fadeIn"
        style={{ animationDelay: '0.1s' }}
      >
        <h1 className="text-3xl font-bold text-brand-text mb-4">Item Not Found</h1>
        <p className="text-brand-text opacity-70 mb-8">The project or course you are looking for (slug: '{slug}') does not exist or may have been removed.</p>
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

  const handleShare = async () => {
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

  // Rendering for projects/courses with HTML details via detailsContentUrl
  if (project.detailsContentUrl) {
    if (isDetailsLoading) {
      return (
        <div className="container mx-auto px-4 py-4 max-w-5xl min-h-screen opacity-0 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <button
            onClick={handleBackNavigation}
            className="mb-8 inline-flex items-center text-brand-accent hover:opacity-80 transition-colors group"
          >
            <ChevronLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            {backButtonText}
          </button>
          <p className="text-brand-text text-center py-10 text-xl">Loading detailed content...</p>
        </div>
      );
    }
    if (detailsError) {
      return (
        <div className="container mx-auto px-4 py-4 max-w-5xl min-h-screen opacity-0 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <button
            onClick={handleBackNavigation}
            className="mb-8 inline-flex items-center text-brand-accent hover:opacity-80 transition-colors group"
          >
            <ChevronLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            {backButtonText}
          </button>
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mt-4" role="alert">
            <strong className="font-bold">Error:</strong>
            <span className="block sm:inline ml-2">{detailsError}</span>
          </div>
        </div>
      );
    }
    if (detailsHtmlContent) {
      return (
        <div className="container mx-auto px-4 py-4 max-w-5xl min-h-screen opacity-0 animate-fadeIn" style={{ animationDelay: '0.1s' }}>
          <button
            onClick={handleBackNavigation}
            className="mb-8 inline-flex items-center text-brand-accent hover:opacity-80 transition-colors group"
          >
            <ChevronLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
            {backButtonText}
          </button>
          
          <header className="mb-10">
            <div className="flex justify-between items-start gap-4 mb-3">
              <div className="flex-grow">
                <h1 className="text-4xl md:text-5xl font-bold text-brand-core">{project.title}</h1>
                 {project.displayDate && (
                  <p className="text-lg text-brand-text opacity-60 mt-1">{project.displayDate}</p>
                )}
              </div>
              <div className="flex-shrink-0">
                <button
                  onClick={handleShare}
                  className="p-2 text-brand-accent hover:text-opacity-80 transition-colors rounded-full hover:bg-brand-secondary hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-brand-core"
                  aria-label="Share this item"
                  title="Share this item"
                >
                  <ShareIcon className="w-6 h-6" />
                </button>
              </div>
            </div>
            <p className="text-xl text-brand-text opacity-70 max-w-3xl mx-auto text-center">{project.description}</p>
            {project.imageUrl && !detailsHtmlContent.includes(project.imageUrl) && ( // Show image if not already in HTML
              <img src={project.imageUrl} alt={project.title} className="mt-8 w-full max-w-3xl h-auto max-h-[500px] object-contain rounded-lg shadow-xl mx-auto"/>
            )}
          </header>

          <div className="prose max-w-none text-brand-text leading-relaxed bg-background-800 shadow-xl rounded-lg p-6 sm:p-8" dangerouslySetInnerHTML={{ __html: detailsHtmlContent }} />
          
          <footer className="mt-12 pt-8 border-t border-brand-secondary border-opacity-30">
            <div className="flex items-center gap-4">
              <button
                onClick={handleShare}
                className="flex items-center px-4 py-2 bg-brand-accent text-text-on-primary rounded-lg hover:opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-800 focus:ring-brand-core"
                aria-label="Share this item"
              >
                <ShareIcon className="w-5 h-5 mr-2" />
                Share Item
              </button>
            </div>
          </footer>

          {otherProjects.length > 0 && (
            <section className="mt-16">
              <h2 className="text-3xl font-semibold text-brand-core mb-8 text-center">More Projects & Courses</h2>
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
    }
  }

  // Default rendering for projects/courses without detailsContentUrl (using structured 'details' object)
  return (
    <div
      className="container mx-auto px-4 py-4 max-w-4xl min-h-screen opacity-0 animate-fadeIn"
      style={{ animationDelay: '0.1s' }}
    >
      <button
        onClick={handleBackNavigation} 
        className="mb-8 inline-flex items-center text-brand-accent hover:opacity-80 transition-colors group"
      >
        <ChevronLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        {backButtonText}
      </button>

      <article className="bg-background-800 shadow-2xl rounded-lg overflow-hidden">
        {project.imageUrl && <img src={project.imageUrl} alt={project.title} className="w-full h-64 md:h-96 object-cover"/>}
        
        <div className="p-6 sm:p-8 lg:p-10">
          <header className="mb-6 pb-6">
            <div className="flex justify-between items-start gap-4">
                <div className='flex-grow'>
                    <h1 className="text-3xl sm:text-4xl font-bold text-brand-core mb-1">{project.title}</h1>
                    {project.displayDate && (
                      <p className="text-md text-brand-text opacity-60 mb-3">{project.displayDate}</p>
                    )}
                     <p className="text-lg text-brand-text opacity-70">{project.description}</p>
                </div>
                 <div className="flex-shrink-0">
                    <button
                      onClick={handleShare}
                      className="p-2 text-brand-accent hover:text-opacity-80 transition-colors rounded-full hover:bg-brand-secondary hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-brand-core"
                      aria-label="Share this item"
                      title="Share this item"
                    >
                      <ShareIcon className="w-6 h-6" />
                    </button>
                </div>
            </div>
          </header>
          
          <hr className="border-brand-secondary border-opacity-30 mb-6"/>


          <section className="space-y-6 text-brand-text">
            <div>
              <h2 className="text-2xl font-semibold text-brand-accent mb-2">Goal</h2>
              <p className="leading-relaxed">{project.details.goal}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-brand-accent mb-2">Technologies Used / Key Topics</h2>
              <ul className="list-disc list-inside pl-4 space-y-1">
                {project.details.technologies.map(tech => (
                  <li key={tech}>{tech}</li>
                ))}
              </ul>
            </div>

            {project.details.outcome && (
              <div>
                <h2 className="text-2xl font-semibold text-brand-accent mb-2">Outcome</h2>
                <p className="leading-relaxed">{project.details.outcome}</p>
              </div>
            )}

            {project.details.courseTakeaways && project.details.courseTakeaways.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold text-brand-accent mb-2">Key Course Takeaways</h2>
                <ul className="list-disc list-inside pl-4 space-y-1">
                  {project.details.courseTakeaways.map(takeaway => (
                    <li key={takeaway}>{takeaway}</li>
                  ))}
                </ul>
              </div>
            )}
          </section>
        </div>
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

export default ProjectDetailPage;
