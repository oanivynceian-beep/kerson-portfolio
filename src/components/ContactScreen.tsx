import React, { useState } from 'react';
import { STUDIO_INFO } from '../data/portfolioData';
import { InquiryFormData } from '../types';
import { Check, Copy, Send, Sparkles, Phone, Facebook, Instagram, MapPin, Calendar, Clock } from 'lucide-react';
import { motion } from 'motion/react';

export const ContactScreen: React.FC = () => {
  const [formData, setFormData] = useState<InquiryFormData>({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.projectType || !formData.message) {
      return;
    }

    setIsSubmitting(true);
    // Simulate real studio client-side dispatch
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 800);
  };

  const handleCopy = (text: string, identifier: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(identifier);
    setTimeout(() => setCopiedField(null), 2000);
  };

  return (
    <div className="w-full pt-24 sm:pt-28 pb-24 sm:pb-32 min-h-screen">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 md:px-16 lg:px-20">
        {/* Hero Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mt-6 sm:mt-12 mb-12 sm:mb-20"
        >
          <span className="font-label-caps text-[#8e9192] text-xs tracking-widest block mb-3 sm:mb-4">
            COMMISSIONS &amp; MEDIA BOOKINGS
          </span>
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl text-white max-w-4xl tracking-tight uppercase font-bold leading-tight">
            LET'S CAPTURE YOUR VISION
          </h1>
          <p className="font-sans text-sm sm:text-base text-[#c4c7c8] max-w-2xl mt-4">
            Directly collaborate with Kerson John Parame for tournaments, institutional archives, church productions, and commercial projects.
          </p>
        </motion.div>

        {/* Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-16">
          {/* Left Column: Inquiry Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:col-span-7"
          >
            {isSubmitted ? (
              <div className="bg-[#1c1b1b] border border-emerald-500/40 p-6 sm:p-12 space-y-6 shadow-2xl">
                <div className="w-12 h-12 border border-emerald-400 bg-emerald-950/40 flex items-center justify-center text-emerald-400 mb-4">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="font-serif text-2xl sm:text-3xl text-white font-bold">
                  Inquiry Dispatched to Kerson John Parame.
                </h3>
                <p className="font-sans text-sm sm:text-base text-[#c4c7c8] leading-relaxed">
                  Thank you, <span className="text-white font-semibold">{formData.name}</span>. Your message has been sent. You can expect a response via email or phone within 24 hours.
                </p>
                <div className="p-4 bg-[#141414] border-l-2 border-emerald-400 font-sans text-xs text-[#8e9192] space-y-1.5">
                  <div><strong className="text-white">Reference:</strong> KJP-{Math.floor(100000 + Math.random() * 900000)}</div>
                  <div><strong className="text-white">Project Focus:</strong> {formData.projectType || 'Photo/Video Production'}</div>
                  <div><strong className="text-white">Direct Contact:</strong> 09512491780 / 09918347451</div>
                </div>
                <button
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ name: '', email: '', phone: '', projectType: '', message: '' });
                  }}
                  className="border border-white/60 hover:border-white px-6 py-3 font-label-caps text-xs text-white hover:bg-white hover:text-black transition-colors cursor-pointer min-h-[44px]"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col space-y-8 sm:space-y-10 w-full max-w-2xl bg-[#181818]/60 p-6 sm:p-10 border border-white/10">
                {/* Full Name */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="name" className="font-label-caps text-xs text-[#c4c7c8]">
                    FULL NAME / ORGANIZATION *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Maria Santos / Davao Athletic Meet"
                    className="editorial-input w-full font-sans text-base sm:text-lg py-3 text-white placeholder:text-[#555] min-h-[44px]"
                  />
                </div>

                {/* Grid of Email & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
                  {/* Email Address */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="email" className="font-label-caps text-xs text-[#c4c7c8]">
                      EMAIL ADDRESS *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. maria@example.com"
                      className="editorial-input w-full font-sans text-base sm:text-lg py-3 text-white placeholder:text-[#555] min-h-[44px]"
                    />
                  </div>

                  {/* Contact Number */}
                  <div className="flex flex-col space-y-2">
                    <label htmlFor="phone" className="font-label-caps text-xs text-[#c4c7c8]">
                      CONTACT NUMBER (OPTIONAL)
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone || ''}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. 0912 345 6789"
                      className="editorial-input w-full font-sans text-base sm:text-lg py-3 text-white placeholder:text-[#555] min-h-[44px]"
                    />
                  </div>
                </div>

                {/* Project Type */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="project_type" className="font-label-caps text-xs text-[#c4c7c8]">
                    SERVICE / EVENT TYPE *
                  </label>
                  <select
                    id="project_type"
                    name="project_type"
                    required
                    value={formData.projectType}
                    onChange={(e) => setFormData({ ...formData, projectType: e.target.value })}
                    className="editorial-input w-full font-sans text-base sm:text-lg py-3 text-white cursor-pointer bg-[#131313] min-h-[44px]"
                  >
                    <option value="" disabled className="bg-[#1c1b1b] text-[#8e9192]">
                      Select an option
                    </option>
                    <option value="Sports & Tournament Photography" className="bg-[#1c1b1b] text-white">
                      Sports &amp; Tournament Photography
                    </option>
                    <option value="Videography & Reel Production" className="bg-[#1c1b1b] text-white">
                      Videography &amp; Reel Production
                    </option>
                    <option value="Institutional & School Media" className="bg-[#1c1b1b] text-white">
                      Institutional &amp; School Media
                    </option>
                    <option value="Sacred & Church Event Coverage" className="bg-[#1c1b1b] text-white">
                      Sacred &amp; Church Event Coverage
                    </option>
                    <option value="Commercial & Brand Commission" className="bg-[#1c1b1b] text-white">
                      Commercial &amp; Brand Commission
                    </option>
                    <option value="Other Bespoke Work" className="bg-[#1c1b1b] text-white">
                      Other Bespoke Work
                    </option>
                  </select>
                </div>

                {/* Project Details */}
                <div className="flex flex-col space-y-2">
                  <label htmlFor="message" className="font-label-caps text-xs text-[#c4c7c8]">
                    EVENT DETAILS &amp; TIMELINE *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide event date, location, coverage requirements, and specific deliverables needed..."
                    className="editorial-input w-full font-sans text-base sm:text-lg py-3 text-white resize-none placeholder:text-[#555]"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto bg-white text-black border border-white px-8 md:px-10 py-4 font-label-caps text-xs hover:bg-transparent hover:text-white transition-all duration-300 active:scale-95 disabled:opacity-50 cursor-pointer flex items-center justify-center gap-3 min-h-[44px]"
                  >
                    {isSubmitting ? (
                      <span>TRANSMITTING INQUIRY...</span>
                    ) : (
                      <>
                        <span>SEND INQUIRY TO KERSON</span>
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>

          {/* Right Column: Direct Contact Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="md:col-span-5 md:col-start-8 flex flex-col space-y-8 border-t border-[#444748]/30 md:border-t-0 pt-8 md:pt-0"
          >
            {/* Direct Phone Numbers */}
            <div>
              <h3 className="font-label-caps text-xs text-[#8e9192] mb-3">
                DIRECT CONTACT NUMBERS
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3.5 bg-[#181818] border border-[#444748]/30 hover:border-white/40 transition-colors">
                  <a
                    href="tel:09512491780"
                    className="flex items-center gap-2.5 font-mono text-white text-sm hover:text-emerald-400 transition-colors min-h-[36px]"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>09512491780</span>
                  </a>
                  <button
                    onClick={() => handleCopy('09512491780', 'p1')}
                    className="text-[#8e9192] hover:text-white p-2 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                    title="Copy number"
                  >
                    {copiedField === 'p1' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>

                <div className="flex items-center justify-between p-3.5 bg-[#181818] border border-[#444748]/30 hover:border-white/40 transition-colors">
                  <a
                    href="tel:09918347451"
                    className="flex items-center gap-2.5 font-mono text-white text-sm hover:text-emerald-400 transition-colors min-h-[36px]"
                  >
                    <Phone className="w-4 h-4 text-emerald-400" />
                    <span>09918347451</span>
                  </a>
                  <button
                    onClick={() => handleCopy('09918347451', 'p2')}
                    className="text-[#8e9192] hover:text-white p-2 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
                    title="Copy number"
                  >
                    {copiedField === 'p2' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Social Media Links */}
            <div>
              <h3 className="font-label-caps text-xs text-[#8e9192] mb-3">
                SOCIAL MEDIA
              </h3>
              <div className="space-y-3">
                <a
                  href="https://www.facebook.com/kerson.john.parame/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 bg-[#181818] border border-[#444748]/30 hover:border-white transition-colors group min-h-[44px]"
                >
                  <div className="flex items-center gap-2.5">
                    <Facebook className="w-4 h-4 text-blue-400" />
                    <span className="font-sans text-sm text-white">Facebook</span>
                  </div>
                  <span className="font-sans text-xs text-[#8e9192] group-hover:text-white transition-colors">
                    Kerson John Parame ↗
                  </span>
                </a>

                <a
                  href="https://www.instagram.com/worcestershire_sauceee/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between p-3.5 bg-[#181818] border border-[#444748]/30 hover:border-white transition-colors group min-h-[44px]"
                >
                  <div className="flex items-center gap-2.5">
                    <Instagram className="w-4 h-4 text-pink-400" />
                    <span className="font-sans text-sm text-white">Instagram</span>
                  </div>
                  <span className="font-sans text-xs text-[#8e9192] group-hover:text-white transition-colors">
                    @worcestershire_sauceee ↗
                  </span>
                </a>
              </div>
            </div>

            {/* Location & Coverage */}
            <div className="p-4 bg-[#181818] border border-[#444748]/30">
              <h3 className="font-label-caps text-xs text-[#8e9192] mb-2">
                LOCATION &amp; COVERAGE
              </h3>
              <div className="flex items-start gap-2.5 font-sans text-sm text-white leading-relaxed">
                <MapPin className="w-4 h-4 text-emerald-400 mt-1 shrink-0" />
                <div>
                  <p className="font-medium text-white">Davao City, Philippines</p>
                  <p className="text-xs text-[#8e9192] mt-0.5">
                    Available for regional events, sports tournaments, and nationwide assignments.
                  </p>
                </div>
              </div>
            </div>

            {/* Software Stack Info Badge */}
            <div className="p-5 bg-[#181818] border border-[#444748]/30">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="w-3.5 h-3.5 text-emerald-400" />
                <span className="font-label-caps text-[10px] text-white">Editing &amp; Post-Production</span>
              </div>
              <p className="font-sans text-xs text-[#8e9192] leading-relaxed">
                Full RAW post-production and same-day highlights delivery utilizing <strong>Adobe Premiere Pro, Lightroom Classic, Lightroom</strong>, and <strong>CapCut</strong>.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
