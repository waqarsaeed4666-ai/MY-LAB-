import { useState } from 'react';
import { DEFAULT_LOGO_SRC } from '../constants';

interface BrandMarkProps {
  variant?: 'compact' | 'showcase';
}

export function BrandMark({ variant = 'compact' }: BrandMarkProps) {
  const [imgError, setImgError] = useState(false);

  if (!imgError) {
    return (
      <img
        src={DEFAULT_LOGO_SRC}
        alt="SMDC Samundri Diagnostic Center & Laboratory Logo"
        referrerPolicy="no-referrer"
        onError={() => setImgError(true)}
        className={
          variant === 'showcase'
            ? 'max-h-32 sm:max-h-44 w-auto max-w-full object-contain'
            : 'h-8 sm:h-10 w-auto max-w-[96px] sm:max-w-[140px] object-contain'
        }
      />
    );
  }

  if (variant === 'showcase') {
    return (
      <div className="flex items-center gap-3.5 py-3 px-4 text-left">
        <div className="w-14 h-14 rounded-2xl bg-navy-900 flex items-center justify-center shadow-sm shrink-0">
          <svg className="w-8 h-8" viewBox="0 0 36 36" fill="none" aria-hidden="true">
            <path
              d="M18 4C18 4 8.5 14.3 8.5 21.5C8.5 26.7467 12.7533 31 18 31C23.2467 31 27.5 26.7467 27.5 21.5C27.5 14.3 18 4 18 4Z"
              fill="#991B26"
            />
            <path
              d="M18 16.5V25.5M13.5 21H22.5"
              stroke="#FFFFFF"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div>
          <div className="font-display text-2xl font-extrabold tracking-tight text-navy-900 leading-none">
            SMDC <span className="text-crimson-700">LAB</span>
          </div>
          <div className="text-xs font-semibold text-teal-700 mt-1 tracking-wide">
            Samundri Diagnostic Center &amp; Laboratory
          </div>
          <div className="text-[11px] font-mono text-slate-500 mt-0.5 tabular-nums">
            Opp. THQ Hospital · Gojra Road
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-9 h-9 rounded-xl bg-navy-900 text-white flex items-center justify-center shrink-0">
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M12 2.75c0 0-6.75 7.2-6.75 12.25a6.75 6.75 0 0013.5 0c0-5.05-6.75-12.25-6.75-12.25z"
          fill="#14B8A6"
        />
        <path
          d="M12 11.5v5m-2.5-2.5h5"
          stroke="#0F294A"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </svg>
    </div>
  );
}
