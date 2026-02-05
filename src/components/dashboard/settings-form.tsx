'use client'

import { useState } from 'react'
import { Settings } from '@/types'
import { updateSettings } from '@/lib/data-service'
import { User, Bell, Globe, Layout, Save, Check, Shield } from 'lucide-react'
import { cn } from '@/lib/utils'

interface SettingsFormProps {
    initialSettings: Settings
}

export function SettingsForm({ initialSettings }: SettingsFormProps) {
    const [settings, setSettings] = useState<Settings>(initialSettings)
    const [isSaving, setIsSaving] = useState(false)
    const [showSaved, setShowSaved] = useState(false)
    const [activeTab, setActiveTab] = useState<'general' | 'content' | 'notifications'>('general')

    const handleChange = (key: keyof Settings, value: any) => {
        setSettings(prev => ({ ...prev, [key]: value }))
    }

    const handleSave = async () => {
        setIsSaving(true)
        try {
            await updateSettings(settings)
            setShowSaved(true)
            setTimeout(() => setShowSaved(false), 2000)
        } catch (error) {
            console.error('Failed to save settings', error)
        } finally {
            setIsSaving(false)
        }
    }

    const tabs = [
        { id: 'general' as const, label: 'General & Branding', icon: Layout },
        { id: 'content' as const, label: 'Content Configuration', icon: Globe },
        { id: 'notifications' as const, label: 'Preferences', icon: Bell },
    ]

    return (
        <div className="grid grid-cols-12 gap-8">
            {/* Settings Sidebar Navigation */}
            <div className="col-span-12 lg:col-span-3 space-y-2">
                {tabs.map((tab, index) => (
                    <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id)}
                        className={cn(
                            "w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-sm font-medium transition-all duration-300 text-left group",
                            activeTab === tab.id
                                ? "glass-card text-gold-400"
                                : "text-silver-400 hover:bg-white/5 hover:text-silver-200"
                        )}
                    >
                        <tab.icon className={cn(
                            "w-4 h-4 transition-colors",
                            activeTab === tab.id ? "text-gold-400" : "text-silver-500 group-hover:text-silver-300"
                        )} />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* Main Content Area */}
            <div className="col-span-12 lg:col-span-9 space-y-6">

                {/* General Tab */}
                {activeTab === 'general' && (
                    <div className="glass-card rounded-2xl p-8 space-y-8">
                        <div>
                            <h2 className="text-xl font-serif font-bold text-silver-100 flex items-center gap-2">
                                <Layout className="w-5 h-5 text-gold-500" /> Branding
                            </h2>
                            <p className="text-silver-500 text-sm mt-1">Your cockpit identity is managed centrally.</p>
                        </div>

                        <div className="space-y-6">
                            {/* Logo Display (Hardcoded) */}
                            <div className="space-y-3">
                                <label className="text-sm font-medium text-silver-300">Application Logo</label>
                                <div className="flex items-center gap-6 p-4 glass-subtle rounded-xl">
                                    <div className="relative">
                                        <img
                                            src="/Logo.png"
                                            alt="YT Content Cockpit Logo"
                                            width={64}
                                            height={64}
                                            className="rounded-xl drop-shadow-[0_4px_16px_rgba(212,175,55,0.3)]"
                                        />
                                        <div className="absolute inset-0 bg-gold-500/10 rounded-xl blur-xl -z-10" />
                                    </div>
                                    <div>
                                        <p className="text-sm text-silver-200 font-medium">YOUR TIMES Logo</p>
                                        <p className="text-xs text-silver-500 mt-1">Embedded in application. Contact support to update.</p>
                                    </div>
                                </div>
                            </div>

                            {/* Cockpit Title */}
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-silver-300">Cockpit Title</label>
                                <input
                                    type="text"
                                    value={settings.appTitle}
                                    onChange={(e) => handleChange('appTitle', e.target.value)}
                                    className="w-full glass-subtle rounded-xl px-4 py-3 text-silver-200 border border-white/5 focus:border-gold-500/30 outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                                />
                            </div>
                        </div>

                        <div className="pt-8 border-t border-white/5">
                            <div className="mb-6">
                                <h2 className="text-xl font-serif font-bold text-silver-100 flex items-center gap-2">
                                    <User className="w-5 h-5 text-gold-500" /> Team Access
                                </h2>
                                <p className="text-silver-500 text-sm mt-1">Authorized users for this cockpit.</p>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-4 glass-subtle rounded-xl hover:bg-white/5 transition-colors duration-300 group">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gold-500 to-gold-700 flex items-center justify-center text-slate-950 font-bold text-sm">
                                                CM
                                            </div>
                                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-silver-200 flex items-center gap-2">
                                                Christopher
                                                <Shield className="w-3.5 h-3.5 text-gold-500" />
                                            </div>
                                            <div className="text-xs text-silver-500">Admin • Full Access</div>
                                        </div>
                                    </div>
                                    <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full font-medium">Active</span>
                                </div>

                                <div className="flex items-center justify-between p-4 glass-subtle rounded-xl hover:bg-white/5 transition-colors duration-300 group">
                                    <div className="flex items-center gap-4">
                                        <div className="relative">
                                            <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-silver-300 font-bold text-sm">
                                                JL
                                            </div>
                                            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-emerald-500 rounded-full border-2 border-slate-950" />
                                        </div>
                                        <div>
                                            <div className="text-sm font-medium text-silver-200">Judith Lenz</div>
                                            <div className="text-xs text-silver-500">Client • Approval Only</div>
                                        </div>
                                    </div>
                                    <span className="text-xs text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-full font-medium">Active</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Content Tab */}
                {activeTab === 'content' && (
                    <div className="glass-card rounded-2xl p-8 space-y-8">
                        <div>
                            <h2 className="text-xl font-serif font-bold text-silver-100 flex items-center gap-2">
                                <Globe className="w-5 h-5 text-gold-500" /> Content Sources
                            </h2>
                            <p className="text-silver-500 text-sm mt-1">Configure your LinkedIn publishing destinations.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-silver-300">Judith's Personal LinkedIn</label>
                                <input
                                    type="text"
                                    value={settings.linkedinProfileUrl}
                                    onChange={(e) => handleChange('linkedinProfileUrl', e.target.value)}
                                    className="w-full glass-subtle rounded-xl px-4 py-3 text-silver-200 border border-white/5 focus:border-gold-500/30 outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                                    placeholder="https://linkedin.com/in/..."
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-medium text-silver-300">YOUR TIMES Company Page</label>
                                <input
                                    type="text"
                                    value={settings.linkedinCompanyUrl}
                                    onChange={(e) => handleChange('linkedinCompanyUrl', e.target.value)}
                                    className="w-full glass-subtle rounded-xl px-4 py-3 text-silver-200 border border-white/5 focus:border-gold-500/30 outline-none transition-all duration-300 focus:shadow-[0_0_20px_rgba(212,175,55,0.1)]"
                                    placeholder="https://linkedin.com/company/..."
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Notifications Tab */}
                {activeTab === 'notifications' && (
                    <div className="glass-card rounded-2xl p-8 space-y-8">
                        <div>
                            <h2 className="text-xl font-serif font-bold text-silver-100 flex items-center gap-2">
                                <Bell className="w-5 h-5 text-gold-500" /> Notifications
                            </h2>
                            <p className="text-silver-500 text-sm mt-1">Control your alert preferences.</p>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-4 glass-subtle rounded-xl hover:bg-white/5 transition-colors duration-300">
                                <div>
                                    <div className="text-sm font-medium text-silver-200">Email on Client Feedback</div>
                                    <div className="text-xs text-silver-500 mt-0.5">Receive an email when Judith comments on a draft.</div>
                                </div>
                                <button
                                    onClick={() => handleChange('notifyOnFeedback', !settings.notifyOnFeedback)}
                                    className={cn(
                                        "w-12 h-7 rounded-full transition-all duration-300 relative shadow-inner",
                                        settings.notifyOnFeedback
                                            ? "bg-gradient-to-r from-gold-600 to-gold-500 shadow-gold-500/20"
                                            : "bg-slate-700"
                                    )}
                                >
                                    <span className={cn(
                                        "block w-5 h-5 bg-white rounded-full absolute top-1 transition-all duration-300 shadow-lg",
                                        settings.notifyOnFeedback ? "left-6" : "left-1"
                                    )} />
                                </button>
                            </div>

                            <div className="flex items-center justify-between p-4 glass-subtle rounded-xl hover:bg-white/5 transition-colors duration-300">
                                <div>
                                    <div className="text-sm font-medium text-silver-200">Email on Post Approval</div>
                                    <div className="text-xs text-silver-500 mt-0.5">Get notified when a post status changes to 'Approved'.</div>
                                </div>
                                <button
                                    onClick={() => handleChange('notifyOnApproval', !settings.notifyOnApproval)}
                                    className={cn(
                                        "w-12 h-7 rounded-full transition-all duration-300 relative shadow-inner",
                                        settings.notifyOnApproval
                                            ? "bg-gradient-to-r from-gold-600 to-gold-500 shadow-gold-500/20"
                                            : "bg-slate-700"
                                    )}
                                >
                                    <span className={cn(
                                        "block w-5 h-5 bg-white rounded-full absolute top-1 transition-all duration-300 shadow-lg",
                                        settings.notifyOnApproval ? "left-6" : "left-1"
                                    )} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Global Save Button */}
                <div className="flex justify-end">
                    <button
                        onClick={handleSave}
                        disabled={isSaving}
                        className={cn(
                            "btn-primary flex items-center gap-2 min-w-[140px] justify-center",
                            showSaved && "bg-emerald-500 hover:bg-emerald-500"
                        )}
                    >
                        {isSaving ? (
                            <>
                                <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                                Saving...
                            </>
                        ) : showSaved ? (
                            <>
                                <Check className="w-4 h-4" />
                                Saved!
                            </>
                        ) : (
                            <>
                                <Save className="w-4 h-4" />
                                Save Changes
                            </>
                        )}
                    </button>
                </div>

            </div>
        </div>
    )
}
