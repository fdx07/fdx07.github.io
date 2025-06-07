
import React, { useEffect } from 'react';
import { HashRouter, Routes, Route, useLocation, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import BlogListPage from './pages/BlogListPage';
import BlogPostPage from './pages/BlogPostPage';
import ProjectsListPage from './pages/ProjectsListPage';
import ProjectOverviewPage from './pages/ProjectOverviewPage'; 
import ProjectDetailPage from './pages/ProjectDetailPage';
import AboutMePage from './pages/AboutMePage';
import ContactPage from './pages/ContactPage';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]); 

  return (
    <div className="flex flex-col min-h-screen bg-background-900 text-brand-text font-sans">
      {!isHomePage && <Navbar />}
      <main className={`flex-grow ${!isHomePage ? 'pt-16' : ''}`}>
        {children}
      </main>
      {!isHomePage && (
        <footer className="bg-background-800 text-center p-4 text-sm text-brand-text opacity-60 border-t border-brand-secondary border-opacity-30">
          &copy; {new Date().getFullYear()} Faisal Durbaa. All rights reserved.
        </footer>
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<BlogListPage />} />
          <Route path="/blogs/:slug" element={<BlogPostPage />} />
          
          <Route path="/projects" element={<ProjectsListPage />} />
          {/* Route for project/course overviews (if overviewContentUrl exists) */}
          <Route path="/projects/:slug" element={<ProjectOverviewPage />} /> 
          {/* Route for full project/course details */}
          <Route path="/projects/:slug/details" element={<ProjectDetailPage />} />
          
          <Route path="/about" element={<AboutMePage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          <Route path="*" element={
            <div 
              className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] text-center opacity-0 animate-fadeIn"
              style={{ animationDelay: '0.1s' }}
            >
              <h1 className="text-6xl font-bold text-brand-text">404</h1>
              <p className="text-2xl text-brand-text mt-4">Page Not Found</p>
              <Link to="/" className="mt-8 px-6 py-3 bg-brand-accent text-text-on-primary rounded-lg hover:opacity-90 transition-colors">
                Go Home
              </Link>
            </div>
          } />
        </Routes>
      </Layout>
    </HashRouter>
  );
};

export default App;
