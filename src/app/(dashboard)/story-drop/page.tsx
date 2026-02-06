import { StoryDropForm } from "@/components/dashboard/story-drop-form"

export default function StoryDropPage() {
    return (
        <div className="space-y-8 max-w-4xl mx-auto">
            <div className="text-center space-y-4 mb-12">
                <h1 className="text-4xl font-serif font-bold text-gradient-gold">
                    Story Drop
                </h1>
                <p className="text-silver-400 max-w-lg mx-auto leading-relaxed">
                    Have an idea? Drop your raw thoughts, photos, or voice notes here.
                    We'll polish it into a professional post directly in your dashboard.
                </p>
            </div>

            <StoryDropForm />
        </div>
    )
}
