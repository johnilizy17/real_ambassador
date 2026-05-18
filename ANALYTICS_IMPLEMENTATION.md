# Analytics Implementation - Partner/Ambassador App (real_ambassador)

## Overview
Complete analytics tracking system integrated into the partner/ambassador app. Tracks guest browsing, partner sessions, page views, and conversions from guest to registered partner.

## Status: COMPLETE ✅

All analytics tracking is now integrated and working automatically!

## What Was Implemented

### 1. Analytics Utilities
**File:** `src/utils/analytics.ts`

Functions for device and session management:
- `getDeviceId()` - Generate/retrieve persistent device ID from localStorage
- `getSessionId()` - Generate/retrieve session ID from sessionStorage
- `getDeviceType()` - Detect device type (mobile/tablet/desktop)
- `getBrowser()` - Detect browser name
- `getOS()` - Detect operating system
- `getScreenResolution()` - Get screen resolution
- `getUserType(user)` - Get user type from Redux state (guest/user/partner/admin)
- `getUserId(user)` - Get user ID from Redux state

### 2. API Client
**File:** `src/utils/url/statisticsApi.ts`

Complete TypeScript API client with:
- `trackEvent()` - Track any partner event
- `startSession()` - Start a new session
- `endSession()` - End a session
- `trackConversion()` - Track guest-to-partner conversion

### 3. Analytics Hook
**File:** `src/hooks/useAnalytics.ts`

Custom React hook that automatically:
- Initializes session on app load
- Tracks page views on route changes
- Calculates time spent on each page
- Ends session on app unmount
- Provides `trackCustomEvent()` function for custom tracking

### 4. Analytics Provider
**File:** `src/components/utils/AnalyticsProvider.tsx`

React component that:
- Wraps the entire app
- Monitors Redux user state
- Automatically tracks conversion when partner logs in or registers
- Detects transition from guest (null user) to registered partner

### 5. App Integration
**File:** `src/pages/_app.tsx`

Updated to include `AnalyticsProvider` wrapper around the entire app.

## How It Works

### Automatic Tracking

#### 1. Guest Browsing
When a guest visits the partner app:
- Device ID is generated and stored in localStorage: `device_abc123`
- Session ID is generated and stored in sessionStorage: `session_xyz789`
- Session is started automatically
- Every page view is tracked with:
  - Page URL
  - Page title
  - Time spent on page
  - Device information
  - User type: `guest`
  - User ID: `null`

#### 2. Partner Registration/Login
When a guest registers as a partner or logs in:
- Redux `auth.user` state changes from `null` to user object
- `AnalyticsProvider` detects this change
- Conversion API is called automatically:
  ```typescript
  trackConversion({
    device_id: 'device_abc123',
    user_id: 'partner_123'
  })
  ```
- All previous guest activity is now associated with the partner
- Future events tracked with:
  - User type: `partner` (for ambassadors)
  - User ID: actual partner ID

#### 3. Continued Browsing
After login/registration:
- Same device ID is used (persists across sessions)
- New session ID for each browser session
- All page views tracked with partner information
- Complete journey from guest to partner is preserved

### User Type Detection

The system automatically detects user type from Redux state:

```typescript
// From Redux auth.user.role_id or auth.user.role
'ADMIN' → 'admin'
'AMBASSADOR' or 'USERAMBASSADOR' → 'partner'
'USER' → 'user'
null or undefined → 'guest'
```

### Redux Integration

The analytics system reads from Redux state:

```typescript
// User state from Redux
const user = useSelector((state: RootState) => state.auth.user);

// User object structure:
{
  user_id: string,
  first_name: string,
  last_name: string,
  email_address: string,
  phone_number: string,
  email_verified: number,
  role_id: string, // 'AMBASSADOR', 'USERAMBASSADOR', etc.
}
```

## Custom Event Tracking

You can track custom events anywhere in your app:

```typescript
import { useAnalytics } from '@/hooks/useAnalytics';

function MyComponent() {
  const { trackCustomEvent } = useAnalytics();

  const handleReferralShare = async () => {
    await trackCustomEvent('referral_share', {
      referral_code: 'ABC123',
      share_method: 'WhatsApp',
    });
  };

  return <button onClick={handleReferralShare}>Share Referral</button>;
}
```

## Examples

### Track Referral Link Share
```typescript
const { trackCustomEvent } = useAnalytics();

const handleShareLink = async (platform: string) => {
  await trackCustomEvent('referral_link_share', {
    platform,
    referral_code: user.referral_code,
  });
};
```

### Track Commission View
```typescript
const { trackCustomEvent } = useAnalytics();

const handleViewCommission = async () => {
  await trackCustomEvent('commission_view', {
    total_commission: commissionAmount,
    referrals_count: referralsCount,
  });
};
```

### Track Withdrawal Request
```typescript
const { trackCustomEvent } = useAnalytics();

const handleWithdrawal = async (amount: number) => {
  await trackCustomEvent('withdrawal_request', {
    amount,
    currency: 'USD',
  });
};
```

## Data Flow

### Guest to Partner Journey
```
1. Guest visits partner landing page
   ↓
   Device ID: device_abc123 (created)
   Session ID: session_xyz789 (created)
   Event: page_view, user_type: guest, user_id: null

2. Guest browses to /dashboard
   ↓
   Event: page_view, page_url: /dashboard, duration: 45s

3. Guest registers as partner
   ↓
   Redux: auth.user changes from null to user object
   Conversion API called: { device_id: device_abc123, user_id: partner_123 }
   All previous events now associated with partner_123

4. Partner continues browsing
   ↓
   Event: page_view, user_type: partner, user_id: partner_123
   Same device_id: device_abc123
```

### Session Management
```
App Load
  ↓
  startSession() called
  Session start time recorded
  
Route Changes
  ↓
  Previous page duration calculated
  New page view tracked
  
App Unmount
  ↓
  endSession() called
  Total session duration sent to backend
```

## Backend API

All data is sent to the backend at `/api/v1/statistics`:

- **POST /track** - Track events
- **POST /session/start** - Start session
- **POST /session/end** - End session
- **POST /conversion** - Track conversion

The admin dashboard can view all partner activity at:
`Corporate Dashboard → Statistics Analytics` (filter by user_type: partner)

## Benefits

1. **Automatic Tracking** - No manual tracking code needed
2. **Redux Integration** - Reads partner state automatically
3. **Conversion Tracking** - Detects guest-to-partner transition
4. **Device Persistence** - Device ID survives registration
5. **Complete Journey** - Track partners from first visit to conversion
6. **Custom Events** - Easy to track partner-specific interactions
7. **Type Safety** - Full TypeScript support
8. **Error Handling** - Graceful failure, doesn't break app

## Files Created

```
real_ambassador/
├── src/
│   ├── utils/
│   │   ├── analytics.ts                    # Analytics utilities
│   │   └── url/
│   │       └── statisticsApi.ts            # API client
│   ├── hooks/
│   │   └── useAnalytics.ts                 # Analytics hook
│   ├── components/
│   │   └── utils/
│   │       └── AnalyticsProvider.tsx       # Analytics provider
│   └── pages/
│       └── _app.tsx                        # Updated with provider
└── ANALYTICS_IMPLEMENTATION.md             # This file
```

## Testing

### Test Guest Tracking
1. Open app in incognito/private window
2. Browse multiple pages
3. Check browser console for "device_id" in localStorage
4. Check admin dashboard for guest events

### Test Partner Conversion Tracking
1. Continue from guest session
2. Register as partner or login
3. Check console for "Partner conversion tracked successfully"
4. Check admin dashboard - all guest events now associated with partner

### Test Partner Tracking
1. Login as existing partner
2. Browse pages
3. Check admin dashboard for partner events with correct user_id
4. Filter by user_type: partner

## Troubleshooting

### Events Not Showing
- Check browser console for errors
- Verify backend API is running
- Check network tab for API calls to `/statistics/track`

### Conversion Not Tracked
- Verify Redux user state is updating correctly
- Check console for conversion tracking message
- Ensure device_id exists in localStorage

### Session Not Starting
- Check if `AnalyticsProvider` is wrapping the app
- Verify `useAnalytics` hook is being called
- Check network tab for `/statistics/session/start` call

## Partner-Specific Use Cases

### Track Referral Activity
```typescript
const { trackCustomEvent } = useAnalytics();

// Track when partner shares referral link
await trackCustomEvent('referral_share', {
  referral_code: user.referral_code,
  platform: 'WhatsApp'
});

// Track when someone clicks partner's referral link
await trackCustomEvent('referral_click', {
  referral_code: params.ref,
  source: 'landing_page'
});
```

### Track Commission Events
```typescript
const { trackCustomEvent } = useAnalytics();

// Track commission earned
await trackCustomEvent('commission_earned', {
  amount: commission,
  referral_id: referralId,
  transaction_type: 'deposit'
});

// Track commission withdrawal
await trackCustomEvent('commission_withdrawal', {
  amount: withdrawalAmount,
  method: 'bank_transfer'
});
```

### Track Partner Dashboard Activity
```typescript
const { trackCustomEvent } = useAnalytics();

// Track dashboard views
await trackCustomEvent('dashboard_view', {
  section: 'referrals',
  total_referrals: referralsCount
});

// Track performance metrics view
await trackCustomEvent('metrics_view', {
  period: 'monthly',
  total_earnings: earnings
});
```

## Next Steps

### Optional Enhancements
1. **Track Specific Partner Actions**
   - Add custom event tracking to referral sharing
   - Track commission views and withdrawals
   - Track partner dashboard interactions

2. **Performance Monitoring**
   - Track page load times
   - Monitor API response times
   - Track errors and exceptions

3. **Partner Engagement**
   - Track referral link shares
   - Monitor commission earnings
   - Track withdrawal requests

## Summary

The analytics system is fully integrated into the partner app and works automatically. It tracks:
- ✅ Guest browsing (user_id = null)
- ✅ Partner sessions with duration
- ✅ Page views with time spent
- ✅ Device and browser information
- ✅ Guest-to-partner conversion
- ✅ Partner activity after registration

All data is sent to the backend and visible in the admin dashboard (filter by user_type: partner). The system uses Redux state to automatically detect user type and track conversions when guests register or login as partners.

**Status:** ✅ PRODUCTION READY
