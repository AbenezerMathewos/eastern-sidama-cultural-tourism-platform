import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * useScrollToTop - Scrolls the window to the top whenever the route changes.
 * Should be used at the top-level layout component.
 */
export function useScrollToTop(): void {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [pathname]);
}