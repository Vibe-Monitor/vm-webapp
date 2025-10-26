import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Search, Filter } from "lucide-react";

interface LogEntry {
  id: string;
  timestamp: string;
  level: "INFO" | "ERROR" | "WARN" | "DEBUG"; 
  message: string;
  metadata?: Record<string, any>;
}

const sampleLogs: LogEntry[] = [
  {
    id: "1",
    timestamp: "2024-01-15T10:30:45.123Z",
    level: "INFO",
    message: "User login successful",
    metadata: { user_id: 123, ip: "192.168.1.1", session_id: "sess_abc123" }
  },
  {
    id: "2",
    timestamp: "2024-01-15T10:31:02.456Z",
    level: "ERROR",
    message: "Database connection failed",
    metadata: { error_code: "DB_CONN_TIMEOUT", retry_count: 3 }
  },
  {
    id: "3",
    timestamp: "2024-01-15T10:31:15.789Z",
    level: "WARN",
    message: "API rate limit approaching",
    metadata: { current_requests: 950, limit: 1000, window: "1h" }
  },
  {
    id: "4",
    timestamp: "2024-01-15T10:31:30.012Z",
    level: "INFO",
    message: "Cache miss for user profile",
    metadata: { user_id: 456, cache_key: "profile_456", ttl: 3600 }
  },
  {
    id: "5",
    timestamp: "2024-01-15T10:31:45.345Z",
    level: "DEBUG",
    message: "Processing payment webhook",
    metadata: { webhook_id: "wh_789", amount: 99.99, currency: "USD" }
  },
  {
    id: "6",
    timestamp: "2024-01-15T10:32:00.678Z",
    level: "ERROR",
    message: "File upload validation failed",
    metadata: { file_size: 5242880, max_size: 2097152, mime_type: "image/jpeg" }
  },
  {
    id: "7",
    timestamp: "2024-01-15T10:32:15.901Z",
    level: "INFO",
    message: "Email notification sent",
    metadata: { recipient: "user@example.com", template: "welcome", delivery_time: "2.3s" }
  },
  {
    id: "8",
    timestamp: "2024-01-15T10:32:30.234Z",
    level: "WARN",
    message: "High memory usage detected",
    metadata: { current_usage: "85%", threshold: "80%", process_id: 1234 }
  }
];

export function LogViewerPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("timestamp");
  const [levelFilter, setLevelFilter] = useState("all");

  const filteredAndSortedLogs = useMemo(() => {
    let filtered = sampleLogs;

    // Filter by search term
    if (searchTerm) {
      filtered = filtered.filter(log =>
        log.message.toLowerCase().includes(searchTerm.toLowerCase()) ||
        JSON.stringify(log.metadata).toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by level
    if (levelFilter !== "all") {
      filtered = filtered.filter(log => log.level === levelFilter);
    }

    // Sort
    filtered.sort((a, b) => {
      if (sortBy === "timestamp") {
        return new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
      }
      if (sortBy === "level") {
        const levelOrder = { ERROR: 0, WARN: 1, INFO: 2, DEBUG: 3 };
        return levelOrder[a.level] - levelOrder[b.level];
      }
      return 0;
    });

    return filtered;
  }, [searchTerm, sortBy, levelFilter]);

  const formatTimestamp = (timestamp: string) => {
    return new Date(timestamp).toLocaleString();
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case "ERROR":
        return "bg-destructive text-destructive-foreground";
      case "WARN":
        return "bg-warning text-black";
      case "INFO":
        return "bg-accent text-accent-foreground";
      case "DEBUG":
        return "bg-muted text-muted-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-background via-background to-background/95">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-accent/3 pointer-events-none" />
      
      <div className="max-w-6xl mx-auto space-y-6">
        <Card className="hover-lift transition-all duration-300 shadow-xl bg-card/95 backdrop-blur-sm">
          <CardContent className="space-y-4">
            {/* Controls */}
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search logs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 focus-glow transition-all bg-input border-border focus:border-primary"
                />
              </div>
              
              <div className="flex gap-2">
                <Select value={levelFilter} onValueChange={setLevelFilter}>
                  <SelectTrigger className="w-32 bg-input border-border hover:border-primary transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    <SelectItem value="ERROR">Error</SelectItem>
                    <SelectItem value="WARN">Warning</SelectItem>
                    <SelectItem value="INFO">Info</SelectItem>
                    <SelectItem value="DEBUG">Debug</SelectItem>
                  </SelectContent>
                </Select>
                
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-32 bg-input border-border hover:border-primary transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="timestamp">Date</SelectItem>
                    <SelectItem value="level">Severity</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            {/* Log Display */}
            <Card className="bg-background/50 border-border">
              <ScrollArea className="h-96 p-4">
                <div className="space-y-2 font-mono text-sm">
                  {filteredAndSortedLogs.map((log) => (
                    <div
                      key={log.id}
                      className="group hover:bg-accent/5 p-2 rounded transition-colors cursor-default border-l-2 border-transparent hover:border-accent"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-muted-foreground text-xs whitespace-nowrap mt-0.5">
                          [{formatTimestamp(log.timestamp)}]
                        </span>
                        <Badge
                          variant="secondary"
                          className={`${getLevelColor(log.level)} text-xs font-mono flex-shrink-0`}
                        >
                          {log.level}
                        </Badge>
                        <div className="flex-1 min-w-0">
                          <div className="text-foreground group-hover:text-accent transition-colors">
                            {log.message}
                          </div>
                          {log.metadata && (
                            <div className="text-muted-foreground text-xs mt-1 italic">
                              {JSON.stringify(log.metadata, null, 0)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {filteredAndSortedLogs.length === 0 && (
                    <div className="text-center text-muted-foreground py-8">
                      <Filter className="w-8 h-8 mx-auto mb-2 opacity-50" />
                      <p>No logs match your current filters</p>
                    </div>
                  )}
                </div>
              </ScrollArea>
            </Card>
            
            <div className="flex justify-between items-center text-xs text-muted-foreground">
              <span>{filteredAndSortedLogs.length} log entries displayed</span>
              <span>Live updating • Last refresh: {new Date().toLocaleTimeString()}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}