import posthog from 'posthog-js';

/**
 * Increment session interaction counter
 * Call this whenever a user interacts with the page
 */
export function trackInteraction(interactionType: string, properties?: Record<string, any>) {
  if (typeof window === 'undefined') return;

  // Increment interaction counter
  const currentCount = parseInt(sessionStorage.getItem('session_interactions') || '0');
  const newCount = currentCount + 1;
  sessionStorage.setItem('session_interactions', newCount.toString());

  // Capture interaction event
  posthog.capture('user_interaction', {
    interaction_type: interactionType,
    interaction_count: newCount,
    ...properties
  });

  // Track engagement milestones
  if (newCount === 3) {
    posthog.capture('engagement_milestone', {
      milestone: 'first_interactions',
      interaction_count: newCount
    });
  } else if (newCount === 5) {
    posthog.capture('engagement_milestone', {
      milestone: 'active_user',
      interaction_count: newCount
    });
  } else if (newCount === 10) {
    posthog.capture('engagement_milestone', {
      milestone: 'highly_engaged',
      interaction_count: newCount
    });
  }
}

/**
 * Get current session metrics
 */
export function getSessionMetrics() {
  if (typeof window === 'undefined') return null;

  const startTime = parseInt(sessionStorage.getItem('session_start_time') || '0');
  const interactions = parseInt(sessionStorage.getItem('session_interactions') || '0');
  const duration = startTime ? Math.floor((Date.now() - startTime) / 1000) : 0;

  return {
    duration_seconds: duration,
    interaction_count: interactions,
    engagement_rate: duration > 0 ? (interactions / duration * 60).toFixed(2) : 0 // interactions per minute
  };
}
