import { getAnalyticsMetrics } from "@/lib/data-service"
import { AnalyticsDashboard } from "@/components/dashboard/analytics-charts"
import { Activity } from "lucide-react"

export const dynamic = 'force-dynamic'

export default async function AnalyticsPage() {

    const metrics = await getAnalyticsMetrics()

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-gold-500/10 pb-6">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gradient-gold">Performance Analytics</h1>
                    <p className="text-silver-400 mt-2">Real-time insights across Personal and Company channels.</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-silver-500 glass-subtle px-4 py-2 rounded-full">
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    <Activity className="w-3 h-3" />
                    Live Data
                </div>
            </div>

            <AnalyticsDashboard metrics={metrics} />
        </div>
    )
}
