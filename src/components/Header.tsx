import { CalendarCheck } from 'lucide-react';
import { BrandMark } from './BrandMark';

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between gap-2 sm:gap-4 md:gap-8">
        {/* Zone 1: Brand wordmark */}
        <a
          href="#top"
          className="flex items-center gap-2 sm:gap-2.5 min-w-0 shrink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 rounded-lg"
        >
          <BrandMark variant="compact" />
          <span className="font-display font-extrabold text-navy-900 text-sm sm:text-lg tracking-tight truncate">
            SMDC Samundri
          </span>
        </a>

        {/* Zone 2: Concise single-line navigation links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600"
        >
          <a
            href="#services"
            className="hover:text-teal-700 hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Services
          </a>
          <a
            href="#booking"
            className="hover:text-teal-700 hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Online Booking
          </a>
          <a
            href="#timings"
            className="hover:text-teal-700 hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Timings
          </a>
          <a
            href="#location"
            className="hover:text-teal-700 hover:underline underline-offset-4 transition-colors duration-150 whitespace-nowrap shrink-0"
          >
            Location
          </a>
        </nav>

        {/* Zone 3: Single primary action */}
        <div className="flex items-center shrink-0">
          <a
            href="#booking"
            className="inline-flex items-center gap-1.5 sm:gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm px-3 py-2 sm:px-4 sm:py-2.5 rounded-xl transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 focus-visible:ring-offset-2"
          >
            <CalendarCheck className="w-4 h-4 shrink-0" />
            <span>Book Now</span>
          </a>
        </div>
      </div>
    </header>
  );
}
