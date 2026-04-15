"use client"

import { useState, useEffect, FormEvent, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  GraduationCap,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Star,
  ArrowRight,
  Shield,
  Clock,
  Users,
  Award,
  FileText,
  Plane,
  BookOpen,
  Building2,
  Globe,
  Briefcase,
  MessageCircle,
  X,
  Menu,
  Sparkles,
  Target,
  HeartHandshake,
  BadgeCheck,
} from "lucide-react"
import { GOOGLE_SHEET_URL } from "@/lib/config"

const WHATSAPP_NUMBER = "918980338855"
const PHONE_NUMBER = "+91 89803 38855"

const EXAM_OPTIONS = ["IELTS", "PTE", "Duolingo", "None"]

function getUrlParams() {
  if (typeof window === "undefined") return {}
  const params = new URLSearchParams(window.location.search)
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
  }
}

export default function GoukLandingPage() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [city, setCity] = useState("")
  const [examTaken, setExamTaken] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showStickyCta, setShowStickyCta] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowStickyCta(window.scrollY > 600)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToForm = useCallback(() => {
    document.getElementById("contact-form")?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const utmParams = getUrlParams()
    const now = new Date()
    const istOffset = 5.5 * 60 * 60 * 1000
    const istTime = new Date(now.getTime() + istOffset)

    // Format as DD/M/YYYY, HH:MM:SS to match existing pages
    const leadCaptureTime = `${istTime.getUTCDate()}/${istTime.getUTCMonth() + 1}/${istTime.getUTCFullYear()}, ${String(istTime.getUTCHours()).padStart(2, "0")}:${String(istTime.getUTCMinutes()).padStart(2, "0")}:${String(istTime.getUTCSeconds()).padStart(2, "0")}`

    // Detect platform: Google Ads if gclid present, else Mobile/Desktop
    const urlSearchParams = new URLSearchParams(window.location.search)
    const hasGclid = urlSearchParams.has("gclid")
    const platform = hasGclid ? "Google Ads" : (/Android|iPhone|iPad/i.test(navigator.userAgent) ? "Mobile" : "Desktop")

    // Conversion type based on traffic source
    const conversionType = utmParams.utm_medium === "cpc" ? "Paid Ad" : "UK Visa Counselling"

    const payload = {
      leadCaptureTime,
      name,
      email,
      phone,
      city,
      landingPage: "gouk.aeoc.in",
      preferredMode: "N/A",
      preferredCountry: "United Kingdom",
      languageTestGiven: examTaken && examTaken !== "None" ? "Yes" : "No",
      languageTestName: examTaken && examTaken !== "None" ? examTaken : "N/A",
      platform,
      conversionType,
      campaignName: utmParams.utm_campaign || "N/A",
      utmSource: utmParams.utm_source || "N/A",
      utmMedium: utmParams.utm_medium || "N/A",
      utmContent: utmParams.utm_content || "N/A",
      utmTerm: utmParams.utm_term || "N/A",
      pageUrl: window.location.href,
      timestamp: now.toISOString(),
    }

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      // Google Ads conversion
      if (typeof window !== "undefined" && (window as any).gtag) {
        ;(window as any).gtag("event", "conversion", {
          send_to: "AW-11451485153/uk_visa_lead",
        })
      }

      setIsSubmitted(true)
      setName("")
      setEmail("")
      setPhone("")
      setCity("")
      setExamTaken("")
    } catch (error) {
      console.error("Form submission error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const stats = [
    { value: "97%", label: "Visa Success Rate" },
    { value: "1200+", label: "UK University Tie-ups" },
    { value: "5000+", label: "Students Guided" },
    { value: "4.9", label: "Google Rating" },
    { value: "4.8", label: "Facebook Rating" },
  ]

  const whyStudyUK = [
    {
      icon: <Award className="w-8 h-8" />,
      title: "Globally Recognized Degrees",
      description: "UK degrees are respected by employers and institutions worldwide, giving you a competitive edge in the global job market.",
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "1-Year Master's Programs",
      description: "Complete your postgraduate degree in just 12 months \u2014 saving time and money compared to 2-year programs elsewhere.",
    },
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "2-Year Post-Study Work Visa",
      description: "The Graduate Route visa lets you stay and work in the UK for 2 years after completing your degree.",
    },
    {
      icon: <Building2 className="w-8 h-8" />,
      title: "Part-Time Work Allowed",
      description: "Work up to 20 hours per week during term time and full-time during holidays to support your living expenses.",
    },
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "Scholarships Available",
      description: "Access a wide range of scholarships including Chevening, Commonwealth, and university-specific funding opportunities.",
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "Shorter Course Duration",
      description: "Undergraduate degrees take 3 years instead of 4, meaning you enter the workforce sooner and with less student debt.",
    },
  ]

  const whyAEOC = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "Personalized University Shortlisting",
      description: "We match your profile, budget, and career goals to the best-fit UK universities \u2014 no generic recommendations.",
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "SOP & Document Guidance",
      description: "Expert help crafting your Statement of Purpose, LORs, and all application documents that make your profile stand out.",
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Complete Visa Checklist & Filing",
      description: "End-to-end visa documentation support with a thorough checklist so nothing is missed in your application.",
    },
    {
      icon: <HeartHandshake className="w-8 h-8" />,
      title: "Transparent Process",
      description: "No hidden charges, no false promises. You'll know exactly what to expect at every step of your journey.",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Dedicated Counsellor",
      description: "A single point of contact who knows your case inside-out and is available whenever you need guidance.",
    },
    {
      icon: <BadgeCheck className="w-8 h-8" />,
      title: "97% Visa Success Rate",
      description: "Our track record speaks for itself \u2014 97 out of 100 students we guide receive their UK student visa.",
    },
  ]

  const services = [
    { icon: <MessageCircle className="w-6 h-6" />, title: "Free Consultation", description: "One-on-one expert guidance on UK study options" },
    { icon: <Building2 className="w-6 h-6" />, title: "University Selection", description: "Personalized shortlist based on your profile" },
    { icon: <FileText className="w-6 h-6" />, title: "SOP Guidance", description: "Compelling statements that get you noticed" },
    { icon: <Users className="w-6 h-6" />, title: "Interview Preparation", description: "Mock interviews and confidence building" },
    { icon: <Shield className="w-6 h-6" />, title: "Visa Application", description: "Complete documentation and filing support" },
    { icon: <Plane className="w-6 h-6" />, title: "Air Tickets & Forex", description: "Travel arrangements and currency exchange" },
    { icon: <Globe className="w-6 h-6" />, title: "Pre & Post Landing", description: "Accommodation and settling-in assistance" },
    { icon: <BookOpen className="w-6 h-6" />, title: "IELTS Coaching", description: "Expert preparation for English proficiency tests" },
  ]

  const journey = [
    { step: "01", title: "Fill the Form", description: "Share your basic details with us" },
    { step: "02", title: "Free Counselling", description: "Get expert guidance on your UK options" },
    { step: "03", title: "University Shortlist", description: "We match you with the best universities" },
    { step: "04", title: "Apply & Get Offer", description: "We handle your complete application" },
    { step: "05", title: "Visa Filing", description: "End-to-end visa documentation support" },
    { step: "06", title: "Fly to the UK", description: "Pre-departure briefing and travel support" },
  ]

  const testimonials = [
    {
      name: "Priya Patel",
      university: "University of Birmingham",
      text: "AEOC made my UK dream come true! From university selection to visa filing, they handled everything. I'm now studying at Birmingham and couldn't be happier.",
      rating: 5,
    },
    {
      name: "Raj Sharma",
      university: "King's College London",
      text: "The team at AEOC is incredibly knowledgeable. They helped me get into King's College with a scholarship. Their SOP guidance was exceptional.",
      rating: 5,
    },
    {
      name: "Neha Mehta",
      university: "University of Manchester",
      text: "I was confused about the entire process, but AEOC simplified everything. Their visa success rate is real \u2014 I got my visa approved on the first attempt!",
      rating: 5,
    },
  ]

  const universities = [
    "University of Oxford",
    "University of Cambridge",
    "Imperial College London",
    "University College London",
    "Coventry University",
    "University of Hull",
    "University of Greenwich",
    "Aston University",
    "University of East London",
    "University of West London",
    "University of East Anglia",
    "University of Sunderland",
    "University of Roehampton",
  ]

  const faqs = [
    {
      q: "What are the requirements for a UK student visa?",
      a: "You need a confirmed offer from a licensed UK institution (CAS letter), proof of English proficiency (IELTS/PTE/Duolingo), financial documents showing you can cover tuition and living costs, a valid passport, and TB test results. AEOC guides you through every requirement.",
    },
    {
      q: "How much does it cost to study in the UK?",
      a: "Tuition fees vary by university and course \u2014 typically \u00a312,000 to \u00a335,000 per year for international students. Living costs are around \u00a31,023 per month (outside London) or \u00a31,334 per month (London). Many scholarships are available to reduce costs.",
    },
    {
      q: "Can I work while studying in the UK?",
      a: "Yes! On a Tier 4 student visa, you can work up to 20 hours per week during term time and full-time during holidays. After graduation, the Graduate Route visa allows 2 years of unrestricted work.",
    },
    {
      q: "What English test scores are accepted?",
      a: "Most UK universities accept IELTS (typically 6.0-6.5), PTE Academic (typically 54-65), and many now accept Duolingo English Test (typically 105-115). Score requirements vary by university and course level.",
    },
    {
      q: "When should I start my UK university application?",
      a: "We recommend starting 6-8 months before your intended intake. UK universities have January, May, and September intakes. Starting early gives you the best chance at scholarships and preferred courses.",
    },
  ]

  const ContactForm = ({ id, variant = "hero" }: { id?: string; variant?: "hero" | "section" }) => (
    <div id={id} className={`w-full max-w-md mx-auto ${variant === "hero" ? "" : "max-w-lg"}`}>
      <AnimatePresence mode="wait">
        {isSubmitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl p-8 shadow-xl text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Thank You!</h3>
            <p className="text-gray-600 mb-4">
              Our UK education expert will contact you within 24 hours.
            </p>
            <button
              onClick={() => setIsSubmitted(false)}
              className="text-primary underline text-sm"
            >
              Submit another enquiry
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-xl space-y-4"
          >
            <div className="text-center mb-2">
              <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
                <Sparkles className="w-3.5 h-3.5" />
                100% FREE Counselling
              </span>
              <h3 className="text-xl font-bold text-gray-900">Get Free UK Counselling</h3>
              <p className="text-sm text-gray-500 mt-1">Expert guidance for your UK study journey</p>
            </div>

            <div>
              <input
                type="text"
                placeholder="Full Name *"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div>
              <input
                type="email"
                placeholder="Email Address *"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div>
              <input
                type="tel"
                placeholder="WhatsApp No. *"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>
            <div>
              <input
                type="text"
                placeholder="City *"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
              />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-700 mb-2">English Exam Taken</p>
              <div className="grid grid-cols-2 gap-2">
                {EXAM_OPTIONS.map((exam) => (
                  <label
                    key={exam}
                    className={`flex items-center justify-center px-3 py-2.5 border rounded-xl text-sm cursor-pointer transition-all ${
                      examTaken === exam
                        ? "border-primary bg-primary/5 text-primary font-medium"
                        : "border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="examTaken"
                      value={exam}
                      checked={examTaken === exam}
                      onChange={(e) => setExamTaken(e.target.value)}
                      className="sr-only"
                    />
                    {exam}
                  </label>
                ))}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 text-sm disabled:opacity-50"
            >
              {isSubmitting ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Get Free UK Counselling
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <p className="text-xs text-center text-gray-400">
              By submitting, you agree to receive communication from AEOC
            </p>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <GraduationCap className="w-8 h-8 text-primary" />
              <div>
                <span className="font-bold text-lg text-gray-900">AEOC</span>
                <span className="hidden sm:inline text-xs text-gray-500 ml-1">UK Admissions</span>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-6 text-sm">
              <a href="#why-uk" className="text-gray-600 hover:text-primary transition-colors">Why UK</a>
              <a href="#services" className="text-gray-600 hover:text-primary transition-colors">Services</a>
              <a href="#journey" className="text-gray-600 hover:text-primary transition-colors">Process</a>
              <a href="#universities" className="text-gray-600 hover:text-primary transition-colors">Universities</a>
              <a href="#faq" className="text-gray-600 hover:text-primary transition-colors">FAQs</a>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`tel:${PHONE_NUMBER}`}
                className="hidden sm:flex items-center gap-1.5 text-sm text-gray-600 hover:text-primary"
              >
                <Phone className="w-4 h-4" />
                {PHONE_NUMBER}
              </a>
              <button
                onClick={scrollToForm}
                className="bg-primary text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-all"
              >
                Free Counselling
              </button>
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden border-t border-gray-100 py-4 space-y-3"
              >
                <a href="#why-uk" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-600 hover:text-primary">Why UK</a>
                <a href="#services" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-600 hover:text-primary">Services</a>
                <a href="#journey" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-600 hover:text-primary">Process</a>
                <a href="#universities" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-600 hover:text-primary">Universities</a>
                <a href="#faq" onClick={() => setMobileMenuOpen(false)} className="block text-sm text-gray-600 hover:text-primary">FAQs</a>
                <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-1.5 text-sm text-primary font-medium">
                  <Phone className="w-4 h-4" /> {PHONE_NUMBER}
                </a>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 md:pt-28 md:pb-24 bg-gradient-to-br from-primary/5 via-white to-accent/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.08),transparent_50%)]" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="flex flex-wrap gap-2 mb-6">
                <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full">
                  <Sparkles className="w-3.5 h-3.5" />
                  UK January, May & September Intake Open
                </span>
                <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-semibold px-3 py-1.5 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  1200+ UK University Tie-ups
                </span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-4">
                Your UK Study Dream{" "}
                <span className="text-primary">Starts Here</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-600 mb-8 leading-relaxed">
                Admission, Visa & Guidance Done Right \u2014 From Gujarat&apos;s Most Trusted UK Education Consultants
              </p>

              <div className="flex flex-wrap gap-3 mb-8">
                {["Complete Visa Support", "5000+ Students Guided", "Free Expert Counselling"].map((badge) => (
                  <span key={badge} className="flex items-center gap-1.5 text-sm text-gray-600 bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
                    {badge}
                  </span>
                ))}
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.value}</div>
                    <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <ContactForm id="contact-form" variant="hero" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Why Study in UK */}
      <section id="why-uk" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <Globe className="w-3.5 h-3.5" />
              Why United Kingdom
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Study in the <span className="text-primary">UK</span>?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              The UK offers world-class education, diverse culture, and incredible career opportunities for international students.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyStudyUK.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 hover:shadow-lg hover:bg-white transition-all border border-gray-100"
              >
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose AEOC */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-1.5 bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-4">
              <Shield className="w-3.5 h-3.5" />
              Why AEOC
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-primary">AEOC</span>?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Gujarat&apos;s most trusted education consultants with a proven track record of transforming UK study dreams into reality.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyAEOC.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="w-14 h-14 bg-accent/10 rounded-xl flex items-center justify-center text-accent mb-4">
                  {item.icon}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <section id="services" className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-primary">Services</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              End-to-end support from your first enquiry to landing in the UK.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="bg-gray-50 rounded-xl p-5 text-center hover:shadow-md hover:bg-white transition-all border border-gray-100"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mx-auto mb-3">
                  {service.icon}
                </div>
                <h3 className="font-semibold text-sm text-gray-900 mb-1">{service.title}</h3>
                <p className="text-xs text-gray-500">{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Journey Steps */}
      <section id="journey" className="py-16 md:py-24 bg-gradient-to-b from-primary/5 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Your Journey to the <span className="text-primary">UK</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Six simple steps from enquiry to flying out \u2014 we handle the complexity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {journey.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 relative overflow-hidden"
              >
                <span className="absolute top-4 right-4 text-5xl font-bold text-primary/10">
                  {item.step}
                </span>
                <div className="w-10 h-10 bg-primary text-white rounded-lg flex items-center justify-center text-sm font-bold mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Free Counselling CTA */}
      <section className="py-16 md:py-20 bg-primary">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Start Your UK Journey Today
            </h2>
            <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
              Get free, no-obligation counselling from our UK education experts. We&apos;ve helped 5000+ students achieve their study abroad dreams.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={scrollToForm}
                className="bg-white text-primary font-semibold px-8 py-3.5 rounded-xl hover:bg-gray-50 transition-all flex items-center justify-center gap-2"
              >
                Get Free Counselling <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=Hi%20AEOC,%20I%20am%20interested%20in%20studying%20in%20the%20UK.%20Please%20guide%20me.`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-green-500 text-white font-semibold px-8 py-3.5 rounded-xl hover:bg-green-600 transition-all flex items-center justify-center gap-2"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Student <span className="text-primary">Success Stories</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-gray-50 rounded-2xl p-6 border border-gray-100"
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">&ldquo;{t.text}&rdquo;</p>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-xs text-primary">{t.university}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Universities */}
      <section id="universities" className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Partner <span className="text-primary">Universities</span>
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We work with 1200+ UK universities. Here are some of our key partners.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {universities.map((uni, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
                className="bg-white rounded-xl p-4 text-center shadow-sm border border-gray-100 hover:shadow-md transition-all"
              >
                <Building2 className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-xs font-medium text-gray-700">{uni}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Early Application CTA */}
      <section className="py-12 bg-accent/10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3">
            Apply Early for Better Scholarships & Course Availability
          </h3>
          <p className="text-gray-600 mb-6">
            January, May & September intakes are filling fast. Don&apos;t miss your chance.
          </p>
          <button
            onClick={scrollToForm}
            className="bg-primary text-white font-semibold px-8 py-3 rounded-xl hover:bg-primary/90 transition-all inline-flex items-center gap-2"
          >
            Apply Now \u2014 It&apos;s Free <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="py-16 md:py-24 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked <span className="text-primary">Questions</span>
            </h2>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="border border-gray-200 rounded-xl overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-medium text-gray-900 text-sm pr-4">{faq.q}</span>
                  {openFaq === i ? (
                    <ChevronUp className="w-5 h-5 text-primary shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                  )}
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 text-sm text-gray-600 leading-relaxed">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <GraduationCap className="w-7 h-7 text-primary" />
                <span className="font-bold text-lg">AEOC</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Apex Education & Overseas Consultant \u2014 Gujarat&apos;s trusted partner for UK student visa and admission guidance.
              </p>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Contact Us</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-2 hover:text-white transition-colors">
                  <Phone className="w-4 h-4" /> {PHONE_NUMBER}
                </a>
                <a
                  href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=Hi%20AEOC,%20I%20am%20interested%20in%20studying%20in%20the%20UK.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 hover:text-white transition-colors"
                >
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
                <a href="mailto:hello@aeoc.in" className="flex items-center gap-2 hover:text-white transition-colors">
                  <Mail className="w-4 h-4" /> hello@aeoc.in
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-semibold mb-4">Our Offices</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>Vallabh Vidyanagar, Gujarat</span>
                </div>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                  <span>Nadiad, Gujarat</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-xs text-gray-500">
            &copy; {new Date().getFullYear()} AEOC \u2014 Apex Education & Overseas Consultant. All rights reserved.
          </div>
        </div>
      </footer>

      {/* WhatsApp Floating Button */}
      <a
        href={`https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=Hi%20AEOC,%20I%20am%20interested%20in%20studying%20in%20the%20UK.%20Please%20guide%20me.`}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-40 bg-green-500 text-white p-3.5 rounded-full shadow-lg hover:bg-green-600 transition-all hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="w-6 h-6" />
      </a>

      {/* Sticky Mobile CTA */}
      <AnimatePresence>
        {showStickyCta && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            className="fixed bottom-0 left-0 right-0 md:hidden z-50 bg-white border-t border-gray-200 p-3 flex gap-2"
          >
            <button
              onClick={scrollToForm}
              className="flex-1 bg-primary text-white font-semibold py-3 rounded-xl text-sm"
            >
              Get Free Counselling
            </button>
            <a
              href={`tel:${PHONE_NUMBER}`}
              className="bg-gray-100 text-gray-700 p-3 rounded-xl"
            >
              <Phone className="w-5 h-5" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
