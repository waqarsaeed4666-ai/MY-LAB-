import {
  CalendarPlus,
  FileText,
  Home,
  MapPin,
  Moon,
  Phone,
  ShieldCheck,
} from 'lucide-react';
import {
  LAB_ADDRESS,
  LAB_PHONE_DISPLAY,
  LAB_PHONE_TEL,
  buildGeneralWhatsAppUrl,
} from '../constants';
import { BrandMark } from './BrandMark';
import { WhatsAppIcon } from './WhatsAppIcon';

export function HeroSection() {
  const whatsappInquiryUrl = buildGeneralWhatsAppUrl(
    `Assalam-o-Alaikum Samundri Diagnostic Center (${LAB_PHONE_DISPLAY}), I want to inquire about a test.`
  );

  return (
    <section
      id="top"
      className="relative overflow-hidden bg-gradient-to-br from-navy-900 via-navy-800 to-crimson-800 text-white"
    >
      <div className="absolute inset-0 opacity-15 pointer-events-none" aria-hidden="true">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-crimson-600 blur-3xl" />
        <div className="absolute bottom-0 left-10 w-72 h-72 rounded-full bg-teal-500 blur-3xl" />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 sm:gap-10 items-stretch">
          {/* Hero Text Column */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-5 sm:space-y-6 text-center lg:text-left">
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-2 gap-y-1 text-xs sm:text-sm font-medium text-teal-200 tracking-wide">
              <span>Samundri Diagnostic Center &amp; Laboratory</span>
              <span aria-hidden="true" className="hidden sm:inline">
                ·
              </span>
              <span className="tabular-nums">Day: 8:00 AM – 10:00 PM</span>
              <span aria-hidden="true">·</span>
              <span>Night Service Available</span>
            </div>

            <h1
              className="font-display font-extrabold tracking-tight leading-[1.15] text-balance"
              style={{ fontSize: 'clamp(1.75rem, 4.5vw, 3.35rem)' }}
            >
              Accurate Diagnostics &amp; Fast Lab Reports in{' '}
              <span className="text-teal-300">Samundri</span>
            </h1>

            <p className="text-slate-200 text-sm sm:text-lg max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Trusted Computerized Blood Tests, Digital X-Ray, and Ultrasound services. Book your
              lab visit or <strong className="text-white font-semibold">Home Sample Collection</strong>{' '}
              online in seconds.
            </p>

            {/* Primary Action & Direct Contact Row */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center lg:justify-start gap-2.5 sm:gap-3 pt-1">
              <a
                href="#booking"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-teal-500 hover:bg-teal-400 text-navy-900 font-bold px-5 py-3.5 rounded-xl shadow-lg shadow-teal-950/30 transition-colors duration-150 text-sm sm:text-base whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300"
              >
                <CalendarPlus className="w-5 h-5 shrink-0" />
                <span>Book Test / Scan Online</span>
              </a>

              <a
                href={whatsappInquiryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold px-5 py-3.5 rounded-xl shadow-lg transition-colors duration-150 text-sm sm:text-base whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span className="tabular-nums">WhatsApp ({LAB_PHONE_DISPLAY})</span>
              </a>

              <a
                href={`tel:${LAB_PHONE_TEL}`}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-5 py-3.5 rounded-xl transition-colors duration-150 text-sm sm:text-base whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>Call Now</span>
              </a>
            </div>

            {/* Address Line */}
            <div className="pt-1 flex items-start sm:items-center justify-center lg:justify-start gap-2 text-xs sm:text-sm text-slate-300">
              <MapPin className="w-4 h-4 text-teal-300 shrink-0 mt-0.5 sm:mt-0" />
              <span>{LAB_ADDRESS}</span>
            </div>
          </div>

          {/* Right Column: Official Lab Logo & Patient-First Highlights */}
          <div className="lg:col-span-5 flex flex-col justify-between bg-white/10 backdrop-blur-md border border-white/15 rounded-2xl p-4 sm:p-7 shadow-2xl space-y-4 sm:space-y-5">
            <div className="bg-white rounded-xl p-4 sm:p-5 w-full flex items-center justify-center shadow-sm">
              <BrandMark variant="showcase" />
            </div>

            <div className="flex items-center justify-between border-t border-b border-white/15 py-3.5">
              <div>
                <p className="text-xs text-teal-300 font-semibold">Why Choose Us</p>
                <h2 className="font-display text-lg font-bold text-white mt-0.5">
                  Patient-First Care
                </h2>
              </div>
              <div className="w-11 h-11 rounded-xl bg-teal-500/20 border border-teal-400/30 flex items-center justify-center text-teal-300 shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
            </div>

            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-300 shrink-0 mt-0.5">
                  <Home className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">Home Sample Collection</p>
                  <p className="text-slate-200 text-xs mt-0.5">
                    Ghar baithey blood sample dene ki sahulat dastiyab hai.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-300 shrink-0 mt-0.5">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">Day &amp; Night Emergency Service</p>
                  <p className="text-slate-200 text-xs mt-0.5">
                    Regular Day (8 AM – 10 PM) plus Night time emergency testing.
                  </p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-teal-500/20 flex items-center justify-center text-teal-300 shrink-0 mt-0.5">
                  <FileText className="w-4 h-4" />
                </div>
                <div>
                  <p className="font-semibold text-white">WhatsApp Digital Reports</p>
                  <p className="text-slate-200 text-xs mt-0.5">
                    Receive accurate computerized reports directly on your WhatsApp.
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
