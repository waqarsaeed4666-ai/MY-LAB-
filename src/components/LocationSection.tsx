import { Clock, ExternalLink, MapPin, Moon, Phone } from 'lucide-react';
import {
  GOOGLE_MAPS_EMBED_URL,
  GOOGLE_MAPS_SEARCH_URL,
  LAB_ADDRESS,
  LAB_NAME,
  LAB_PHONE_DISPLAY,
  buildGeneralWhatsAppUrl,
} from '../constants';
import { WhatsAppIcon } from './WhatsAppIcon';

export function LocationSection() {
  const locationWhatsAppUrl = buildGeneralWhatsAppUrl(
    'Assalam-o-Alaikum Samundri Diagnostic Center, please share location and test details.'
  );

  return (
    <section id="location" className="py-12 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 items-stretch">
        {/* Contact & Timings Card */}
        <div
          id="timings"
          className="bg-white rounded-2xl p-5 sm:p-9 border border-slate-200 shadow-sm flex flex-col justify-between space-y-6"
        >
          <div>
            <p className="text-teal-700 font-semibold text-sm">Visit Our Center</p>
            <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-900 mt-1 text-balance">
              Location &amp; Timings
            </h2>
            <p className="text-slate-600 text-sm mt-2">
              Conveniently located opposite THQ Hospital on Gojra Road, Samundri.
            </p>

            <div className="mt-6 sm:mt-7 space-y-5">
              {/* Address */}
              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-navy-900 text-sm">Lab Address</h3>
                  <p className="text-slate-600 text-sm mt-0.5 break-words">{LAB_ADDRESS}</p>
                </div>
              </div>

              {/* Timings */}
              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 text-sm">Working Hours</h3>
                  <p className="text-slate-700 text-sm font-medium mt-0.5 tabular-nums">
                    Day Time: 8:00 AM – 10:00 PM
                  </p>
                  <p className="text-teal-700 text-xs font-semibold mt-1 flex items-center gap-1.5">
                    <Moon className="w-3.5 h-3.5 shrink-0" />
                    <span>Night Time Emergency Service Also Available</span>
                  </p>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="flex items-start gap-3.5 sm:gap-4">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-teal-50 text-teal-700 flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-bold text-navy-900 text-sm">Phone &amp; WhatsApp Helpline</h3>
                  <p className="text-slate-800 text-base font-bold mt-0.5 font-mono tabular-nums">
                    {LAB_PHONE_DISPLAY}
                  </p>
                  <p className="text-slate-500 text-xs mt-0.5">
                    Call or WhatsApp for test rates &amp; home sampling
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
            <a
              href={GOOGLE_MAPS_SEARCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-navy-900 hover:bg-navy-800 text-white font-semibold px-4 py-3 rounded-xl text-sm transition-colors duration-150 whitespace-nowrap"
            >
              <MapPin className="w-4 h-4 text-teal-400 shrink-0" />
              <span>Open in Google Maps</span>
            </a>
            <a
              href={locationWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-3 rounded-xl text-sm transition-colors duration-150 whitespace-nowrap"
            >
              <WhatsAppIcon className="w-5 h-5" />
              <span className="tabular-nums">WhatsApp {LAB_PHONE_DISPLAY}</span>
            </a>
          </div>
        </div>

        {/* Map Card */}
        <div className="bg-navy-900 rounded-2xl overflow-hidden border border-slate-200 shadow-sm flex flex-col justify-between min-h-[300px] sm:min-h-[360px]">
          <iframe
            title="Samundri Diagnostic Center Location Map"
            className="w-full flex-1 min-h-[240px] sm:min-h-[300px] border-0 opacity-95"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src={GOOGLE_MAPS_EMBED_URL}
          />
          <div className="bg-white/95 backdrop-blur-md p-4 border-t border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="text-xs min-w-0">
              <p className="font-bold text-navy-900">{LAB_NAME}</p>
              <p className="text-slate-500">Opp. THQ Hospital, Gojra Road, Samundri</p>
            </div>
            <a
              href={GOOGLE_MAPS_SEARCH_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 text-xs font-bold text-teal-700 hover:text-teal-800 bg-teal-50 hover:bg-teal-100 px-3.5 py-2.5 rounded-lg transition-colors duration-150 whitespace-nowrap"
            >
              <span>Get Directions</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
