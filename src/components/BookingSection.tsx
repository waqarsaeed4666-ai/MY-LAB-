import { RefObject, useEffect, useRef, useState } from 'react';
import {
  Bookmark,
  CheckCircle2,
  ClipboardCopy,
  FlaskConical,
  History,
  Home,
  PlusCircle,
  Save,
  Stethoscope,
  User,
  X,
} from 'lucide-react';
import {
  BOOKING_HISTORY_STORAGE_KEY,
  CUSTOM_TESTS_STORAGE_KEY,
  LAB_PHONE_DISPLAY,
  QUICK_ADD_TESTS,
  TIME_SLOTS,
  buildBookingMessageText,
  buildWhatsAppBookingUrl,
} from '../constants';
import { BookingFormData, BookingRecord, ServiceType, VisitType } from '../types';
import { BrandMark } from './BrandMark';
import { WhatsAppIcon } from './WhatsAppIcon';

interface BookingSectionProps {
  selectedService: ServiceType;
  testDetails: string;
  onServiceChange: (service: ServiceType) => void;
  onTestDetailsChange: (value: string) => void;
  onAppendTest: (testName: string) => void;
  patientNameInputRef: RefObject<HTMLInputElement | null>;
  onNotify: (message: string, isError?: boolean) => void;
}

function getTodayDateString(): string {
  const now = new Date();
  const offsetMs = now.getTimezoneOffset() * 60000;
  return new Date(now.getTime() - offsetMs).toISOString().split('T')[0];
}

export function BookingSection({
  selectedService,
  testDetails,
  onServiceChange,
  onTestDetailsChange,
  onAppendTest,
  patientNameInputRef,
  onNotify,
}: BookingSectionProps) {
  const todayStr = getTodayDateString();
  const slipRef = useRef<HTMLDivElement>(null);

  const [patientName, setPatientName] = useState('');
  const [phone, setPhone] = useState('');
  const [visitType, setVisitType] = useState<VisitType>('Lab Visit');
  const [preferredDate, setPreferredDate] = useState(todayStr);
  const [preferredTime, setPreferredTime] = useState(TIME_SLOTS[0].value);
  const [notes, setNotes] = useState('');
  const [formError, setFormError] = useState<string | null>(null);

  // Custom test input & saved custom tests
  const [customTestInput, setCustomTestInput] = useState('');
  const [customTestFeedback, setCustomTestFeedback] = useState<{
    text: string;
    isError: boolean;
  } | null>(null);
  const [savedCustomTests, setSavedCustomTests] = useState<string[]>(() => {
    try {
      const raw = localStorage.getItem(CUSTOM_TESTS_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  // Confirmed slip & local device history
  const [confirmedSlip, setConfirmedSlip] = useState<BookingRecord | null>(null);
  const [bookingHistory, setBookingHistory] = useState<BookingRecord[]>(() => {
    try {
      const raw = localStorage.getItem(BOOKING_HISTORY_STORAGE_KEY);
      const parsed = raw ? JSON.parse(raw) : [];
      return Array.isArray(parsed) ? parsed : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    if (confirmedSlip && slipRef.current) {
      slipRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }, [confirmedSlip]);

  const persistCustomTests = (tests: string[]) => {
    setSavedCustomTests(tests);
    try {
      localStorage.setItem(CUSTOM_TESTS_STORAGE_KEY, JSON.stringify(tests));
    } catch {
      // Ignore storage quota issues
    }
  };

  const handleAddCustomTest = (saveForFuture: boolean) => {
    const trimmed = customTestInput.trim();
    if (!trimmed) {
      setCustomTestFeedback({ text: 'Please type a test or scan name first.', isError: true });
      return;
    }

    onAppendTest(trimmed);

    if (saveForFuture) {
      const exists = savedCustomTests.some(
        (item) => item.toLowerCase() === trimmed.toLowerCase()
      );
      if (!exists) {
        persistCustomTests([...savedCustomTests, trimmed]);
      }
      setCustomTestFeedback({
        text: `"${trimmed}" added to booking and saved to your quick-select custom tests.`,
        isError: false,
      });
    } else {
      setCustomTestFeedback({
        text: `"${trimmed}" added to Test / Scan Details for this booking.`,
        isError: false,
      });
    }

    setCustomTestInput('');
  };

  const handleRemoveCustomTest = (testName: string) => {
    persistCustomTests(
      savedCustomTests.filter((item) => item.toLowerCase() !== testName.toLowerCase())
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const cleanName = patientName.trim();
    const cleanPhone = phone.trim();
    const cleanTests = testDetails.trim();
    const cleanNotes = notes.trim();

    if (!cleanName) {
      setFormError('Please enter the patient name.');
      patientNameInputRef.current?.focus();
      return;
    }

    const digitsOnly = cleanPhone.replace(/\D/g, '');
    if (digitsOnly.length < 7) {
      setFormError('Please enter a valid phone or WhatsApp number (at least 7 digits).');
      return;
    }

    if (!cleanTests) {
      setFormError('Please enter or select at least one test or scan.');
      return;
    }

    if (visitType === 'Home Sample' && !cleanNotes) {
      setFormError('Please enter your complete home address in Notes for Home Sample Collection.');
      return;
    }

    const formData: BookingFormData = {
      patientName: cleanName,
      phone: cleanPhone,
      serviceType: selectedService,
      visitType,
      testDetails: cleanTests,
      preferredDate: preferredDate || todayStr,
      preferredTime,
      notes: cleanNotes,
    };

    const newRecord: BookingRecord = {
      ...formData,
      id: `SMDC-${Date.now().toString().slice(-5)}`,
      createdAt: new Date().toLocaleString('en-PK', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
    };

    const updatedHistory = [newRecord, ...bookingHistory].slice(0, 10);
    setBookingHistory(updatedHistory);
    try {
      localStorage.setItem(BOOKING_HISTORY_STORAGE_KEY, JSON.stringify(updatedHistory));
    } catch {
      // Ignore storage quota issues
    }

    setConfirmedSlip(newRecord);
    onNotify('Booking slip prepared! Tap Open WhatsApp to send directly.');

    // Trigger external WhatsApp link cleanly via anchor element
    const whatsappUrl = buildWhatsAppBookingUrl(formData);
    const link = document.createElement('a');
    link.href = whatsappUrl;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  const handleCopySlip = async (record: BookingRecord) => {
    try {
      await navigator.clipboard.writeText(buildBookingMessageText(record));
      onNotify('Booking slip copied to clipboard!');
    } catch {
      onNotify('Unable to copy automatically. Use the Open WhatsApp button below.', true);
    }
  };

  const handleResetForm = () => {
    setPatientName('');
    setPhone('');
    onServiceChange('Blood Test');
    setVisitType('Lab Visit');
    onTestDetailsChange('');
    setPreferredDate(todayStr);
    setPreferredTime(TIME_SLOTS[0].value);
    setNotes('');
    setFormError(null);
    setConfirmedSlip(null);
  };

  const handleClearHistory = () => {
    setBookingHistory([]);
    try {
      localStorage.removeItem(BOOKING_HISTORY_STORAGE_KEY);
    } catch {
      // Ignore
    }
    onNotify('Local booking history cleared.');
  };

  return (
    <section
      id="booking"
      className="py-12 sm:py-20 bg-gradient-to-b from-slate-100 to-slate-50 border-y border-slate-200"
    >
      <div className="max-w-4xl mx-auto px-3 sm:px-6">
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10 px-1">
          <p className="text-teal-700 font-semibold text-sm">Instant Registration</p>
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold text-navy-900 mt-1.5 text-balance">
            Online Appointment Booking
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed">
            Fill out the form below to book your test or scan. Your details are formatted into a
            WhatsApp booking slip for immediate confirmation.
          </p>
        </div>

        {/* Booking Form Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          {/* Card Header */}
          <div className="bg-navy-900 text-white px-4 sm:px-8 py-4 sm:py-5 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-300 shrink-0">
                <WhatsAppIcon className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <h3 className="font-display font-bold text-base sm:text-lg">
                  Patient WhatsApp Booking Form
                </h3>
                <p className="text-xs text-slate-300">
                  Direct Booking to Lab WhatsApp ({LAB_PHONE_DISPLAY}) · Seedha WhatsApp Par Booking
                  Bhejein
                </p>
              </div>
            </div>
            <span className="text-xs text-emerald-200 font-medium whitespace-nowrap">
              Instant WhatsApp Confirmation
            </span>
          </div>

          <form onSubmit={handleSubmit} className="p-4 sm:p-8 space-y-5 sm:space-y-6" noValidate>
            {formError && (
              <div
                role="alert"
                className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-sm font-medium flex items-center gap-2.5"
              >
                <X className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid sm:grid-cols-2 gap-5">
              {/* Patient Name */}
              <div>
                <label
                  htmlFor="patientName"
                  className="block text-sm font-semibold text-navy-900 mb-1.5"
                >
                  Patient Name <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                    <User className="w-4 h-4" />
                  </span>
                  <input
                    ref={patientNameInputRef}
                    type="text"
                    id="patientName"
                    value={patientName}
                    onChange={(e) => setPatientName(e.target.value)}
                    required
                    placeholder="e.g. Muhammad Ali"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 outline-none transition-colors duration-150 text-sm"
                  />
                </div>
              </div>

              {/* Phone / WhatsApp */}
              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-navy-900 mb-1.5">
                  Phone / WhatsApp Number <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                    <WhatsAppIcon className="w-4 h-4" />
                  </span>
                  <input
                    type="tel"
                    id="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="e.g. 0300-1234567"
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 outline-none transition-colors duration-150 text-sm font-mono tabular-nums"
                  />
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {/* Service Type */}
              <div>
                <label
                  htmlFor="serviceType"
                  className="block text-sm font-semibold text-navy-900 mb-1.5"
                >
                  Service Type <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                    <Stethoscope className="w-4 h-4" />
                  </span>
                  <select
                    id="serviceType"
                    value={selectedService}
                    onChange={(e) => onServiceChange(e.target.value as ServiceType)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 outline-none transition-colors duration-150 text-sm bg-white"
                  >
                    <option value="Blood Test">Blood Test</option>
                    <option value="X-Ray">X-Ray</option>
                    <option value="Ultrasound">Ultrasound</option>
                  </select>
                </div>
              </div>

              {/* Visit Type */}
              <div>
                <label
                  htmlFor="visitType"
                  className="block text-sm font-semibold text-navy-900 mb-1.5"
                >
                  Visit Type <span className="text-rose-600">*</span>
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                    <Home className="w-4 h-4" />
                  </span>
                  <select
                    id="visitType"
                    value={visitType}
                    onChange={(e) => setVisitType(e.target.value as VisitType)}
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 outline-none transition-colors duration-150 text-sm bg-white"
                  >
                    <option value="Lab Visit">Lab Visit (Come to Center)</option>
                    <option value="Home Sample">Home Sample Collection</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Test / Scan Details */}
            <div>
              <label
                htmlFor="testDetails"
                className="block text-sm font-semibold text-navy-900 mb-1.5"
              >
                Test / Scan Details <span className="text-rose-600">*</span>
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center text-slate-400 pointer-events-none">
                  <FlaskConical className="w-4 h-4" />
                </span>
                <input
                  type="text"
                  id="testDetails"
                  value={testDetails}
                  onChange={(e) => onTestDetailsChange(e.target.value)}
                  required
                  placeholder="e.g. CBC, Blood Sugar Fasting, Chest X-Ray, Abdomen Ultrasound"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 outline-none transition-colors duration-150 text-sm"
                />
              </div>

              {/* Quick-Add Buttons */}
              <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                <span className="text-xs text-slate-500 mr-1 py-1">Quick add:</span>
                {QUICK_ADD_TESTS.map((testName) => (
                  <button
                    key={testName}
                    type="button"
                    onClick={() => onAppendTest(testName)}
                    className="text-xs bg-slate-100 hover:bg-teal-100 text-slate-700 hover:text-teal-900 px-2.5 py-1.5 rounded-lg transition-colors duration-150 whitespace-nowrap"
                  >
                    + {testName}
                  </button>
                ))}
              </div>

              {/* Saved Custom Tests */}
              {savedCustomTests.length > 0 && (
                <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                  <span className="text-xs font-semibold text-teal-700 mr-1 py-1 inline-flex items-center gap-1">
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Saved Custom Tests:</span>
                  </span>
                  {savedCustomTests.map((test) => (
                    <span
                      key={test}
                      className="inline-flex items-center bg-teal-50 border border-teal-200 text-teal-900 rounded-lg text-xs overflow-hidden"
                    >
                      <button
                        type="button"
                        onClick={() => onAppendTest(test)}
                        className="hover:bg-teal-100 px-2.5 py-1.5 font-medium transition-colors duration-150 whitespace-nowrap"
                      >
                        + {test}
                      </button>
                      <button
                        type="button"
                        onClick={() => handleRemoveCustomTest(test)}
                        title={`Remove ${test}`}
                        aria-label={`Remove ${test}`}
                        className="hover:bg-rose-100 text-teal-700 hover:text-rose-700 px-2 py-1.5 border-l border-teal-200 transition-colors duration-150"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </span>
                  ))}
                </div>
              )}

              {/* Custom Test Entry */}
              <div className="mt-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-2.5">
                  <label
                    htmlFor="customTestNameInput"
                    className="text-xs font-bold text-navy-900 flex items-center gap-1.5"
                  >
                    <PlusCircle className="w-4 h-4 text-teal-600 shrink-0" />
                    <span>Test not in list? Enter Custom Test / Scan Name</span>
                  </label>
                  <span className="text-xs text-slate-500">
                    Adds to booking &amp; optionally saves for future
                  </span>
                </div>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    id="customTestNameInput"
                    value={customTestInput}
                    onChange={(e) => setCustomTestInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddCustomTest(false);
                      }
                    }}
                    placeholder="e.g. HbA1c, Dengue Serology, Pelvis Ultrasound..."
                    className="flex-1 px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 outline-none transition-colors duration-150 text-xs sm:text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => handleAddCustomTest(false)}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-navy-900 border border-slate-300 font-semibold text-xs sm:text-sm transition-colors duration-150 shrink-0 whitespace-nowrap"
                  >
                    Use Once
                  </button>
                  <button
                    type="button"
                    onClick={() => handleAddCustomTest(true)}
                    className="px-4 py-2.5 rounded-xl bg-teal-600 hover:bg-teal-700 text-white font-semibold text-xs sm:text-sm transition-colors duration-150 shrink-0 inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
                  >
                    <Save className="w-3.5 h-3.5 shrink-0" />
                    <span>Save &amp; Add Test</span>
                  </button>
                </div>
                {customTestFeedback && (
                  <p
                    className={`text-xs mt-2 font-medium ${
                      customTestFeedback.isError ? 'text-rose-600' : 'text-emerald-700'
                    }`}
                  >
                    {customTestFeedback.text}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
              {/* Preferred Date */}
              <div className="min-w-0">
                <label
                  htmlFor="preferredDate"
                  className="block text-sm font-semibold text-navy-900 mb-1.5"
                >
                  Preferred Date <span className="text-rose-600">*</span>
                </label>
                <input
                  type="date"
                  id="preferredDate"
                  value={preferredDate}
                  min={todayStr}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  required
                  className="w-full min-w-0 px-4 py-3 rounded-xl border border-slate-300 bg-white focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 outline-none transition-colors duration-150 text-sm font-mono tabular-nums"
                />
              </div>

              {/* Preferred Time */}
              <div className="min-w-0">
                <label
                  htmlFor="preferredTime"
                  className="block text-sm font-semibold text-navy-900 mb-1.5"
                >
                  Preferred Time <span className="text-rose-600">*</span>
                </label>
                <select
                  id="preferredTime"
                  value={preferredTime}
                  onChange={(e) => setPreferredTime(e.target.value)}
                  required
                  className="w-full min-w-0 px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 outline-none transition-colors duration-150 text-sm bg-white"
                >
                  {TIME_SLOTS.map((slot) => (
                    <option key={slot.value} value={slot.value}>
                      {slot.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Notes / Home Address */}
            <div>
              <label htmlFor="notes" className="block text-sm font-semibold text-navy-900 mb-1.5">
                Notes / Home Address{' '}
                {visitType === 'Home Sample' ? (
                  <span className="text-rose-600">* (Required for Home Sample)</span>
                ) : (
                  <span className="text-slate-500 font-normal">(If Home Sample)</span>
                )}
              </label>
              <textarea
                id="notes"
                rows={3}
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Write complete home address for home sample collection, or any doctor prescription notes..."
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-teal-600 focus:ring-2 focus:ring-teal-500/20 outline-none transition-colors duration-150 text-sm"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-1">
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-teal-600 text-white font-bold py-4 px-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-150 flex items-center justify-center gap-2.5 text-sm sm:text-base focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:ring-offset-2"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>Send Booking on WhatsApp (WhatsApp Par Booking Bhejein)</span>
              </button>
              <p className="text-center text-xs text-slate-500 mt-2.5">
                Form submit karte hi aapki booking slip tayyar ho jayegi aur seedha lab ke WhatsApp
                number <strong className="font-mono tabular-nums">{LAB_PHONE_DISPLAY}</strong> par
                bhej sakte hain.
              </p>
            </div>
          </form>

          {/* Booking Confirmation Slip */}
          {confirmedSlip && (
            <div
              ref={slipRef}
              className="mx-4 sm:mx-8 mb-6 sm:mb-8 p-4 sm:p-5 rounded-xl border bg-emerald-50 border-emerald-200 text-emerald-950"
            >
              <div className="flex flex-col sm:flex-row items-start gap-3.5 sm:gap-4">
                <div className="flex items-center gap-3 shrink-0">
                  <div className="bg-white p-2 rounded-xl border border-emerald-100">
                    <BrandMark variant="compact" />
                  </div>
                  <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                </div>

                <div className="flex-1 min-w-0 w-full">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h4 className="font-display font-bold text-base text-emerald-950">
                      Booking Slip Ready &amp; Opening WhatsApp
                    </h4>
                    <span className="font-mono text-xs font-semibold text-emerald-800 tabular-nums">
                      Ref: {confirmedSlip.id}
                    </span>
                  </div>

                  <p className="text-sm mt-1 leading-relaxed text-emerald-900">
                    Shukriya {confirmedSlip.patientName}! Aapki booking details tayyar hain.
                    WhatsApp mein &ldquo;Send&rdquo; button dabayein taake aapki booking seedha
                    SMDC Lab ({LAB_PHONE_DISPLAY}) ko mil jaye.
                  </p>

                  <div className="mt-3 p-3.5 rounded-xl bg-white border border-emerald-200 text-xs sm:text-sm space-y-1.5 text-slate-700 break-words">
                    <div>
                      <strong>Patient:</strong> {confirmedSlip.patientName} (
                      <span className="font-mono tabular-nums">{confirmedSlip.phone}</span>)
                    </div>
                    <div>
                      <strong>Service &amp; Tests:</strong> {confirmedSlip.serviceType} —{' '}
                      {confirmedSlip.testDetails}
                    </div>
                    <div>
                      <strong>Date &amp; Time:</strong>{' '}
                      <span className="font-mono tabular-nums">{confirmedSlip.preferredDate}</span>{' '}
                      · {confirmedSlip.preferredTime}
                    </div>
                    <div>
                      <strong>Visit Type:</strong> {confirmedSlip.visitType}
                    </div>
                    {confirmedSlip.notes && (
                      <div>
                        <strong>Notes / Address:</strong> {confirmedSlip.notes}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 flex flex-col sm:flex-row flex-wrap gap-2.5">
                    <a
                      href={buildWhatsAppBookingUrl(confirmedSlip)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 py-2.5 rounded-xl text-sm transition-colors duration-150 whitespace-nowrap"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Open WhatsApp &amp; Send Now</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => handleCopySlip(confirmedSlip)}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-navy-900 border border-slate-300 font-medium px-4 py-2.5 rounded-xl text-sm transition-colors duration-150 whitespace-nowrap"
                    >
                      <ClipboardCopy className="w-4 h-4 shrink-0" />
                      <span>Copy Slip</span>
                    </button>
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-100 text-slate-700 border border-slate-300 font-medium px-4 py-2.5 rounded-xl text-sm transition-colors duration-150 whitespace-nowrap"
                    >
                      <span>Book Another Test</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Recent Bookings on This Device */}
          {bookingHistory.length > 0 && (
            <div className="mx-4 sm:mx-8 mb-6 sm:mb-8 pt-6 border-t border-slate-200">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <h4 className="text-sm font-bold text-navy-900 flex items-center gap-2">
                  <History className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Recent Bookings on This Device (Apki Pichli Bookings)</span>
                </h4>
                <button
                  type="button"
                  onClick={handleClearHistory}
                  className="text-xs text-slate-500 hover:text-rose-600 font-medium transition-colors duration-150 whitespace-nowrap"
                >
                  Clear History
                </button>
              </div>
              <div className="space-y-2.5">
                {bookingHistory.map((item) => (
                  <div
                    key={item.id}
                    className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                  >
                    <div className="space-y-0.5 text-xs min-w-0 break-words">
                      <p className="font-bold text-navy-900 text-sm">
                        {item.patientName}{' '}
                        <span className="font-mono font-normal text-slate-500 tabular-nums">
                          ({item.phone})
                        </span>
                      </p>
                      <p className="text-teal-700 font-semibold">
                        {item.serviceType}:{' '}
                        <span className="text-slate-700 font-normal">{item.testDetails}</span>
                      </p>
                      <p className="text-slate-500 tabular-nums">
                        {item.preferredDate} · {item.preferredTime} · {item.visitType}
                      </p>
                    </div>
                    <a
                      href={buildWhatsAppBookingUrl(item)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto shrink-0 inline-flex items-center justify-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-3.5 py-2.5 rounded-xl text-xs transition-colors duration-150 whitespace-nowrap"
                    >
                      <WhatsAppIcon className="w-4 h-4" />
                      <span>Resend on WhatsApp</span>
                    </a>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
