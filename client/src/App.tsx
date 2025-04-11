import { Switch, Route, useLocation } from "wouter";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./lib/queryClient";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import { useEffect, useState, lazy, Suspense } from "react";
import ProgressBar from "@/components/common/ProgressBar";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import BackToTop from "@/components/common/BackToTop";
import CustomCursor from "@/components/common/CustomCursor";
import MobileMenu from "@/components/common/MobileMenuNew";
import { useIsMobile } from "@/hooks/use-mobile";
import WelcomeScreen from "@/components/common/WelcomeScreen";
import LoadingScreen from "@/components/common/LoadingScreen";
import { PageLoadingSkeleton } from "@/components/common/SkeletonLoader";
import PageWrapper from "@/components/layout/PageWrapper";
import ThreeJSBackground from "@/components/common/ThreeJSBackground";

// Use globally available libraries from CDN
declare const anime: any;
declare const THREE: any;
declare const Velocity: any;
declare const places: any;

// Only use Home page for now
// We'll create the other pages later

function Router() {
  const [location] = useLocation();
  
  // Scroll to top when route changes
  useEffect(() => {
    if (!location.includes('#')) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      // If it's a hash link, scroll to the element with animation
      const targetId = location.split('#')[1];
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Use anime.js to smoothly scroll to the element
        anime({
          targets: window.document.scrollingElement,
          scrollTop: targetElement.offsetTop - 80, // Account for header
          duration: 800,
          easing: 'easeInOutQuad'
        });
      }
    }
  }, [location]);
  
  return (
    <Suspense fallback={<PageLoadingSkeleton />}>
      <Switch>
        <Route path="/" component={Home} />
        {/* We'll add these routes when we create the pages
        <Route path="/about" component={About} />
        <Route path="/gallery" component={Gallery} />
        <Route path="/academic" component={Academic} />
        <Route path="/news" component={News} />
        <Route path="/contact" component={Contact} />
        */}
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  const [initialLoading, setInitialLoading] = useState(true);
  const [contentReady, setContentReady] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pageTransitioning, setPageTransitioning] = useState(false);
  const [location] = useLocation();
  const isMobile = useIsMobile();

  // Handle page transitions 
  useEffect(() => {
    if (contentReady) {
      setPageTransitioning(true);
      setTimeout(() => {
        setPageTransitioning(false);
      }, 500);
    }
  }, [location, contentReady]);

  // Initial app loading sequence
  useEffect(() => {
    // Step 1: Initial loading
    const initialLoadTimer = setTimeout(() => {
      setInitialLoading(false);
      
      // Step 2: Content ready after welcome screen may have shown
      const contentReadyTimer = setTimeout(() => {
        setContentReady(true);
      }, 1000); // This gives time for WelcomeScreen to potentially show if it hasn't been shown before
      
      return () => clearTimeout(contentReadyTimer);
    }, 2500); // Initial loading screen duration
    
    // Preload important assets
    const imagesToPreload = [
      '/src/assets/images/school-logo.png',
      // Add other critical images here
    ];
    
    imagesToPreload.forEach(src => {
      const img = new Image();
      img.src = src;
    });
    
    return () => clearTimeout(initialLoadTimer);
  }, []);

  // Toggle the mobile menu with a more reliable implementation
  const toggleMenu = () => {
    setMenuOpen(prevState => !prevState);
  };

  return (
    <QueryClientProvider client={queryClient}>
      {initialLoading ? (
        <LoadingScreen variant="elaborate" />
      ) : (
        <PageWrapper>
          <WelcomeScreen />
          <ProgressBar />
          <CustomCursor />
          <ThreeJSBackground />
          <Header isMenuOpen={menuOpen} toggleMenu={toggleMenu} />
          {/* Always render the MobileMenu, but control visibility with isOpen prop */}
          <MobileMenu isOpen={menuOpen && isMobile} closeMenu={() => setMenuOpen(false)} />
          
          {/* Page transition animation */}
          <main className={`page-content transition-opacity duration-300 ${pageTransitioning ? 'opacity-0' : 'opacity-100'}`}>
            <Router />
          </main>
          
          <Footer />
          <BackToTop />
        </PageWrapper>
      )}
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
