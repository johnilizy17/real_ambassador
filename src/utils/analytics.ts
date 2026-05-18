/**
 * Analytics Utility Functions
 * Device ID and Session ID management for statistics tracking
 */

/**
 * Get or generate a unique device ID
 * Stored in localStorage to persist across sessions
 */
export function getDeviceId(): string {
  if (typeof window === 'undefined') return '';
  
  let deviceId = localStorage.getItem('device_id');
  if (!deviceId) {
    deviceId = `device_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('device_id', deviceId);
  }
  return deviceId;
}

/**
 * Get or generate a session ID
 * Stored in sessionStorage to persist only for current session
 */
export function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = sessionStorage.getItem('session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('session_id', sessionId);
  }
  return sessionId;
}

/**
 * Get device type based on screen width
 */
export function getDeviceType(): 'mobile' | 'tablet' | 'desktop' {
  if (typeof window === 'undefined') return 'desktop';
  
  const width = window.innerWidth;
  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
}

/**
 * Get browser name
 */
export function getBrowser(): string {
  if (typeof window === 'undefined') return 'Unknown';
  
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Chrome')) return 'Chrome';
  if (userAgent.includes('Firefox')) return 'Firefox';
  if (userAgent.includes('Safari')) return 'Safari';
  if (userAgent.includes('Edge')) return 'Edge';
  if (userAgent.includes('Opera')) return 'Opera';
  return 'Unknown';
}

/**
 * Get operating system
 */
export function getOS(): string {
  if (typeof window === 'undefined') return 'Unknown';
  
  const userAgent = navigator.userAgent;
  if (userAgent.includes('Win')) return 'Windows';
  if (userAgent.includes('Mac')) return 'MacOS';
  if (userAgent.includes('Linux')) return 'Linux';
  if (userAgent.includes('Android')) return 'Android';
  if (userAgent.includes('iOS')) return 'iOS';
  return 'Unknown';
}

/**
 * Get screen resolution
 */
export function getScreenResolution(): string {
  if (typeof window === 'undefined') return '0x0';
  return `${screen.width}x${screen.height}`;
}

/**
 * Get user type from Redux user state
 * Partners/Ambassadors are tracked as 'partner'
 */
export function getUserType(user: any): 'guest' | 'user' | 'partner' | 'admin' {
  if (!user) return 'guest';
  
  const role = user.role_id || user.role;
  
  if (role === 'ADMIN') return 'admin';
  if (role === 'AMBASSADOR' || role === 'USERAMBASSADOR') return 'partner';
  if (role === 'USER') return 'user';
  
  return 'guest';
}

/**
 * Get user ID from Redux user state
 */
export function getUserId(user: any): string | null {
  if (!user) return null;
  return user.user_id || user.id || null;
}
