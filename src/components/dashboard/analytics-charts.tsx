'use client'

import { AnalyticsMetric } from "@/types"
import { Users, BarChart2, TrendingUp, Zap } from "lucide-react"
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    PieChart as RePieChart,
    Pie,
    Cell,
    Area,
    AreaChart
} from 'recharts'
import { format, subMonths, isAfter, parseISO } from "date-fns"

interface AnalyticsDashboardProps {
    metrics: AnalyticsMetric[]
}

const COLORS = {
    gold: '#D4AF37',
    goldLight: '#f2d68a',
    goldDark: '#967524',
    silver: '#94a3b8',
    silverLight: '#cbd5e1',
    slate: '#334155',
    slateDark: '#1e293b',
}

// Custom Tooltip Component
const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="glass-card px-4 py-3 rounded-xl shadow-2xl border border-gold-500/20">
                <p className="text-xs text-silver-400 uppercase tracking-wider mb-2">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                        <span
                            className="w-2 h-2 rounded-full"
                            style={{ backgroundColor: entry.color }}
                        />
                        <span className="text-silver-300">{entry.name}:</span>
                        <span className="font-bold text-silver-100">
                            {entry.value?.toLocaleString()}
                        </span>
                    </div>
                ))}
            </div>
        )
    }
    return null
}

// KPI Card Component
function KPICard({
    title,
    value,
    subtitle,
    icon: Icon,
    trend,
    trendLabel,
    isPrimary = false,
    delay = 0
}: {
    title: string
    value: string | number
    subtitle?: string
    icon: any
    trend?: 'up' | 'down' | 'neutral'
    trendLabel?: string
    isPrimary?: boolean
    delay?: number
}) {
    return (
        <div
            className={`
                relative overflow-hidden rounded-2xl p-6 transition-all duration-500 
                hover-lift hover-glow
                ${isPrimary
                    ? 'glass-card border-gold-500/20'
                    : 'glass-subtle border border-white/5 hover:border-gold-500/20'
                }
            `}
        >
            {/* Background Glow */}
            {isPrimary && (
                <div className="absolute top-0 right-0 w-32 h-32 bg-gold-500/10 rounded-full -mr-10 -mt-10 blur-3xl" />
            )}

            <div className="relative flex justify-between items-start mb-4">
                <div>
                    <p className="text-silver-400 text-xs font-medium uppercase tracking-wider">{title}</p>
                    <h3 className={`text-3xl font-serif font-bold mt-2 ${isPrimary ? 'text-gradient-gold' : 'text-silver-100'}`}>
                        {typeof value === 'number' ? value.toLocaleString() : value}
                    </h3>
                </div>
                <div className={`
                    p-3 rounded-xl transition-all duration-300
                    ${isPrimary
                        ? 'bg-gold-500/10 text-gold-400 shadow-lg shadow-gold-500/10'
                        : 'bg-slate-800/50 text-silver-400 group-hover:text-gold-400'
                    }
                `}>
                    <Icon className="w-5 h-5" />
                </div>
            </div>

            {(trend || subtitle) && (
                <div className="flex items-center gap-2 text-xs">
                    {trend === 'up' && (
                        <span className="flex items-center gap-1 text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded-full">
                            <TrendingUp className="w-3 h-3" />
                            {trendLabel}
                        </span>
                    )}
                    {trend === 'down' && (
                        <span className="flex items-center gap-1 text-rose-400 bg-rose-500/10 px-2 py-1 rounded-full">
                            <TrendingUp className="w-3 h-3 rotate-180" />
                            {trendLabel}
                        </span>
                    )}
                    {subtitle && <span className="text-silver-500">{subtitle}</span>}
                </div>
            )}
        </div>
    )
}

export function AnalyticsDashboard({ metrics }: AnalyticsDashboardProps) {

    if (!metrics || metrics.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[400px] text-silver-400">
                <div className="relative">
                    <BarChart2 className="w-20 h-20 mb-6 text-silver-600" />
                    <div className="absolute inset-0 bg-gold-500/10 rounded-full blur-2xl" />
                </div>
                <h3 className="text-xl font-serif font-medium text-silver-300">No Analytics Data Available</h3>
                <p className="max-w-md text-center mt-2 text-silver-500">
                    Waiting for monthly data sync. Please ensure the analytics_metrics table is populated.
                </p>
            </div>
        )
    }

    // --- KPI Calculations ---
    const totalReach = metrics.reduce((acc, curr) => acc + curr.impressions, 0)
    const totalEngagement = metrics.reduce((acc, curr) => acc + curr.engagements, 0)
    const newFollowers = metrics.reduce((acc, curr) => acc + curr.new_followers, 0)
    const avgEngagementRate = totalReach > 0 ? ((totalEngagement / totalReach) * 100).toFixed(2) : "0"

    // --- Chart Data Prep ---
    const sixMonthsAgo = subMonths(new Date(), 7)
    const recentMetrics = metrics.filter(m => isAfter(parseISO(m.date), sixMonthsAgo))

    // Group by Date for Area Chart
    const chartDataMap = recentMetrics.reduce((acc, curr) => {
        const dateKey = curr.date
        if (!acc[dateKey]) {
            acc[dateKey] = { date: dateKey, Personal: 0, Company: 0 }
        }
        acc[dateKey][curr.platform] = (acc[dateKey][curr.platform] || 0) + curr.impressions
        return acc
    }, {} as Record<string, any>)

    const areaChartData = Object.values(chartDataMap)
        .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
        .map(item => ({
            ...item,
            formattedDate: format(parseISO(item.date), 'MMM d'),
            total: item.Personal + item.Company
        }))

    // Platform Breakdown (Pie)
    const platformBreakdown = metrics.reduce((acc, curr) => {
        acc[curr.platform] = (acc[curr.platform] || 0) + curr.impressions
        return acc
    }, {} as Record<string, number>)

    const pieChartData = Object.entries(platformBreakdown).map(([name, value]) => ({ name, value }))
    const personalShare = platformBreakdown['Personal'] && platformBreakdown['Company']
        ? Math.round((platformBreakdown['Personal'] / (platformBreakdown['Personal'] + platformBreakdown['Company'])) * 100)
        : 0

    return (
        <div className="space-y-8">

            {/* KPI Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <KPICard
                    title="Total Reach"
                    value={totalReach}
                    icon={Users}
                    trend="up"
                    trendLabel="+12.5%"
                    isPrimary
                    delay={0}
                />
                <KPICard
                    title="Avg. Engagement"
                    value={`${avgEngagementRate}%`}
                    icon={Zap}
                    subtitle={`${totalEngagement.toLocaleString()} interactions`}
                    delay={0.1}
                />
                <KPICard
                    title="Follower Growth"
                    value={`+${newFollowers}`}
                    icon={TrendingUp}
                    trend="up"
                    trendLabel="Strong Q1"
                    delay={0.2}
                />
                <KPICard
                    title="Content Pieces"
                    value={metrics.length}
                    icon={BarChart2}
                    subtitle="Data points tracked"
                    delay={0.3}
                />
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Main Area Chart */}
                <div
                    className="lg:col-span-2 glass-card rounded-2xl p-6"
                >
                    <div className="mb-6">
                        <h3 className="text-xl font-serif font-bold text-silver-100">Reach Performance</h3>
                        <p className="text-sm text-silver-500 mt-1">Impressions trend over time</p>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={areaChartData} margin={{ top: 10, right: 10, bottom: 0, left: 0 }}>
                                <defs>
                                    <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={COLORS.gold} stopOpacity={0.4} />
                                        <stop offset="100%" stopColor={COLORS.gold} stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="silverGradient" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor={COLORS.silver} stopOpacity={0.3} />
                                        <stop offset="100%" stopColor={COLORS.silver} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid
                                    strokeDasharray="3 3"
                                    stroke={COLORS.slateDark}
                                    vertical={false}
                                />
                                <XAxis
                                    dataKey="formattedDate"
                                    stroke={COLORS.silver}
                                    fontSize={11}
                                    tickLine={false}
                                    axisLine={false}
                                    dy={10}
                                />
                                <YAxis
                                    stroke={COLORS.silver}
                                    fontSize={11}
                                    tickLine={false}
                                    axisLine={false}
                                    tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                                    dx={-10}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Legend
                                    wrapperStyle={{ paddingTop: '20px' }}
                                    formatter={(value) => <span className="text-silver-400 text-sm">{value}</span>}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="Personal"
                                    stroke={COLORS.gold}
                                    strokeWidth={3}
                                    fill="url(#goldGradient)"
                                    dot={{ fill: COLORS.gold, strokeWidth: 0, r: 4 }}
                                    activeDot={{ r: 6, stroke: COLORS.goldLight, strokeWidth: 2 }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="Company"
                                    stroke={COLORS.silver}
                                    strokeWidth={2}
                                    fill="url(#silverGradient)"
                                    dot={{ fill: COLORS.silver, strokeWidth: 0, r: 3 }}
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Donut Chart */}
                <div
                    className="glass-card rounded-2xl p-6 flex flex-col"
                >
                    <div className="mb-4">
                        <h3 className="text-xl font-serif font-bold text-silver-100">Audience Split</h3>
                        <p className="text-sm text-silver-500 mt-1">Traffic distribution</p>
                    </div>
                    <div className="h-[280px] w-full flex-1 relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <RePieChart>
                                <Pie
                                    data={pieChartData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={70}
                                    outerRadius={100}
                                    paddingAngle={4}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {pieChartData.map((entry, index) => (
                                        <Cell
                                            key={`cell-${index}`}
                                            fill={entry.name === 'Personal' ? COLORS.gold : COLORS.slate}
                                            className="transition-all duration-300 hover:opacity-80"
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                            </RePieChart>
                        </ResponsiveContainer>

                        {/* Center Stats */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                            <span className="block text-3xl font-serif font-bold text-gradient-gold">
                                {personalShare}%
                            </span>
                            <span className="text-[10px] text-silver-500 uppercase tracking-widest">
                                Personal
                            </span>
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="flex justify-center gap-6 pt-4 border-t border-white/5 mt-auto">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-gold-500" />
                            <span className="text-xs text-silver-400">Personal</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-slate-600" />
                            <span className="text-xs text-silver-400">Company</span>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
