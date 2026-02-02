import { Navbar } from '@/components/layout/navbar'

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <div className="min-h-screen bg-slate-900 text-slate-50 selection:bg-gold-500/30">
            <Navbar />
            <main className="max-w-[1600px] mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    )
}
