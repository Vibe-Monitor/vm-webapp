"use client"

import { useState } from "react"
import { Search, Clock } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup } from "@/components/ui/select"
import GitHubConnect from "@/components/workspace/GitHubConnect"
import GitHubStatusIndicator from "@/components/ui/github-status-indicator"

const mockLogs = [
  "2025-09-11 00:02:05.227 | - Local: http://localhost:4501",
  "2025-09-11 00:02:05.227 | ▲ Next.js 15.4.5",
  "2025-09-11 00:02:05.227 | > next dev -p 4500 -p 4501",
  "2025-09-11 00:02:05.227 | > my-v0-project@0.1.0 dev",
  "2025-09-11 00:02:05.227 | GET /auth/signin 200 in 64ms",
  "2025-09-11 00:02:05.227 | GET /auth/signin 200 in 70ms",
  "2025-09-11 00:02:05.227 | GET /auth/signin 200 in 222ms",
  "2025-09-11 00:02:05.227 | GET /api/auth/user/cmen9refs0000v6y9b92iu88m 200 in 45ms",
  "2025-09-11 00:02:06.151 | POST /api/auth/login 201 in 89ms",
  "2025-09-11 00:02:06.205 | GET /dashboard 200 in 12ms",
  "2025-09-11 00:02:06.301 | GET /api/logs 200 in 156ms",
  "2025-09-11 00:02:07.445 | WebSocket connection established",
  "2025-09-11 00:02:08.123 | Database connection pool: 8/10 connections active",
  "2025-09-11 00:02:08.456 | Cache hit ratio: 94.5%",
  "2025-09-11 00:02:09.789 | Background job processed: email_queue",
  "2025-09-11 00:02:10.234 | GET /api/metrics 200 in 23ms",
  "2025-09-11 00:02:11.567 | Rate limit check: user_12345 within limits",
  "2025-09-11 00:02:12.890 | Session cleanup job started",
    "2025-09-11 00:02:05.227 | - Local: http://localhost:4501",
  "2025-09-11 00:02:05.227 | ▲ Next.js 15.4.5",
  "2025-09-11 00:02:05.227 | > next dev -p 4500 -p 4501",
  "2025-09-11 00:02:05.227 | > my-v0-project@0.1.0 dev",
  "2025-09-11 00:02:05.227 | GET /auth/signin 200 in 64ms",
  "2025-09-11 00:02:05.227 | GET /auth/signin 200 in 70ms",
  "2025-09-11 00:02:05.227 | GET /auth/signin 200 in 222ms",
  "2025-09-11 00:02:05.227 | GET /api/auth/user/cmen9refs0000v6y9b92iu88m 200 in 45ms",
  "2025-09-11 00:02:06.151 | POST /api/auth/login 201 in 89ms",
  "2025-09-11 00:02:06.205 | GET /dashboard 200 in 12ms",
  "2025-09-11 00:02:06.301 | GET /api/logs 200 in 156ms",
  "2025-09-11 00:02:07.445 | WebSocket connection established",
  "2025-09-11 00:02:08.123 | Database connection pool: 8/10 connections active",
  "2025-09-11 00:02:08.456 | Cache hit ratio: 94.5%",
  "2025-09-11 00:02:09.789 | Background job processed: email_queue",
  "2025-09-11 00:02:10.234 | GET /api/metrics 200 in 23ms",
  "2025-09-11 00:02:11.567 | Rate limit check: user_12345 within limits",
  "2025-09-11 00:02:12.890 | Session cleanup job started",
    "2025-09-11 00:02:05.227 | - Local: http://localhost:4501",
  "2025-09-11 00:02:05.227 | ▲ Next.js 15.4.5",
  "2025-09-11 00:02:05.227 | > next dev -p 4500 -p 4501",
  "2025-09-11 00:02:05.227 | > my-v0-project@0.1.0 dev",
  "2025-09-11 00:02:05.227 | GET /auth/signin 200 in 64ms",
  "2025-09-11 00:02:05.227 | GET /auth/signin 200 in 70ms",
  "2025-09-11 00:02:05.227 | GET /auth/signin 200 in 222ms",
  "2025-09-11 00:02:05.227 | GET /api/auth/user/cmen9refs0000v6y9b92iu88m 200 in 45ms",
  "2025-09-11 00:02:06.151 | POST /api/auth/login 201 in 89ms",
  "2025-09-11 00:02:06.205 | GET /dashboard 200 in 12ms",
  "2025-09-11 00:02:06.301 | GET /api/logs 200 in 156ms",
  "2025-09-11 00:02:07.445 | WebSocket connection established",
  "2025-09-11 00:02:08.123 | Database connection pool: 8/10 connections active",
  "2025-09-11 00:02:08.456 | Cache hit ratio: 94.5%",
  "2025-09-11 00:02:09.789 | Background job processed: email_queue",
  "2025-09-11 00:02:10.234 | GET /api/metrics 200 in 23ms",
  "2025-09-11 00:02:11.567 | Rate limit check: user_12345 within limits",
  "2025-09-11 00:02:12.890 | Session cleanup job started",
    "2025-09-11 00:02:05.227 | - Local: http://localhost:4501",
  "2025-09-11 00:02:05.227 | ▲ Next.js 15.4.5",
  "2025-09-11 00:02:05.227 | > next dev -p 4500 -p 4501",
  "2025-09-11 00:02:05.227 | > my-v0-project@0.1.0 dev",
  "2025-09-11 00:02:05.227 | GET /auth/signin 200 in 64ms",
  "2025-09-11 00:02:05.227 | GET /auth/signin 200 in 70ms",
  "2025-09-11 00:02:05.227 | GET /auth/signin 200 in 222ms",
  "2025-09-11 00:02:05.227 | GET /api/auth/user/cmen9refs0000v6y9b92iu88m 200 in 45ms",
  "2025-09-11 00:02:06.151 | POST /api/auth/login 201 in 89ms",
  "2025-09-11 00:02:06.205 | GET /dashboard 200 in 12ms",
  "2025-09-11 00:02:06.301 | GET /api/logs 200 in 156ms",
  "2025-09-11 00:02:07.445 | WebSocket connection established",
  "2025-09-11 00:02:08.123 | Database connection pool: 8/10 connections active",
  "2025-09-11 00:02:08.456 | Cache hit ratio: 94.5%",
  "2025-09-11 00:02:09.789 | Background job processed: email_queue",
  "2025-09-11 00:02:10.234 | GET /api/metrics 200 in 23ms",
  "2025-09-11 00:02:11.567 | Rate limit check: user_12345 within limits",
  "2025-09-11 00:02:12.890 | Session cleanup job started",
   "2025-09-11 00:02:05.227 | ▲ Next.js 15.4.5",
  "2025-09-11 00:02:05.227 | > next dev -p 4500 -p 4501",
  "2025-09-11 00:02:05.227 | > my-v0-project@0.1.0 dev",
  "2025-09-11 00:02:05.227 | GET /auth/signin 200 in 64ms",
  "2025-09-11 00:02:05.227 | GET /auth/signin 200 in 70ms",
  "2025-09-11 00:02:05.227 | GET /auth/signin 200 in 222ms",
  "2025-09-11 00:02:05.227 | GET /api/auth/user/cmen9refs0000v6y9b92iu88m 200 in 45ms",
  "2025-09-11 00:02:06.151 | POST /api/auth/login 201 in 89ms",
  "2025-09-11 00:02:06.205 | GET /dashboard 200 in 12ms",
  "2025-09-11 00:02:06.301 | GET /api/logs 200 in 156ms",
  "2025-09-11 00:02:07.445 | WebSocket connection established",
  "2025-09-11 00:02:08.123 | Database connection pool: 8/10 connections active",
  "2025-09-11 00:02:08.456 | Cache hit ratio: 94.5%",
  "2025-09-11 00:02:09.789 | Background job processed: email_queue",
  "2025-09-11 00:02:10.234 | GET /api/metrics 200 in 23ms",
  "2025-09-11 00:02:11.567 | Rate limit check: user_12345 within limits",
  "2025-09-11 00:02:12.890 | Session cleanup job started"
]

// Time range options data organized by categories
const timeRangeOptions = {
  quick: [
    { value: "5m", label: "Last 5 minutes", shortLabel: "5m" },
    { value: "15m", label: "Last 15 minutes", shortLabel: "15m" },
    { value: "30m", label: "Last 30 minutes", shortLabel: "30m" },
    { value: "1h", label: "Last 1 hour", shortLabel: "1h" },
    { value: "3h", label: "Last 3 hours", shortLabel: "3h" },
    { value: "6h", label: "Last 6 hours", shortLabel: "6h" },
    { value: "12h", label: "Last 12 hours", shortLabel: "12h" }
  ],
  extended: [
    { value: "today", label: "Today", shortLabel: "Today" },
    { value: "1d", label: "Last 1 day", shortLabel: "1d" },
    { value: "2d", label: "Last 2 days", shortLabel: "2d" },
    { value: "4d", label: "Last 4 days", shortLabel: "4d" },
    { value: "7d", label: "Last 7 days", shortLabel: "7d" },
    { value: "10d", label: "Last 10 days", shortLabel: "10d" },
    { value: "2w", label: "Last 2 weeks", shortLabel: "2w" },
    { value: "1m", label: "Last 1 month", shortLabel: "1m" },
    { value: "2m", label: "Last 2 months", shortLabel: "2m" }
  ]
}

const getTimeZoneDisplay = () => {
  const now = new Date()
  const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
  const offset = now.getTimezoneOffset()
  const offsetHours = Math.floor(Math.abs(offset) / 60)
  const offsetMinutes = Math.abs(offset) % 60
  const offsetSign = offset <= 0 ? '+' : '-'
  const offsetString = `UTC ${offsetSign}${offsetHours.toString().padStart(2, '0')}:${offsetMinutes.toString().padStart(2, '0')}`

  return { timeZone, offsetString }
}

interface LogsDashboardProps {
  workspaceId: string
}

export default function LogsDashboard({ workspaceId }: LogsDashboardProps) {
  const [selectedTimeRange, setSelectedTimeRange] = useState("15m")
  const [selectedOrderBy, setSelectedOrderBy] = useState("desc")
  const [searchQuery, setSearchQuery] = useState("")
  const { timeZone, offsetString } = getTimeZoneDisplay()

  const getDisplayLabel = (value: string) => {
    if (value === "live") return "Live"
    const allOptions = [...timeRangeOptions.quick, ...timeRangeOptions.extended]
    const option = allOptions.find(opt => opt.value === value)
    return option?.label || value
  }

  return (
    <div className="flex flex-col h-screen bg-black text-white overflow-hidden">
      {/* Filters */}
      <div className="flex-shrink-0 border-b px-6 py-3" style={{
        background: "var(--color-background-subtle)",
        borderColor: "var(--color-border-subtle)",
        borderWidth: "0.5px"
      }}>
        <div className="flex items-center gap-4 flex-wrap">
          <div className="flex-1 min-w-64 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 z-10"
              style={{ color: "var(--color-text-tertiary)" }} />
            <Input
              type="text"
              placeholder="Search logs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <GitHubConnect workspaceId={workspaceId} />
          

          
          {/* GitHub Status Indicator */}
          <GitHubStatusIndicator workspaceId={workspaceId} showDetails={false} className="flex-shrink-0" />

          <Select value={selectedTimeRange} onValueChange={setSelectedTimeRange}>
            <SelectTrigger className="w-48 min-w-fit">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4" style={{ color: "var(--color-text-tertiary)" }} />
                <SelectValue>
                  {getDisplayLabel(selectedTimeRange)}
                </SelectValue>
              </div>
            </SelectTrigger>
            <SelectContent className="w-[520px]">
              {/* Relative Times Section */}
              <SelectGroup>
                <div className="px-2 py-2 border-b" style={{ borderColor: "var(--color-border-subtle)" }}>
                  <span style={{ color: "var(--color-text-secondary)", fontSize: "11px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Relative Times
                  </span>
                </div>
                <div className="p-1">
                  {/* Live Option */}
                  <SelectItem value="live" className="mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "var(--color-success)" }}></div>
                      Live
                    </div>
                  </SelectItem>

                  {/* Two Column Layout */}
                  <div className="grid grid-cols-2 gap-1">
                    {/* Left Column - Quick Times */}
                    <div className="space-y-0">
                      <div className="text-xs font-medium mb-1 px-2" style={{ color: "var(--color-text-secondary)" }}>
                        Quick Times
                      </div>
                      {timeRangeOptions.quick.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="py-1">
                          <div className="flex justify-between items-center w-full">
                            <span>{option.label}</span>

                          </div>
                        </SelectItem>
                      ))}
                    </div>

                    {/* Right Column - Extended Times */}
                    <div className="space-y-0">
                      <div className="text-xs font-medium mb-1 px-2" style={{ color: "var(--color-text-secondary)" }}>
                        Extended Times
                      </div>
                      {timeRangeOptions.extended.map((option) => (
                        <SelectItem key={option.value} value={option.value} className="py-1">
                          <div className="flex justify-between items-center w-full">
                            <span>{option.label}</span>

                          </div>
                        </SelectItem>
                      ))}
                    </div>
                  </div>
                </div>
              </SelectGroup>

              {/* Timezone Section */}
              <SelectGroup>
                <div className="flex items-center justify-between px-2 py-2 border-t" style={{ borderColor: "var(--color-border-subtle)" }}>
                  <span style={{ color: "var(--color-text-secondary)", fontSize: "11px", fontWeight: "600", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Current Timezone
                  </span>
                  <span className="text-xs" style={{ color: "var(--color-text-primary)" }}>
                    {offsetString} · {timeZone}
                  </span>
                </div>
              </SelectGroup>
            </SelectContent>
          </Select>

          <Select value={selectedOrderBy} onValueChange={setSelectedOrderBy}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="Order By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="desc">Timestamp (desc)</SelectItem>
              <SelectItem value="asc">Timestamp (asc)</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Log Stream */}
      <div className="flex-1 overflow-hidden bg-black">
        <div className="h-full overflow-y-auto sidebar-scrollbar p-4" style={{
          fontFamily: "var(--font-mono)"
        }}>
          {mockLogs.map((log, index) => (
            <div
              key={index}
              className="text-sm font-mono leading-tight mb-0 flex items-start gap-2"
              style={{ color: "var(--color-text-tertiary)" }}
            >
              <div
                className="w-1 h-4 rounded-full flex-shrink-0 mt-0.5"
                style={{ backgroundColor: "var(--color-blue-line)" }}
              />
              <span>{log}</span>
            </div>
          ))}
        </div>
      </div>


    </div>
  )
  
}