import { HeroSection } from "@/components/landing/hero-section"
import { FeatureSection } from "@/components/landing/feature-section"
import { TestimonialSection } from "@/components/landing/testimonial-section"
import { CTASection } from "@/components/landing/cta-section"
import { Navbar } from "@/components/landing/navbar"
import { Footer } from "@/components/landing/footer"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeatureSection />
        <TestimonialSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

