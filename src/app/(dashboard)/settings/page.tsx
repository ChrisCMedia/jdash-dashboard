import { SettingsForm } from '@/components/dashboard/settings-form'
import { getSettings } from '@/lib/data-service'
import { Cog } from 'lucide-react'

export const dynamic = 'force-dynamic'

export default async function SettingsPage() {
    const settings = await getSettings()

    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-gold-500/10 pb-6">
                <div>
                    <h1 className="text-3xl font-serif font-bold text-gradient-gold flex items-center gap-3">
                        <Cog className="w-8 h-8 text-gold-500" />
                        Settings
                    </h1>
                    <p className="text-silver-400 mt-2">Manage your cockpit preferences and branding.</p>
                </div>
            </div>

            <SettingsForm initialSettings={settings} />
        </div>
    )
}
