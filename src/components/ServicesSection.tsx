import { Activity, ArrowRight, FlaskConical, ScanLine } from 'lucide-react';
import { SERVICE_OFFERINGS } from '../constants';
import { ServiceType } from '../types';

interface ServicesSectionProps {
  onSelectService: (serviceType: ServiceType, initialTest?: string) => void;
}

function ServiceIcon({ type }: { type: ServiceType }) {
  switch (type) {
    case 'Blood Test':
      return <FlaskConical className="w-6 h-6" />;
    case 'X-Ray':
      return <ScanLine className="w-6 h-6" />;
    case 'Ultrasound':
      return <Activity className="w-6 h-6" />;
  }
}

export function ServicesSection({ onSelectService }: ServicesSectionProps) {
  return (
    <section id="services" className="py-12 sm:py-20 max-w-6xl mx-auto px-4 sm:px-6">
      <div className="text-center max-w-2xl mx-auto mb-9 sm:mb-12">
        <p className="text-teal-700 font-semibold text-sm">Diagnostic Facilities</p>
        <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-900 mt-1.5 text-balance">
          Our Medical Services
        </h2>
        <p className="text-slate-600 text-sm sm:text-base mt-2.5 leading-relaxed">
          Modern diagnostic equipment with qualified staff for accurate and reliable test results.
          Click any test below to add it directly to your booking.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8">
        {SERVICE_OFFERINGS.map((service) => (
          <div
            key={service.type}
            className={`bg-white rounded-2xl p-5 sm:p-7 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-150 flex flex-col justify-between ${service.accentClass}`}
          >
            <div>
              <div className="flex items-center justify-between mb-5">
                <div
                  className={`w-12 h-12 rounded-xl flex items-center justify-center ${service.iconBgClass}`}
                >
                  <ServiceIcon type={service.type} />
                </div>
                <span className="font-mono text-xs font-semibold text-slate-400 tabular-nums">
                  {service.index}
                </span>
              </div>

              <h3 className="font-display text-xl font-bold text-navy-900">
                {service.index}. {service.title}
              </h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">{service.description}</p>

              <div className="mt-5 flex flex-wrap gap-1.5">
                {service.tests.map((testName) => (
                  <button
                    key={testName}
                    type="button"
                    onClick={() => onSelectService(service.type, testName)}
                    className="px-2.5 py-1.5 bg-slate-100 hover:bg-teal-50 text-slate-700 hover:text-teal-800 border border-transparent hover:border-teal-200 rounded-lg text-xs font-medium transition-colors duration-150 whitespace-nowrap"
                  >
                    + {testName}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => onSelectService(service.type)}
                className="w-full py-2.5 px-4 rounded-xl bg-teal-50 hover:bg-teal-600 text-teal-800 hover:text-white font-semibold text-sm transition-colors duration-150 flex items-center justify-center gap-2 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600"
              >
                <span>{service.ctaLabel}</span>
                <ArrowRight className="w-4 h-4 shrink-0" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
