import { userRequest } from "../axios";

export interface TrackEventPayload {
  device_id: string;
  session_id: string;
  event_type: string;
  user_id?: string | null;
  user_type: 'guest' | 'user' | 'partner' | 'admin';
  page_url: string;
  page_title: string;
  referrer?: string;
  device_type?: string;
  browser?: string;
  os?: string;
  screen_resolution?: string;
  duration?: number;
  metadata?: Record<string, any>;
}

export interface StartSessionPayload {
  device_id: string;
  session_id: string;
  user_id?: string | null;
  user_type: 'guest' | 'user' | 'partner' | 'admin';
  device_type?: string;
  browser?: string;
  os?: string;
  ip_address?: string;
}

export interface EndSessionPayload {
  session_id: string;
  total_duration: number;
}

export interface ConversionPayload {
  device_id: string;
  user_id: string;
}

// Track an event
export const trackEvent = async (payload: TrackEventPayload) => {
  try {
    const response = await userRequest.post('/statistics/track', payload);
    return response.data;
  } catch (error) {
    console.error('Failed to track event:', error);
    throw error;
  }
};

// Start a session
export const startSession = async (payload: StartSessionPayload) => {
  try {
    const response = await userRequest.post('/statistics/session/start', payload);
    return response.data;
  } catch (error) {
    console.error('Failed to start session:', error);
    throw error;
  }
};

// End a session
export const endSession = async (payload: EndSessionPayload) => {
  try {
    const response = await userRequest.post('/statistics/session/end', payload);
    return response.data;
  } catch (error) {
    console.error('Failed to end session:', error);
    throw error;
  }
};

// Track conversion (guest to partner)
export const trackConversion = async (payload: ConversionPayload) => {
  try {
    const response = await userRequest.post('/statistics/conversion', payload);
    return response.data;
  } catch (error) {
    console.error('Failed to track conversion:', error);
    throw error;
  }
};
