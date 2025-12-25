import { FiShare2, FiPieChart, FiTool, FiTrendingUp, FiSliders, FiShield, FiActivity, FiSearch, FiGitPullRequest } from "react-icons/fi";

import { IBenefit } from "@/vm-site-landing/types"

export const benefits: IBenefit[] = [
    {
        title: "Faster Error Resolution",
        description: "Analyzes logs, metrics, traces, latest service graph, code diffs, and deploy history using LLMs to identify root cause and recommend specific fix strategies.",
        bullets: [
            {
                title: "Root Cause Analysis",
                description: "Correlates signals across your entire stack to find the real problem.",
                icon: <FiSearch size={26} />,
                iconColor: "text-analytical"
            },
            {
                title: "Dynamic Service Graphs",
                description: "Auto-generated and maintained service dependency graphs from traces.",
                icon: <FiShare2 size={26} />,
                iconColor: "text-integration"
            },
            {
                title: "Fix Recommendations",
                description: "Get specific rollback or patch-forward strategies, not just alerts.",
                icon: <FiTool size={26} />,
                iconColor: "text-tools"
            }
        ]
    },
    {
        title: "Auto-Improve Observability",
        description: "Regularly scans all your repositories using LLMs to identify missing instrumentation for logs, metrics and traces and then raises PRs to add missing instrumentation.",
        bullets: [
            {
                title: "Missing Signal Detection",
                description: "Finds gaps in your observability coverage automatically.",
                icon: <FiActivity size={26} />,
                iconColor: "text-analytical"
            },
            {
                title: "Auto-Generated PRs",
                description: "Creates pull requests with the exact logging, metrics and tracing code needed.",
                icon: <FiGitPullRequest size={26} />,
                iconColor: "text-integration"
            },
            {
                title: "OpenTelemetry Native",
                description: "Works with your existing OTel setup, no vendor lock-in.",
                icon: <FiPieChart size={26} />,
                iconColor: "text-integration"
            }
        ]
    },
    {
        title: "Zero-Noise Alerting",
        description: "Learns your patterns, self-tunes thresholds, and filters out deployment blips—ensuring alerts mean something is genuinely broken.",
        bullets: [
            {
                title: "Anomaly Detection",
                description: "Understands day-of-week and hour-of-day patterns, then detects meaningful deviations—not just rule breaches.",
                icon: <FiTrendingUp size={26} />,
                iconColor: "text-analytical"
            },
            {
                title: "Self-Tuning Thresholds",
                description: "Starts with smart defaults, then adapts as your system evolves—customize anytime.",
                icon: <FiSliders size={26} />,
                iconColor: "text-tools"
            },
            {
                title: "Deployment-Aware",
                description: "Suppresses temporary metric dips during rollouts—alerting kicks in only when issues persist.",
                icon: <FiShield size={26} />,
                iconColor: "text-tools"
            }
        ]
    },
]