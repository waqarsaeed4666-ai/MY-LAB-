import { useCallback, useEffect, useRef, useState } from 'react';
import { BookingSection } from './components/BookingSection';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LocationSection } from './components/LocationSection';
import { ServicesSection } from './components/ServicesSection';
import { Toast } from './components/Toast';
import { WhatsAppIcon } from './components/WhatsAppIcon';
import { LAB_PHONE_DISPLAY, buildGeneralWhatsAppUrl } from './constants';
import { ServiceType, ToastState } from './types';

export default function App() {
  const [selectedService, setSelectedService] = useState<ServiceType>('Blood Test');
  const [testDetails, setTestDetails] = useState('');
  const [toast, setToast] = useState<ToastState | null>(null);

  const toastTimerRef = useRef<number | null>(null);
  const patientNameInputRef = useRef<HTMLInputElement | null>(null);

  const showToast = useCallback((message: string, isError = false) => {
    setToast({ message, isError });
    if (toastTimerRef.current !== null) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToast(null);
    }, 3500);
  }, []);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current !== null) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const handleAppendTest = useCallback((testName: string) => {
    setTestDetails((prev) => {
      const trimmed = prev.trim();
      if (!trimmed) return testName;
      if (trimmed.toLowerCase().includes(testName.toLowerCase())) {
        return prev;
      }
      return `${trimmed}, ${testName}`;
    });
  }, []);

  const handleSelectService = useCallback(
    (serviceType: ServiceType, initialTest?: string) => {
      setSelectedService(serviceType);
      if (initialTest) {
        handleAppendTest(initialTest);
      }
      document.getElementById('booking')?.scrollIntoView({ behavior: 'smooth' });
      window.setTimeout(() => {
        patientNameInputRef.current?.focus();
      }, 250);
    },
    [handleAppendTest]
  );

  const floatingWhatsAppUrl = buildGeneralWhatsAppUrl(
    'Assalam-o-Alaikum Samundri Diagnostic Center, I want to book a test.'
  );

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-800 overflow-x-hidden">
      <Header />

      <main className="flex-1">
        <HeroSection />

        <ServicesSection onSelectService={handleSelectService} />

        <BookingSection
          selectedService={selectedService}
          testDetails={testDetails}
          onServiceChange={setSelectedService}
          onTestDetailsChange={setTestDetails}
          onAppendTest={handleAppendTest}
          patientNameInputRef={patientNameInputRef}
          onNotify={showToast}
        />

        <LocationSection />
      </main>

      <Footer />

      {/* Floating WhatsApp Button */}
      <a
        href={floatingWhatsAppUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={`Chat on WhatsApp ${LAB_PHONE_DISPLAY}`}
        title={`WhatsApp: ${LAB_PHONE_DISPLAY}`}
        className="fixed bottom-4 right-4 sm:bottom-5 sm:right-5 z-40 w-12 h-12 sm:w-14 sm:h-14 bg-emerald-500 hover:bg-emerald-600 text-white rounded-full shadow-xl flex items-center justify-center hover:scale-105 transition-transform duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:ring-offset-2"
      >
        <WhatsAppIcon className="w-6 h-6 sm:w-7 sm:h-7" />
      </a>

      <Toast toast={toast} />
    </div>
  );
}
