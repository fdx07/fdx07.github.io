
import React, { useState, useMemo, useEffect } from 'react';
import { MOCK_BLOG_POSTS } from '../constants';
import Card from '../components/Card.tsx';
import SearchBar from '../components/SearchBar.tsx';
import { BlogPost } from '../types';

const BlogListPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleItems, setVisibleItems] = useState<BlogPost[]>([]);
  const [loadIndex, setLoadIndex] = useState(0); // For staggered loading effect

  const filteredPosts = useMemo(() => {
    if (!MOCK_BLOG_POSTS || MOCK_BLOG_POSTS.length === 0) {
      return [];
    }
    return MOCK_BLOG_POSTS.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }, [searchTerm]);

  useEffect(() => {
    setVisibleItems([]);
    setLoadIndex(0);
  }, [filteredPosts]);

  useEffect(() => {
    if (loadIndex < filteredPosts.length) {
      const timer = setTimeout(() => {
        setVisibleItems(prev => [...prev, filteredPosts[loadIndex]]);
        setLoadIndex(prev => prev + 1);
      }, 100); // Adjust delay for desired effect
      return () => clearTimeout(timer);
    }
  }, [filteredPosts, loadIndex]);


  return (
    <div 
      className="container mx-auto px-4 py-4 min-h-screen opacity-0 animate-fadeIn"
      style={{ animationDelay: '0.1s' }}
    >
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-brand-text mb-2">My Thoughts & Writings</h1> {/* text-navy */}
        <p className="text-lg text-brand-text opacity-70">Articles, insights, and academic notes.</p> {/* text-navy opacity-70 (was text-gray-400) */}
      </header>

      <div className="mb-8 max-w-xl mx-auto">
        <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} placeholder="Search blog posts..." />
      </div>

      {MOCK_BLOG_POSTS.length === 0 && !searchTerm && (
         <p className="text-center text-brand-text opacity-70 text-lg">No blog posts available yet. Check back soon!</p>
      )}

      {filteredPosts.length === 0 && searchTerm && MOCK_BLOG_POSTS.length > 0 && (
        <p className="text-center text-brand-text opacity-70 text-lg">No posts found matching your search criteria.</p> /* text-navy opacity-70 (was text-gray-400) */
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleItems.map((post, index) => (
          <div
            key={post.id}
            className="opacity-0 animate-fadeIn" // This class is now globally defined
            style={{ animationDelay: `${index * 0.1}s` }} // Staggered animation for cards
          >
            <Card
              title={post.title}
              description={post.description}
              imageUrl={post.imageUrl}
              linkTo={`/blogs/${post.slug}`}
              tags={post.tags}
              className="h-full"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogListPage;