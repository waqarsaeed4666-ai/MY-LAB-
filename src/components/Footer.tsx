import { LAB_ADDRESS, LAB_NAME, LAB_PHONE_DISPLAY, buildGeneralWhatsAppUrl } from '../constants';

export function Footer() {
  const currentYear = new Date().getFullYear();
  const footerWhatsAppUrl = buildGeneralWhatsAppUrl(
    'Assalam-o-Alaikum Samundri Diagnostic Center, I want to book a test.'
  );

  return (
    <footer className="bg-navy-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 pt-10 pb-20 sm:pb-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h3 className="font-display text-white font-extrabold text-lg">{LAB_NAME}</h3>
            <p className="text-xs text-slate-400 mt-1 tabular-nums">
              {LAB_ADDRESS} · Phone: {LAB_PHONE_DISPLAY}
            </p>
          </div>
          <div className="flex items-center gap-4 text-xs font-semibold">
            <a
              href={footerWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 transition-colors duration-150 whitespace-nowrap tabular-nums"
            >
              WhatsApp: {LAB_PHONE_DISPLAY}
            </a>
            <span className="text-slate-600" aria-hidden="true">
              ·
            </span>
            <a
              href="#booking"
              className="text-teal-400 hover:text-teal-300 transition-colors duration-150 whitespace-nowrap"
            >
              Book Appointment
            </a>
          </div>
        </div>
        <div className="mt-6 pt-6 border-t border-slate-800/80 text-center text-xs text-slate-500">
          &copy; {currentYear} {LAB_NAME}. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
