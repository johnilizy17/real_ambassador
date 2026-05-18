import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store/store';
import { getDeviceId, getUserId } from '@/utils/analytics';
import { trackConversion } from '@/utils/url/statisticsApi';
import { useAnalytics } from '@/hooks/useAnalytics';

/**
 * Analytics Provider Component
 * Handles analytics initialization and conversion tracking for partners
 */
export const AnalyticsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const user = useSelector((state: RootState) => state.auth.user);
  const previousUserId = useRef<string | null>(null);
  const conversionTracked = useRef<boolean>(false);

  // Initialize analytics tracking
  useAnalytics();

  // Track conversion when partner logs in or registers
  useEffect(() => {
    const currentUserId = getUserId(user);

    // Check if user just logged in/registered (went from null to having a user_id)
    if (
      !conversionTracked.current &&
      previousUserId.current === null &&
      currentUserId !== null
    ) {
      trackPartnerConversion(currentUserId);
      conversionTracked.current = true;
    }

    // Update previous user ID
    previousUserId.current = currentUserId;
  }, [user]);

  // Track conversion
  const trackPartnerConversion = async (userId: string) => {
    try {
      await trackConversion({
        device_id: getDeviceId(),
        user_id: userId,
      });
      console.log('Partner conversion tracked successfully');
    } catch (error) {
      console.error('Failed to track partner conversion:', error);
    }
  };

  return <>{children}</>;
};
