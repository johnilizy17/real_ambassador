import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { RootState } from '@/redux/store/store';
import {
  getDeviceId,
  getSessionId,
  getDeviceType,
  getBrowser,
  getOS,
  getScreenResolution,
  getUserType,
  getUserId,
} from '@/utils/analytics';
import { trackEvent, startSession, endSession } from '@/utils/url/statisticsApi';

/**
 * Custom hook for analytics tracking
 * Automatically tracks page views, sessions, and partner activity
 */
export const useAnalytics = () => {
  const router = useRouter();
  const user = useSelector((state: RootState) => state.auth.user);
  const sessionStartTime = useRef<number>(Date.now());
  const pageStartTime = useRef<number>(Date.now());
  const currentPage = useRef<string>('');
  const sessionInitialized = useRef<boolean>(false);

  // Initialize session on mount
  useEffect(() => {
    if (!sessionInitialized.current) {
      initializeSession();
      sessionInitialized.current = true;
    }

    // End session on unmount
    return () => {
      endCurrentSession();
    };
  }, []);

  // Track page views on route change
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      trackPageView(url);
    };

    // Track initial page view
    trackPageView(router.pathname);

    // Listen for route changes
    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.pathname, user]);

  // Initialize session
  const initializeSession = async () => {
    try {
      await startSession({
        device_id: getDeviceId(),
        session_id: getSessionId(),
        user_id: getUserId(user),
        user_type: getUserType(user),
        device_type: getDeviceType(),
        browser: getBrowser(),
        os: getOS(),
      });
      sessionStartTime.current = Date.now();
    } catch (error) {
      console.error('Failed to initialize session:', error);
    }
  };

  // Track page view
  const trackPageView = async (url: string) => {
    try {
      // Calculate duration on previous page
      const duration = currentPage.current
        ? Math.floor((Date.now() - pageStartTime.current) / 1000)
        : 0;

      // Track previous page duration if exists
      if (currentPage.current && duration > 0) {
        await trackEvent({
          device_id: getDeviceId(),
          session_id: getSessionId(),
          event_type: 'page_view',
          user_id: getUserId(user),
          user_type: getUserType(user),
          page_url: currentPage.current,
          page_title: document.title,
          referrer: document.referrer,
          device_type: getDeviceType(),
          browser: getBrowser(),
          os: getOS(),
          screen_resolution: getScreenResolution(),
          duration,
        });
      }

      // Track new page view
      await trackEvent({
        device_id: getDeviceId(),
        session_id: getSessionId(),
        event_type: 'page_view',
        user_id: getUserId(user),
        user_type: getUserType(user),
        page_url: url,
        page_title: document.title,
        referrer: currentPage.current || document.referrer,
        device_type: getDeviceType(),
        browser: getBrowser(),
        os: getOS(),
        screen_resolution: getScreenResolution(),
      });

      // Update current page
      currentPage.current = url;
      pageStartTime.current = Date.now();
    } catch (error) {
      console.error('Failed to track page view:', error);
    }
  };

  // End current session
  const endCurrentSession = async () => {
    try {
      const totalDuration = Math.floor((Date.now() - sessionStartTime.current) / 1000);
      await endSession({
        session_id: getSessionId(),
        total_duration: totalDuration,
      });
    } catch (error) {
      console.error('Failed to end session:', error);
    }
  };

  // Track custom event
  const trackCustomEvent = async (
    eventType: string,
    metadata?: Record<string, any>
  ) => {
    try {
      await trackEvent({
        device_id: getDeviceId(),
        session_id: getSessionId(),
        event_type: eventType,
        user_id: getUserId(user),
        user_type: getUserType(user),
        page_url: router.pathname,
        page_title: document.title,
        device_type: getDeviceType(),
        browser: getBrowser(),
        os: getOS(),
        screen_resolution: getScreenResolution(),
        metadata,
      });
    } catch (error) {
      console.error('Failed to track custom event:', error);
    }
  };

  return {
    trackCustomEvent,
  };
};
