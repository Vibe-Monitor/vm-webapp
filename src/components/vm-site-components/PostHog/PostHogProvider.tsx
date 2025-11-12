'use client'

import { PostHogProvider as PHProvider } from 'posthog-js/react'
import posthog from 'posthog-js'
import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'

if (typeof window !== 'undefined' && process.env.NEXT_PUBLIC_POSTHOG_KEY) {
  posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
    api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
    person_profiles: 'identified_only',
    capture_pageview: false,
    capture_pageleave: true
  })
}

// Helper: Extract UTM parameters from search params
function extractUtmParams(searchParams: URLSearchParams) {
  const utmParams: Record<string, string> = {}
  const utmKeys = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']

  utmKeys.forEach(key => {
    const value = searchParams.get(key)
    if (value) {
      utmParams[key] = value
    }
  })

  return Object.keys(utmParams).length > 0 ? utmParams : null
}

// Helper: Get device type
function getDeviceType(): string {
  if (typeof window === 'undefined') return 'unknown'

  const ua = navigator.userAgent.toLowerCase()
  const width = window.innerWidth

  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return 'tablet'
  }
  if (/mobile|iphone|ipod|android|blackberry|mini|windows\sce|palm/i.test(ua)) {
    return 'mobile'
  }
  if (width < 768) {
    return 'mobile'
  }
  if (width >= 768 && width < 1024) {
    return 'tablet'
  }
  return 'desktop'
}

// Helper: Get stored UTM params or current ones
function getUtmParams(searchParams: URLSearchParams): Record<string, string> | null {
  // Check if we have stored UTMs from initial session
  const storedUtms = sessionStorage.getItem('initial_utm_params')
  if (storedUtms) {
    return JSON.parse(storedUtms)
  }

  // Extract current UTMs
  const currentUtms = extractUtmParams(searchParams)
  if (currentUtms) {
    // Store for future pageviews in this session
    sessionStorage.setItem('initial_utm_params', JSON.stringify(currentUtms))
    return currentUtms
  }

  return null
}

function PostHogPageView(): null {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Session start tracking - fires once per session
  useEffect(() => {
    const sessionStarted = sessionStorage.getItem('posthog_session_started')

    if (!sessionStarted) {
      const utmParams = extractUtmParams(searchParams)
      const referrer = document.referrer || 'direct'
      const landingPage = window.location.href
      const deviceType = getDeviceType()

      // Store UTMs if present
      if (utmParams) {
        sessionStorage.setItem('initial_utm_params', JSON.stringify(utmParams))
      }

      // Cohort tracking: Identify new vs returning users
      const hasVisitedBefore = localStorage.getItem('vibemonitor_returning_user')
      const userType = hasVisitedBefore ? 'returning' : 'new'
      const firstVisitDate = localStorage.getItem('vibemonitor_first_visit') || new Date().toISOString()

      if (!hasVisitedBefore) {
        localStorage.setItem('vibemonitor_returning_user', 'true')
        localStorage.setItem('vibemonitor_first_visit', firstVisitDate)
      }

      // Set person properties for cohort analysis
      posthog.setPersonProperties({
        user_type: userType,
        first_visit_date: firstVisitDate,
        device_type: deviceType,
        ...utmParams
      })

      // Capture session_start event with cohort data
      posthog.capture('session_start', {
        referrer,
        landing_page: landingPage,
        device_type: deviceType,
        user_type: userType,
        first_visit_date: firstVisitDate,
        ...utmParams
      })

      // Mark session as started
      sessionStorage.setItem('posthog_session_started', 'true')
      sessionStorage.setItem('session_start_time', Date.now().toString())
      sessionStorage.setItem('session_interactions', '0')
    }
  }, []) // Only run once on mount

  // Enhanced pageview tracking
  useEffect(() => {
    if (pathname) {
      let url = window.origin + pathname
      if (searchParams.toString()) {
        url = url + `?${searchParams.toString()}`
      }

      // Get stored or current UTM params
      const utmParams = getUtmParams(searchParams)

      // Extract persona hint if present
      const personaHint = searchParams.get('persona') || searchParams.get('role')

      // Build enriched pageview properties
      const pageviewProps: Record<string, any> = {
        $current_url: url,
        device_type: getDeviceType()
      }

      // Add UTM params if available
      if (utmParams) {
        Object.assign(pageviewProps, utmParams)
      }

      // Add persona hint if available
      if (personaHint) {
        pageviewProps.persona_hint = personaHint
      }

      posthog.capture('$pageview', pageviewProps)
    }
  }, [pathname, searchParams])

  // Scroll depth tracking for usage metrics
  useEffect(() => {
    const scrollDepths = new Set<number>()
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollPercent = Math.round((scrollTop / (documentHeight - windowHeight)) * 100)

      // Track 25%, 50%, 75%, 100% milestones
      const milestones = [25, 50, 75, 100]
      milestones.forEach(milestone => {
        if (scrollPercent >= milestone && !scrollDepths.has(milestone)) {
          scrollDepths.add(milestone)
          posthog.capture('scroll_depth', {
            depth_percentage: milestone,
            page_path: pathname
          })

          // Track funnel progression
          if (milestone === 25) {
            posthog.capture('funnel_stage', {
              stage: 'awareness',
              stage_number: 1,
              description: 'User scrolled past hero section'
            })
          } else if (milestone === 50) {
            posthog.capture('funnel_stage', {
              stage: 'interest',
              stage_number: 2,
              description: 'User exploring features'
            })
          } else if (milestone === 75) {
            posthog.capture('funnel_stage', {
              stage: 'consideration',
              stage_number: 3,
              description: 'User viewing integrations/proof'
            })
          }
        }
      })
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  // Time on page tracking for usage metrics
  useEffect(() => {
    const pageEnterTime = Date.now()
    const timeCheckpoints = new Set<number>()

    const checkTimeOnPage = setInterval(() => {
      const timeOnPage = Math.floor((Date.now() - pageEnterTime) / 1000) // seconds

      // Track time milestones: 10s, 30s, 60s, 120s
      const milestones = [10, 30, 60, 120]
      milestones.forEach(milestone => {
        if (timeOnPage >= milestone && !timeCheckpoints.has(milestone)) {
          timeCheckpoints.add(milestone)
          posthog.capture('time_on_page', {
            duration_seconds: milestone,
            page_path: pathname
          })

          // Mark engaged sessions (30s+)
          if (milestone === 30) {
            posthog.capture('engaged_session', {
              duration_seconds: milestone,
              session_quality: 'engaged'
            })
          }
        }
      })
    }, 5000) // Check every 5 seconds

    // Cleanup and send final time on page
    return () => {
      clearInterval(checkTimeOnPage)
      const finalTime = Math.floor((Date.now() - pageEnterTime) / 1000)
      if (finalTime >= 5) { // Only track if user stayed at least 5 seconds
        posthog.capture('page_exit', {
          total_time_seconds: finalTime,
          page_path: pathname
        })
      }
    }
  }, [pathname])

  // Section visibility tracking for engagement metrics
  useEffect(() => {
    const observedSections = new Set<string>()

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
            const sectionName = entry.target.getAttribute('data-section-name')
            if (sectionName && !observedSections.has(sectionName)) {
              observedSections.add(sectionName)

              posthog.capture('section_viewed', {
                section_name: sectionName,
                page_path: pathname
              })

              // Track AI-related section views for AI usage metrics
              if (sectionName.toLowerCase().includes('ai') ||
                  sectionName.toLowerCase().includes('interactive') ||
                  sectionName.toLowerCase().includes('demo')) {
                posthog.capture('ai_feature_viewed', {
                  feature_name: sectionName,
                  feature_type: 'demonstration'
                })
              }
            }
          }
        })
      },
      { threshold: 0.5 }
    )

    // Observe all sections with data-section-name attribute
    const sections = document.querySelectorAll('[data-section-name]')
    sections.forEach(section => observer.observe(section))

    return () => observer.disconnect()
  }, [pathname])

  // Track page visibility changes (tab switching)
  useEffect(() => {
    let hiddenTime = 0
    let lastHiddenTimestamp = 0

    const handleVisibilityChange = () => {
      if (document.hidden) {
        lastHiddenTimestamp = Date.now()
      } else {
        if (lastHiddenTimestamp > 0) {
          hiddenTime += Date.now() - lastHiddenTimestamp
        }
        posthog.capture('tab_focus_returned', {
          time_away_seconds: Math.floor((Date.now() - lastHiddenTimestamp) / 1000)
        })
      }
    }

    document.addEventListener('visibilitychange', handleVisibilityChange)
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange)
  }, [])

  return null
}

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  return (
    <PHProvider client={posthog}>
      <Suspense fallback={null}>
        <PostHogPageView />
      </Suspense>
      {children}
    </PHProvider>
  )
}