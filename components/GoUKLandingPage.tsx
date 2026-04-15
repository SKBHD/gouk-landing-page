"use client"

import { useState, useEffect, type FormEvent, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Phone,
  MessageCircle,
  CheckCircle,
  Star,
  ArrowRight,
  AlertCircle,
  Sparkles,
  ChevronDown,
  GraduationCap,
  Shield,
  MapPin,
  Globe,
  Plane,
  Building,
  FileCheck,
  Briefcase,
  DollarSign,
  BookOpen,
  Clock,
  Award,
  Users,
  Laptop,
  Zap,
  Target,
  Heart,
  Play,
  BadgeCheck,
  HandshakeIcon,
  TrendingUp,
} from "lucide-react"
import { GOOGLE_SHEET_URL } from "@/lib/config"

// ── Config ──────────────────────────────────────────────────
const WHATSAPP_NUMBER = "918980338855"
const PHONE_NUMBER = "+91 89803 38855"
const EMAIL = "hello@aeoc.in"
const LANDING_PAGE = "gouk.aeoc.in"
const PREFERRED_COUNTRY = "United Kingdom"
const CONVERSION_EVENT = "AW-11451485153/uk_visa_lead"

const FORM_MODE: "full" | "short" = "full"
const EXAM_OPTIONS = ["IELTS", "PTE", "Duolingo", "None Yet"]

// ── URL Params ──────────────────────────────────────────────
function getUrlParams(): Record<string, string> {
  if (typeof window === "undefined") return {}
  const params = new URLSearchParams(window.location.search)
  return {
    utm_source: params.get("utm_source") || "",
    utm_medium: params.get("utm_medium") || "",
    utm_campaign: params.get("utm_campaign") || "",
    utm_content: params.get("utm_content") || "",
    utm_term: params.get("utm_term") || "",
    gclid: params.get("gclid") || "",
    fbclid: params.get("fbclid") || "",
  }
}

// ── Data ────────────────────────────────────────────────────
// #5 & #10: Updated stats
const stats = [
  { value: "5,000+", label: "Students Guided" },
  { value: "97%", label: "Visa Success Rate" },
  { value: "1200+", label: "University Tie-ups" },
  { value: "4.8/5", label: "Google Rating (500+ reviews)" },
]

const journeySteps = [
  { step: "01", title: "Free Counselling", desc: "Understand your profile, goals, and best-fit UK universities", icon: BookOpen },
  { step: "02", title: "University Selection", desc: "Choose from 1200+ partner universities based on your budget & career goals", icon: GraduationCap },
  { step: "03", title: "Application & SOP", desc: "Expert-crafted SOP, LOR, and complete application support", icon: FileCheck },
  { step: "04", title: "Visa Filing", desc: "97% success rate — we handle CAS, financial docs, and interview prep", icon: Shield },
  { step: "05", title: "Pre-Departure", desc: "Accommodation, travel, forex, and airport guidance", icon: Plane },
]

const whyUK = [
  { icon: GraduationCap, title: "World-Class Education", desc: "Home to Oxford, Cambridge, Imperial & UCL — 4 of the global top 10" },
  { icon: Clock, title: "1-Year Masters", desc: "Save time & money with shorter UK postgraduate programmes" },
  { icon: Briefcase, title: "2-Year Post-Study Work Visa", desc: "Graduate Route visa lets you work in the UK after your degree" },
  { icon: DollarSign, title: "Scholarships Available", desc: "Chevening, Commonwealth, and university-specific funding" },
  { icon: Globe, title: "Globally Recognised Degrees", desc: "UK qualifications are respected by employers worldwide" },
  { icon: Users, title: "Multicultural Experience", desc: "Study alongside students from 150+ countries" },
]

// #3: Why AEOC differentiators
const whyAEOC = [
  { icon: Target, title: "Profile-Based University Shortlisting", desc: "We match you to universities based on your academic background, budget, and career goals — not just any university." },
  { icon: Users, title: "Dedicated Visa Expert for Every Student", desc: "You get a personal counsellor who knows your file inside-out and guides you through every step." },
  { icon: FileCheck, title: "Complete SOP + Documentation Support", desc: "Our experts craft compelling Statements of Purpose and ensure every document meets UK visa standards." },
  { icon: Shield, title: "End-to-End Guidance Till Visa Approval", desc: "We don't stop at admission. We're with you through the entire visa process until you land in the UK." },
  { icon: HandshakeIcon, title: "Transparent Process — No Fake Promises", desc: "Honest eligibility assessment. If you're not ready, we'll tell you — and help you get there." },
  { icon: TrendingUp, title: "97% Visa Success Track Record", desc: "Our numbers speak. 97% of students who complete our process get their UK student visa approved." },
]

// #6: What you'll achieve outcomes
const outcomes = [
  "Get admission in top UK universities matching your profile",
  "Increase visa approval chances with our 97% success system",
  "Get IELTS / PTE preparation support and score targets",
  "Access scholarships that can reduce your costs by up to 50%",
  "Work 20 hrs/week while studying + 2 years after graduation",
  "Complete SOP, CAS, and visa documentation handled for you",
]

const universities = [
  { name: "University of Oxford", tier: "Russell Group" },
  { name: "University of Cambridge", tier: "Russell Group" },
  { name: "Imperial College London", tier: "Russell Group" },
  { name: "University College London", tier: "Russell Group" },
  { name: "Coventry University London", tier: "Popular Choice" },
  { name: "University of Hull", tier: "Popular Choice" },
  { name: "University of Greenwich", tier: "Popular Choice" },
  { name: "Aston University London", tier: "Popular Choice" },
  { name: "University of East London", tier: "Popular Choice" },
  { name: "University of West London", tier: "Popular Choice" },
  { name: "University of East Anglia", tier: "Russell Group" },
  { name: "University of Sunderland London", tier: "Popular Choice" },
  { name: "University of Roehampton London", tier: "Popular Choice" },
]

// #4: Updated testimonials with achievement tags + dates
const testimonials = [
  { name: "Priya Patel", university: "University of Birmingham", text: "AEOC made my UK dream a reality! From SOP writing to visa interview prep, they were with me at every step. Now studying in Birmingham!", rating: 5, initial: "P", achievement: "Visa Approved in 15 Days", date: "Jan 2025" },
  { name: "Raj Sharma", university: "King's College London", text: "Got my student visa approved in just 2 weeks! The team's knowledge of UK visa requirements is unmatched.", rating: 5, initial: "R", achievement: "Scholarship Received", date: "Sep 2024" },
  { name: "Neha Mehta", university: "University of Manchester", text: "I was confused about universities, but AEOC helped me find the perfect course within my budget. Highly recommended!", rating: 5, initial: "N", achievement: "3 Offers in 2 Weeks", date: "Sep 2024" },
]

// YouTube Shorts video testimonials
const videoTestimonials = [
  { id: "dKk_T7p0iCc", title: "Student Success Story" },
  { id: "zAC-LgdL22M", title: "Student Success Story" },
]

const faqs = [
  { q: "Who is eligible for a UK student visa?", a: "You need a confirmed offer from a licensed UK institution (CAS letter), proof of English proficiency (IELTS 6.0+ / PTE / Duolingo), financial evidence showing you can cover tuition + living costs, and a valid passport. AEOC guides you through every requirement." },
  { q: "How long does UK visa processing take?", a: "Standard processing takes 3-4 weeks from the date of your biometric appointment. Priority service is available for faster processing. AEOC helps you file a complete application to avoid delays." },
  { q: "Can I work while studying in the UK?", a: "Yes! Student visa holders can work up to 20 hours per week during term time and full-time during holidays. After graduating, the Graduate Route visa allows 2 years of full-time work." },
  { q: "What IELTS score do I need for UK universities?", a: "Most UK universities require IELTS 6.0-6.5 overall (with no band below 5.5). Top universities like Oxford and Cambridge may require 7.0+. Many universities also accept PTE and Duolingo scores." },
  { q: "Does AEOC charge for consultation?", a: "Your initial counselling session is completely FREE. We assess your profile, suggest universities, and explain the complete process at no cost. Our transparent fee structure is discussed only after you decide to proceed." },
  { q: "What is the total cost of studying in the UK?", a: "Tuition ranges from £12,000-£35,000/year depending on the university and course. Living costs are approximately £1,023/month (£1,334 in London). AEOC helps you find scholarships and education loans to make it affordable." },
]

// ── Component ───────────────────────────────────────────────
export function GoUKLandingPage({ formMode = FORM_MODE }: { formMode?: "full" | "short" }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    exam: "",
  })
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formErrors, setFormErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [showStickyCTA, setShowStickyCTA] = useState(false)
  const [utmParams, setUtmParams] = useState<Record<string, string>>({})

  useEffect(() => {
    setUtmParams(getUrlParams())
    const handleScroll = () => setShowStickyCTA(window.scrollY > 600)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToForm = useCallback(() => {
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth" })
  }, [])

  const openWhatsApp = useCallback(() => {
    window.open(
      `https://wa.me/${WHATSAPP_NUMBER}?text=Hi, I want to know more about studying in the UK`,
      "_blank"
    )
  }, [])

  const validateForm = () => {
    const errors: Record<string, string> = {}
    if (!formData.name.trim()) errors.name = "Name is required"
    if (formMode === "full") {
      if (!formData.email.trim()) errors.email = "Email is required"
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = "Enter a valid email"
      if (!formData.city.trim()) errors.city = "City is required"
    }
    if (!formData.phone.trim()) errors.phone = "WhatsApp number is required"
    else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ""))) errors.phone = "Enter a valid 10-digit number"
    setFormErrors(errors)
    return Object.keys(errors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!validateForm()) return
    setIsSubmitting(true)

    const getPlatform = () => {
      if (utmParams.gclid) return "Google Ads"
      if (utmParams.fbclid) return "Facebook/Instagram"
      if (utmParams.utm_source) {
        const s = utmParams.utm_source.toLowerCase()
        if (s.includes("google")) return "Google Ads"
        if (s.includes("facebook") || s.includes("fb")) return "Facebook"
        if (s.includes("instagram") || s.includes("ig")) return "Instagram"
        if (s.includes("whatsapp")) return "WhatsApp"
        return utmParams.utm_source
      }
      return "Direct/Organic"
    }

    const getConversionType = () => {
      if (utmParams.utm_medium) {
        const m = utmParams.utm_medium.toLowerCase()
        if (m.includes("cpc") || m.includes("paid")) return "Paid Ad"
        if (m.includes("social")) return "Social Media"
        if (m.includes("email")) return "Email Campaign"
        if (m.includes("referral")) return "Referral"
      }
      return "Organic Lead"
    }

    const leadData = {
      leadCaptureTime: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      name: formData.name,
      email: formMode === "full" ? formData.email : "N/A",
      phone: formData.phone,
      city: formMode === "full" ? formData.city : "N/A",
      landingPage: LANDING_PAGE,
      preferredCountry: PREFERRED_COUNTRY,
      languageTestGiven: formData.exam && formData.exam !== "None Yet" ? "Yes" : "No",
      languageTestName: formData.exam || "N/A",
      platform: getPlatform(),
      conversionType: getConversionType(),
      campaignName: utmParams.utm_campaign || "N/A",
      utmSource: utmParams.utm_source || "N/A",
      utmMedium: utmParams.utm_medium || "N/A",
      utmContent: utmParams.utm_content || "N/A",
      utmTerm: utmParams.utm_term || "N/A",
      pageUrl: typeof window !== "undefined" ? window.location.href : "",
      timestamp: new Date().toISOString(),
    }

    try {
      await fetch(GOOGLE_SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(leadData),
      })
      if (typeof window !== "undefined" && typeof (window as typeof window & { gtag?: (...args: unknown[]) => void }).gtag === "function") {
        (window as typeof window & { gtag: (...args: unknown[]) => void }).gtag("event", "conversion", { send_to: CONVERSION_EVENT })
      }
      setFormSubmitted(true)
    } catch (error) {
      console.error("Form submission error:", error)
      setFormSubmitted(true)
    } finally {
      setIsSubmitting(false)
    }
  }

  // ── Render ──────────────────────────────────────────────
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white font-sans">
      {/* #1: URGENCY BANNER */}
      <div className="bg-gradient-to-r from-red-600 to-red-700 text-white py-2.5 px-4 text-center text-sm md:text-base font-medium">
        <div className="max-w-7xl mx-auto flex items-center justify-center gap-2 flex-wrap">
          <Zap className="h-4 w-4 text-yellow-300 flex-shrink-0" />
          <span>September 2026 Intake Deadlines Closing Soon — <strong>Limited Seats Available</strong></span>
          <button onClick={scrollToForm} className="ml-2 px-3 py-0.5 bg-white text-red-700 rounded-full text-xs font-bold hover:bg-red-50 transition-colors">
            Check Eligibility
          </button>
        </div>
      </div>

      {/* Mobile Sticky CTA */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 bg-white/95 backdrop-blur-md border-t border-slate-200 shadow-2xl md:hidden"
          >
            <div className="flex gap-3">
              <Button onClick={openWhatsApp} className="flex-1 h-12 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl">
                <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp
              </Button>
              <Button onClick={scrollToForm} className="flex-1 h-12 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold rounded-xl">
                Check Eligibility
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        onClick={openWhatsApp}
        className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-50 w-14 h-14 bg-green-500 hover:bg-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 transition-all hover:scale-110"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle className="h-7 w-7 text-white" fill="white" />
      </motion.button>

      <main>
        {/* ── Header ─────────────────────────────────────── */}
        <header className="relative z-10 py-3 px-4 md:px-8 border-b border-slate-100 bg-white/95 backdrop-blur-md">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AEOC%20Rectangle%20Png-aziVeGFOxou9xUQySzTBzyGZEgnTnr.png"
                alt="AEOC - Apex Education & Overseas Consultant"
                className="h-10 md:h-12 w-auto"
              />
            </div>
            <div className="flex items-center gap-2 md:gap-3">
              <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-1.5 md:gap-2 text-slate-700 hover:text-indigo-600 transition-colors font-medium text-sm md:text-base border border-slate-200 rounded-full px-3 md:px-4 h-10">
                <Phone className="h-4 w-4 text-indigo-600 flex-shrink-0" />
                <span className="hidden sm:inline">{PHONE_NUMBER}</span>
                <span className="sm:hidden">Call</span>
              </a>
              <Button onClick={openWhatsApp} size="sm" className="bg-green-600 hover:bg-green-700 text-white font-semibold h-10 px-3 md:px-4 rounded-full text-sm md:text-base">
                <MessageCircle className="mr-1.5 md:mr-2 h-4 w-4" /> WhatsApp
              </Button>
            </div>
          </div>
        </header>

        {/* ── Hero Section ───────────────────────────────── */}
        <section className="relative overflow-hidden bg-gradient-to-br from-indigo-700 via-violet-700 to-purple-800 text-white">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-white rounded-full blur-3xl" />
            <div className="absolute bottom-20 right-10 w-96 h-96 bg-violet-300 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-400 rounded-full blur-3xl opacity-20" />
          </div>

          <div className="relative z-10 px-4 md:px-8 py-12 md:py-20">
            <div className="max-w-7xl mx-auto">
              <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="mb-10">
                <div className="relative bg-white/10 backdrop-blur-sm p-4 sm:p-5 md:p-7 rounded-2xl border border-white/20 text-center">
                  <p className="text-lg sm:text-xl md:text-2xl lg:text-4xl font-bold leading-relaxed">
                    Increase Your <span className="text-amber-300">UK Student Visa</span> Approval Chances
                  </p>
                </div>
              </motion.div>

              <div className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-center">
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="order-2 lg:order-1">
                  <div className="mb-6 p-4 bg-white/10 backdrop-blur-sm border-l-4 border-amber-400 rounded-r-xl">
                    <p className="text-base md:text-lg text-white/90 font-medium">
                      Get Free Profile Evaluation, University Shortlisting & Visa Strategy Call — all in one place.
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-amber-300">
                      <Sparkles className="w-5 h-5" />
                      <span className="text-sm font-bold">97% Visa Success Rate!</span>
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
                    <Award className="h-4 w-4 text-amber-300" />
                    <span>Gujarat&apos;s Trusted UK Education Consultant</span>
                  </div>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black leading-tight mb-4 md:mb-6">
                    Study in the <span className="text-amber-300">United Kingdom</span> — Your Future Starts Here
                  </h1>

                  <p className="text-base sm:text-lg md:text-xl text-white/80 mb-6 md:mb-8 leading-relaxed">
                    Oxford, Cambridge, Imperial, UCL & 1200+ universities.
                    Complete guidance from admission to visa to pre-departure.
                  </p>

                  <div className="grid grid-cols-2 gap-3 md:gap-4 mb-8">
                    {stats.map((stat, i) => (
                      <div key={i} className="text-center bg-white/10 backdrop-blur-sm rounded-xl p-3 md:p-4">
                        <div className="text-xl sm:text-2xl md:text-3xl font-black text-amber-300">{stat.value}</div>
                        <div className="text-xs md:text-sm text-white/70">{stat.label}</div>
                      </div>
                    ))}
                  </div>

                  {/* #2: Updated CTA text */}
                  <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                    <Button onClick={scrollToForm} size="lg" className="h-12 sm:h-14 px-6 sm:px-8 bg-amber-400 hover:bg-amber-300 text-indigo-900 font-bold text-base sm:text-lg rounded-xl shadow-lg">
                      Check My UK Eligibility <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                    <Button onClick={openWhatsApp} size="lg" variant="outline" className="h-12 sm:h-14 px-6 sm:px-8 border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-base sm:text-lg rounded-xl">
                      <MessageCircle className="mr-2 h-5 w-5" /> WhatsApp Us
                    </Button>
                  </div>

                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="mt-6 inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full shadow-lg shadow-amber-500/30">
                    <Laptop className="w-5 h-5 sm:w-6 sm:h-6 text-indigo-900" />
                    <span className="font-bold text-indigo-900 text-sm sm:text-lg">Online Counselling Available</span>
                  </motion.div>
                </motion.div>

                {/* ── Lead Form ─────────────────────────────── */}
                <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="order-1 lg:order-2" id="lead-form">
                  <div className="bg-white rounded-3xl shadow-2xl p-6 md:p-8">
                    <AnimatePresence mode="wait">
                      {!formSubmitted ? (
                        <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0 }}>
                          <div className="text-center mb-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-3">
                              <Sparkles className="h-4 w-4" /> Free — Zero Charges
                            </div>
                            <h3 className="text-2xl font-bold text-slate-800">Check Your UK Eligibility</h3>
                            {/* #9: Updated response promise */}
                            <p className="text-slate-500 mt-1">Our expert will call you within 2 hours</p>
                          </div>

                          {/* #8: Trust badges */}
                          <div className="flex items-center justify-center gap-4 mb-5 text-xs text-slate-500">
                            <span className="flex items-center gap-1"><Shield className="h-3 w-3 text-green-500" />No Spam</span>
                            <span className="flex items-center gap-1"><BadgeCheck className="h-3 w-3 text-green-500" />100% Free</span>
                            <span className="flex items-center gap-1"><Clock className="h-3 w-3 text-green-500" />Quick Response</span>
                          </div>

                          <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                              <Input placeholder="Your Full Name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className={`h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20 ${formErrors.name ? "border-red-400" : ""}`} />
                              {formErrors.name && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{formErrors.name}</p>}
                            </div>

                            {formMode === "full" && (
                              <div>
                                <Input type="email" placeholder="Email Address" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className={`h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20 ${formErrors.email ? "border-red-400" : ""}`} />
                                {formErrors.email && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{formErrors.email}</p>}
                              </div>
                            )}

                            <div>
                              <Input type="tel" placeholder="WhatsApp Number" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className={`h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20 ${formErrors.phone ? "border-red-400" : ""}`} />
                              {formErrors.phone && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{formErrors.phone}</p>}
                            </div>

                            {formMode === "full" && (
                              <div>
                                <Input placeholder="Your City" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })} className={`h-12 rounded-xl bg-slate-50 border-slate-200 text-slate-800 focus:border-indigo-500 focus:ring-indigo-500/20 ${formErrors.city ? "border-red-400" : ""}`} />
                                {formErrors.city && <p className="text-red-500 text-xs mt-1 flex items-center gap-1"><AlertCircle className="h-3 w-3" />{formErrors.city}</p>}
                              </div>
                            )}

                            {formMode === "full" && (
                              <div>
                                <select value={formData.exam} onChange={(e) => setFormData({ ...formData, exam: e.target.value })} className="w-full h-12 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 px-4 focus:border-indigo-500 focus:ring-indigo-500/20">
                                  <option value="">English Exam Taken?</option>
                                  {EXAM_OPTIONS.map((exam) => (<option key={exam} value={exam}>{exam}</option>))}
                                </select>
                              </div>
                            )}

                            <Button type="submit" disabled={isSubmitting} className="w-full h-14 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-indigo-500/25 disabled:opacity-70">
                              {isSubmitting ? (
                                <><span className="animate-spin mr-2"><svg className="h-5 w-5" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" /><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" /></svg></span>Submitting...</>
                              ) : (
                                <>Check My UK Eligibility <ArrowRight className="ml-2 h-5 w-5" /></>
                              )}
                            </Button>

                            <p className="text-xs text-slate-400 text-center">100% Free | No Spam | Quick Response</p>
                          </form>
                        </motion.div>
                      ) : (
                        <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                          <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-indigo-400 to-violet-500 flex items-center justify-center">
                            <CheckCircle className="h-10 w-10 text-white" />
                          </div>
                          <h3 className="text-2xl font-bold text-slate-800 mb-2">Thank You!</h3>
                          {/* #9: Updated response promise */}
                          <p className="text-slate-600 mb-6">Our UK education expert will call you within 2 hours.</p>
                          <Button onClick={openWhatsApp} className="bg-green-600 hover:bg-green-700 text-white font-bold h-12 px-6 rounded-xl">
                            <MessageCircle className="mr-2 h-5 w-5" /> Chat on WhatsApp Now
                          </Button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Why Study in the UK ────────────────────────── */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-semibold mb-4">
                <Globe className="h-4 w-4" /> Why the UK?
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Why Study in the <span className="text-indigo-600">United Kingdom</span>?
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">The UK offers world-class education, post-study work opportunities, and a globally recognised degree</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyUK.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-lg transition-all group">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center mb-4 shadow-lg shadow-indigo-500/20">
                    <item.icon className="h-7 w-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2 group-hover:text-indigo-600 transition-colors">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* #3: ── Why AEOC Over Others ───────────────────── */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold mb-4">
                <Award className="h-4 w-4" /> Our Difference
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Why Students Choose <span className="text-violet-600">AEOC</span> Over Others
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">Not all consultants are equal. Here&apos;s what makes AEOC Gujarat&apos;s most trusted UK specialist.</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {whyAEOC.map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-violet-200 hover:shadow-lg transition-all">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-violet-100 to-indigo-100 flex items-center justify-center mb-4">
                    <item.icon className="h-6 w-6 text-violet-600" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-2">{item.title}</h3>
                  <p className="text-slate-600 text-sm">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* #6: ── What You'll Achieve ────────────────────── */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                What You&apos;ll <span className="text-indigo-600">Achieve</span> with AEOC
              </h2>
              <p className="text-lg text-slate-600">Real outcomes from real students</p>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {outcomes.map((outcome, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }} className="flex items-start gap-3 p-4 bg-gradient-to-r from-indigo-50 to-violet-50 rounded-xl border border-indigo-100">
                  <CheckCircle className="h-5 w-5 text-indigo-600 flex-shrink-0 mt-0.5" />
                  <span className="text-slate-700 font-medium">{outcome}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Your UK Journey (Timeline) ─────────────────── */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-b from-slate-50 to-white">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-violet-100 text-violet-700 rounded-full text-sm font-semibold mb-4">
                <Plane className="h-4 w-4" /> Your Journey
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Your <span className="text-violet-600">UK Journey</span> with AEOC
              </h2>
              <p className="text-lg text-slate-600">From your first call to landing in the UK — we handle everything</p>
            </div>
            <div className="space-y-6">
              {journeySteps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex gap-4 sm:gap-6 items-start">
                  <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br from-indigo-600 to-violet-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                    <step.icon className="h-7 w-7 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div className="flex-1 bg-white p-4 sm:p-5 rounded-2xl border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all">
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded-full">STEP {step.step}</span>
                      <h3 className="text-base sm:text-lg font-bold text-slate-800">{step.title}</h3>
                    </div>
                    <p className="text-slate-600 text-sm sm:text-base">{step.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Button onClick={scrollToForm} size="lg" className="h-14 px-8 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold text-lg rounded-xl shadow-lg shadow-indigo-500/25">
                Start Your Journey <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>

        {/* ── Partner Universities ────────────────────────── */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
                <Building className="h-4 w-4" /> Partner Universities
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Study at the UK&apos;s <span className="text-indigo-600">Top Universities</span>
              </h2>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto">We have tie-ups with 1200+ universities — from Russell Group to modern institutions</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {universities.map((uni, i) => (
                <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="bg-gradient-to-br from-slate-50 to-white p-4 rounded-xl border border-slate-100 hover:border-indigo-200 hover:shadow-md transition-all text-center">
                  <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-gradient-to-br from-indigo-100 to-violet-100 flex items-center justify-center">
                    <GraduationCap className="h-6 w-6 text-indigo-600" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 leading-tight">{uni.name}</h4>
                  <span className={`text-xs mt-1 inline-block px-2 py-0.5 rounded-full ${uni.tier === "Russell Group" ? "bg-amber-100 text-amber-700" : "bg-indigo-50 text-indigo-600"}`}>{uni.tier}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Offices ────────────────────────────────────── */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-gradient-to-br from-indigo-700 via-violet-700 to-purple-800 text-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">Visit Our <span className="text-amber-300">Offices</span></h2>
              <p className="text-lg text-white/80">Get in-person guidance at our Gujarat offices</p>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-8 w-8 text-amber-300" />
                  <h3 className="text-2xl font-bold">Nadiad — Head Office</h3>
                </div>
                <p className="text-white/80 mb-4">4th Floor, Tulsi Landmark, Petlad Rd,<br />opp. Kidney Hospital, Shanti Nagar,<br />Nadiad, Gujarat 387001</p>
                <a href={`tel:${PHONE_NUMBER}`} className="inline-flex items-center gap-2 text-amber-300 font-semibold hover:text-amber-200"><Phone className="h-4 w-4" /> {PHONE_NUMBER}</a>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl border border-white/20">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="h-8 w-8 text-amber-300" />
                  <h3 className="text-2xl font-bold">Anand Office</h3>
                </div>
                <p className="text-white/80 mb-4">4th Floor, Radhasoami Samipya,<br />opp. Home Science College, Patel Society,<br />Mota Bazaar, Vallabh Vidyanagar, Anand, Gujarat 388120</p>
                <a href={`tel:${PHONE_NUMBER}`} className="inline-flex items-center gap-2 text-amber-300 font-semibold hover:text-amber-200"><Phone className="h-4 w-4" /> {PHONE_NUMBER}</a>
              </div>
            </div>
          </div>
        </section>

        {/* #4: ── Testimonials (with tags, dates, YT Shorts) ── */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-white">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 text-amber-700 rounded-full text-sm font-semibold mb-4">
                <Star className="h-4 w-4" /> Success Stories
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4">
                Students Who Made It to the <span className="text-indigo-600">UK</span>
              </h2>
              <p className="text-lg text-slate-600">5,000+ students from Gujarat are now studying abroad</p>
            </div>

            {/* Text Testimonials */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              {testimonials.map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="bg-gradient-to-br from-slate-50 to-white p-6 rounded-2xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                      <CheckCircle className="h-3 w-3" /> {t.achievement}
                    </span>
                  </div>
                  <div className="flex gap-1 mb-3">
                    {Array.from({ length: t.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-slate-700 mb-4 italic text-sm">&ldquo;{t.text}&rdquo;</p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center text-white font-bold">{t.initial}</div>
                    <div>
                      <div className="font-bold text-slate-800 text-sm">{t.name}</div>
                      <div className="text-xs text-indigo-600">{t.university}</div>
                      <div className="text-xs text-slate-400">{t.date}</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* YouTube Shorts Video Testimonials */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 text-red-700 rounded-full text-sm font-semibold">
                <Play className="h-4 w-4" /> Watch Student Stories
              </div>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
              {videoTestimonials.map((video, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="rounded-2xl overflow-hidden shadow-lg border border-slate-100">
                  <div className="relative w-full" style={{ paddingBottom: "177.78%" }}>
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={video.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* #7: ── Intake Deadline CTA ────────────────────── */}
        <section className="py-12 md:py-16 px-4 md:px-8 bg-gradient-to-r from-red-600 to-orange-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 rounded-full text-sm font-semibold mb-4">
              <Zap className="h-4 w-4 text-yellow-300" /> Intake Closing Soon
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4">
              Don&apos;t Miss the September 2026 Intake
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Top UK universities are filling seats fast. Apply now before university deadlines close.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={scrollToForm} size="lg" className="h-14 px-8 bg-white text-red-700 hover:bg-red-50 font-bold text-lg rounded-xl">
                Apply Before Deadline <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button onClick={openWhatsApp} size="lg" variant="outline" className="h-14 px-8 border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-xl">
                <MessageCircle className="mr-2 h-5 w-5" /> Ask on WhatsApp
              </Button>
            </div>
          </div>
        </section>

        {/* #8: ── Transparency Section ───────────────────── */}
        <section className="py-12 md:py-16 px-4 md:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 mb-2">100% Free Counselling — No Hidden Charges</h3>
            <p className="text-slate-600 mb-6">We believe in complete transparency. Our initial counselling, profile evaluation, and university shortlisting are absolutely free.</p>
            <div className="flex flex-wrap justify-center gap-4">
              {["No Registration Fee", "No Obligation", "No Hidden Charges", "Expert Guidance"].map((badge, i) => (
                <div key={i} className="flex items-center gap-2 px-4 py-2 bg-green-50 border border-green-200 rounded-full">
                  <CheckCircle className="h-4 w-4 text-green-600" />
                  <span className="text-sm font-medium text-green-800">{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── FAQ ─────────────────────────────────────────── */}
        <section className="py-16 md:py-24 px-4 md:px-8 bg-slate-50">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 mb-4">Frequently Asked Questions</h2>
            </div>
            <div className="space-y-4">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-xl border border-slate-100 overflow-hidden">
                  <button onClick={() => setOpenFaq(openFaq === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left hover:bg-slate-50 transition-colors">
                    <span className="font-semibold text-slate-800 pr-4">{faq.q}</span>
                    <ChevronDown className={`h-5 w-5 text-slate-400 flex-shrink-0 transition-transform ${openFaq === i ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}>
                        <div className="px-5 pb-5 text-slate-600">{faq.a}</div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* #11: ── Softer Final CTA ──────────────────────── */}
        <section className="py-16 md:py-20 px-4 md:px-8 bg-gradient-to-r from-indigo-600 to-violet-600 text-white">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">Still Confused About UK Admissions?</h2>
            <p className="text-lg text-white/90 mb-2">Talk to a counsellor in 15 minutes.</p>
            <p className="text-white/70 mb-8">No sales pitch. Just honest, expert guidance.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button onClick={scrollToForm} size="lg" className="h-14 px-8 bg-amber-400 hover:bg-amber-300 text-indigo-900 font-bold text-lg rounded-xl">
                Get Free Counselling <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button onClick={openWhatsApp} size="lg" variant="outline" className="h-14 px-8 border-2 border-white/30 bg-white/10 hover:bg-white/20 text-white font-bold text-lg rounded-xl">
                <MessageCircle className="mr-2 h-5 w-5" /> Chat on WhatsApp
              </Button>
            </div>
            <p className="mt-6 text-sm text-white/50">Free · Confidential · No Obligation · Response within 2 hours</p>
          </div>
        </section>

        {/* ── Footer ─────────────────────────────────────── */}
        <footer className="py-12 bg-slate-900 text-white">
          <div className="max-w-6xl mx-auto px-4 md:px-8">
            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div>
                <div className="mb-4 bg-white p-3 rounded-xl inline-block">
                  <img src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AEOC%20Rectangle%20Png-aziVeGFOxou9xUQySzTBzyGZEgnTnr.png" alt="AEOC - Apex Education & Overseas Consultant" className="h-10 w-auto" />
                </div>
                <p className="text-slate-400 text-sm">Gujarat&apos;s trusted destination for UK Student Visa guidance. Expert counselling since 2015.</p>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">Quick Links</h4>
                <ul className="space-y-2 text-slate-400 text-sm">
                  <li><a href="https://studyabroad.aeoc.in" className="hover:text-indigo-400 transition-colors">Study Abroad</a></li>
                  <li><a href="https://ielts.aeoc.in" className="hover:text-indigo-400 transition-colors">IELTS Coaching</a></li>
                  <li><a href="https://spokenenglish.aeoc.in" className="hover:text-indigo-400 transition-colors">Spoken English</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-white mb-4">Contact Us</h4>
                <div className="space-y-3 text-slate-400 text-sm">
                  <a href={`tel:${PHONE_NUMBER}`} className="flex items-center gap-2 hover:text-indigo-400 transition-colors"><Phone className="h-4 w-4 text-indigo-400" />{PHONE_NUMBER}</a>
                  <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-green-400 transition-colors"><MessageCircle className="h-4 w-4 text-green-400" />WhatsApp: {PHONE_NUMBER}</a>
                  <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-indigo-400 transition-colors"><Globe className="h-4 w-4 text-indigo-400" />{EMAIL}</a>
                </div>
              </div>
            </div>
            <div className="pt-8 border-t border-slate-800 text-center text-slate-500 text-sm">
              <p>&copy; {new Date().getFullYear()} Apex Education & Overseas Consultant. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}
