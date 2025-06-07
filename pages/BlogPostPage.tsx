

import React, { useEffect, useState, useMemo } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { MOCK_BLOG_POSTS, CHART_MOCK_DATA } from '../constants';
import { BlogPost } from '../types';
import Card from '../components/Card';
import ShareIcon from '../components/icons/ShareIcon';
import ChevronLeftIcon from '../components/icons/ChevronLeftIcon';
import AnimatedChart from '../components/AnimatedChart';
import { BlogLineChart, BlogBarChart } from '../components/BlogCharts'; 
import HorizontalScrollerWithArrows from '../components/HorizontalScrollerWithArrows';

const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const post = MOCK_BLOG_POSTS.find(p => p.slug === slug);

  const [htmlContent, setHtmlContent] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [showCopyNotification, setShowCopyNotification] = useState(false); 

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (post && post.contentUrl) {
      setIsLoading(true);
      setError(null);
      setHtmlContent(null);
      fetch(post.contentUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.text();
        })
        .then(data => {
          setHtmlContent(data);
          setIsLoading(false);
        })
        .catch(fetchError => {
          console.error("Failed to fetch blog content:", fetchError);
          setError("Failed to load blog content. Please try again later.");
          setIsLoading(false);
        });
    } else if (!post && slug) { 
        setIsLoading(false);
        setError(null); 
    }
  }, [post, slug]);

  const otherPosts = useMemo(() => {
    if (!post || !MOCK_BLOG_POSTS) {
      return [];
    }
    return MOCK_BLOG_POSTS
      .filter(p => p.slug !== post.slug)
      .sort((a, b) => new Date(b.publishDate + "-01").getTime() - new Date(a.publishDate + "-01").getTime());
  }, [post]); // MOCK_BLOG_POSTS is a constant, so not strictly needed in deps

  if (!post && !isLoading) { 
    return (
        <div 
            className="container mx-auto px-4 py-4 text-center min-h-screen flex flex-col justify-center items-center opacity-0 animate-fadeIn"
            style={{ animationDelay: '0.1s' }}
        >
            <h1 className="text-3xl font-bold text-brand-text mb-4">Post Not Found</h1>
            <p className="text-brand-text opacity-70 mb-8">The blog post you are looking for does not exist or may have been removed.</p>
            <button
                onClick={() => navigate('/blogs')}
                className="inline-flex items-center px-6 py-3 bg-brand-accent text-text-on-primary rounded-lg hover:opacity-90 transition-colors"
            >
                <ChevronLeftIcon className="w-5 h-5 mr-2" />
                Go Back to Blogs
            </button>
        </div>
    );
  }
  
  if (!post && isLoading) { 
    return (
      <div 
        className="container mx-auto px-4 py-4 max-w-4xl min-h-screen opacity-0 animate-fadeIn"
        style={{ animationDelay: '0.1s' }}
      >
        <p className="text-brand-text text-center py-10">Loading post...</p>
      </div>
    );
  }
  
  if (!post) return null; 

  const handleShare = async () => {
    const shareData = {
      title: post.title,
      text: post.description,
      url: window.location.href,
    };
    setShowCopyNotification(false); 

    try {
      if (!navigator.share) {
        throw new Error('navigator.share not supported');
      }
      await navigator.share(shareData);
      console.log('Successful share via Web Share API');
    } catch (err) {
      console.log('Web Share API failed or not supported, attempting to copy to clipboard:', err instanceof Error ? err.message : err);
      try {
        await navigator.clipboard.writeText(window.location.href);
        setShowCopyNotification(true);
        setTimeout(() => setShowCopyNotification(false), 3000); 
      } catch (copyError) {
        console.error('Failed to copy link to clipboard: ', copyError instanceof Error ? copyError.message : copyError);
        alert('Sharing and automatic copy failed. Please copy the link from your browser\'s address bar.');
      }
    }
  };
  
  const formattedDate = new Date(`${post.publishDate}-01`).toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  const isCybersecurityPostWithCharts = post.slug === 'the-growing-sector-cybersecurity';

  return (
    <div 
      className="container mx-auto px-4 py-4 max-w-4xl min-h-screen opacity-0 animate-fadeIn"
      style={{ animationDelay: '0.1s' }}
    >
      <button
        onClick={() => navigate('/blogs')}
        className="mb-8 inline-flex items-center text-brand-accent hover:opacity-80 transition-colors group" 
      >
        <ChevronLeftIcon className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
        Go Back to Blogs
      </button>

      <article className="bg-background-800 shadow-2xl rounded-lg p-6 sm:p-8 lg:p-10"> 
        <header className="mb-6 border-b border-brand-secondary border-opacity-30 pb-6"> 
          <div className="flex justify-between items-start gap-4">
            <div className="flex-grow">
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-core mb-3">{post.title}</h1> 
              <div className="flex flex-wrap items-center text-sm text-brand-text opacity-70 space-x-4 mb-4"> 
                <span>By {post.author}</span>
                <span>&bull;</span>
                <span>Published: {formattedDate}</span>
              </div>
            </div>
            <div className="flex-shrink-0">
              <button
                onClick={handleShare}
                className="p-2 text-brand-accent hover:text-opacity-80 transition-colors rounded-full hover:bg-brand-secondary hover:bg-opacity-20 focus:outline-none focus:ring-2 focus:ring-brand-core" 
                aria-label="Share this post"
                title="Share this post"
              >
                <ShareIcon className="w-6 h-6" />
              </button>
            </div>
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {post.tags.map(tag => (
                <span key={tag} className="text-xs bg-brand-secondary text-text-on-secondary px-2.5 py-1 rounded-full">{tag}</span> 
              ))}
            </div>
          )}
        </header>
        
        {isLoading && <p className="text-brand-text text-center py-10">Loading content...</p>} 
        {error && <p className="text-red-500 text-center py-10">{error}</p>}
        
        {htmlContent && !isLoading && !error && !isCybersecurityPostWithCharts && (
          <div className="prose max-w-none text-brand-text leading-relaxed mt-6" dangerouslySetInnerHTML={{ __html: htmlContent }} />
        )}

        {htmlContent && !isLoading && !error && isCybersecurityPostWithCharts && (
          (() => {
            const parts = htmlContent.split(/<!-- CHART_SPLIT_LINE -->|<!-- CHART_SPLIT_BAR -->/);
            const renderPart = (htmlString: string | undefined) => {
              if (!htmlString) return null;
              const firstPartNeedsMargin = parts[0] === htmlString;
              return <div className={`prose max-w-none text-brand-text leading-relaxed ${firstPartNeedsMargin ? 'mt-6' : ''}`} dangerouslySetInnerHTML={{ __html: htmlString }} />;
            };
            return (
              <>
                {renderPart(parts[0])}
                <BlogLineChart />
                {renderPart(parts[1])}
                <BlogBarChart />
                {renderPart(parts[2])}
              </>
            );
          })()
        )}
        
        {post.slug === 'ai-in-everyday-life' && !isLoading && !error && htmlContent && (
          <div className="my-8">
            <AnimatedChart data={CHART_MOCK_DATA} />
          </div>
        )}

        <footer className="mt-8 pt-6 border-t border-brand-secondary border-opacity-30"> 
          <div className="flex items-center gap-4">
            <button
              onClick={handleShare}
              className="flex items-center px-4 py-2 bg-brand-accent text-text-on-primary rounded-lg hover:opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background-800 focus:ring-brand-core" 
              aria-label="Share this post"
            >
              <ShareIcon className="w-5 h-5 mr-2" />
              Share Post
            </button>
            {showCopyNotification && (
              <span className="text-sm text-brand-core transition-opacity duration-300 ease-in-out">Link copied to clipboard!</span> 
            )}
          </div>
        </footer>
      </article>

      {otherPosts.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold text-brand-core mb-6">More From The Blog</h2> 
          <HorizontalScrollerWithArrows>
            {otherPosts.map(otherPost => (
              <div key={otherPost.id} className="flex-none w-full sm:w-[48%] md:w-[31.5%] lg:w-[31.5%] xl:w-[31.5%]"> {/* Adjusted widths for better fit with space-x-6 */}
                 <Card
                    title={otherPost.title}
                    description={otherPost.description}
                    imageUrl={otherPost.imageUrl}
                    linkTo={`/blogs/${otherPost.slug}`}
                    tags={otherPost.tags}
                    className="h-full" 
                 />
              </div>
            ))}
          </HorizontalScrollerWithArrows>
        </section>
      )}
    </div>
  );
};

export default BlogPostPage;