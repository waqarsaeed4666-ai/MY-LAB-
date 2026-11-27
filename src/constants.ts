import { BookingFormData, ServiceType } from './types';

export const LAB_NAME = 'Samundri Diagnostic Center & Laboratory';
export const LAB_SHORT_NAME = 'SMDC · Samundri';
export const DEFAULT_LOGO_SRC = '/assets/aistudio/14606b6e-e9de-467a-b7b1-23cc9beb8a65_be6f80da.jpg';
export const LAB_PHONE_DISPLAY = '0303-4978903';
export const LAB_PHONE_TEL = '03034978903';
export const LAB_WHATSAPP_NUMBER = '923034978903';
export const LAB_ADDRESS = 'Near Yameen Pharmacy, Opposite THQ Hospital, Gojra Road, Samundri';
export const GOOGLE_MAPS_SEARCH_URL =
  'https://www.google.com/maps/search/?api=1&query=THQ+Hospital+Gojra+Road+Samundri';
export const GOOGLE_MAPS_EMBED_URL =
  'https://maps.google.com/maps?q=THQ%20Hospital%20Gojra%20Road%20Samundri&t=&z=15&ie=UTF8&iwloc=&output=embed';

export const CUSTOM_LOGO_STORAGE_KEY = 'smdc_custom_logo_v2';
export const CUSTOM_TESTS_STORAGE_KEY = 'smdc_saved_custom_tests_v1';
export const BOOKING_HISTORY_STORAGE_KEY = 'samundri_lab_booking_history_v1';

export interface ServiceOffering {
  index: string;
  type: ServiceType;
  title: string;
  description: string;
  tests: string[];
  ctaLabel: string;
  accentClass: string;
  iconBgClass: string;
}

export const SERVICE_OFFERINGS: ServiceOffering[] = [
  {
    index: '01',
    type: 'Blood Test',
    title: 'Computerized Blood Tests',
    description:
      'Complete range of routine and specialized pathology tests with fast, accurate reporting.',
    tests: ['CBC', 'Blood Sugar', 'LFTs', 'RFTs', 'Lipid Profile', 'Thyroid', 'ELISA'],
    ctaLabel: 'Book Blood Test',
    accentClass: 'hover:border-teal-500/50',
    iconBgClass: 'bg-teal-50 text-teal-700',
  },
  {
    index: '02',
    type: 'X-Ray',
    title: 'Digital X-Ray',
    description:
      'High-resolution Digital X-Ray imaging with low radiation exposure and crystal-clear films for accurate diagnosis.',
    tests: ['Chest X-Ray', 'Bone & Joints', 'Spine / KUB', 'Instant Film'],
    ctaLabel: 'Book Digital X-Ray',
    accentClass: 'hover:border-sky-500/50',
    iconBgClass: 'bg-sky-50 text-sky-700',
  },
  {
    index: '03',
    type: 'Ultrasound',
    title: 'Ultrasound Scan',
    description:
      'Detailed diagnostic ultrasound scanning for abdomen, pelvis, pregnancy, and soft tissues with prompt reports.',
    tests: ['Abdomen & Pelvis', 'Obstetric / Obs', 'KUB Scan', 'Thyroid / Breast'],
    ctaLabel: 'Book Ultrasound',
    accentClass: 'hover:border-indigo-500/50',
    iconBgClass: 'bg-indigo-50 text-indigo-700',
  },
];

export const QUICK_ADD_TESTS: string[] = [
  'CBC',
  'Blood Sugar',
  'LFTs',
  'RFTs',
  'Lipid Profile',
  'Thyroid',
  'Chest X-Ray',
  'Abdomen Ultrasound',
];

export const TIME_SLOTS: { value: string; label: string }[] = [
  { value: 'Morning (8:00 AM - 12:00 PM)', label: 'Morning (8:00 AM – 12:00 PM)' },
  { value: 'Afternoon (12:00 PM - 5:00 PM)', label: 'Afternoon (12:00 PM – 5:00 PM)' },
  { value: 'Evening (5:00 PM - 10:00 PM)', label: 'Evening (5:00 PM – 10:00 PM)' },
  { value: 'Night Emergency (After 10:00 PM)', label: 'Night Service (After 10:00 PM)' },
];

export function buildBookingMessageText(formData: BookingFormData): string {
  return (
    `*NEW LAB BOOKING - SMDC SAMUNDRI*\n` +
    `*Samundri Diagnostic Center & Laboratory*\n` +
    `----------------------------------\n` +
    `*Patient Name:* ${formData.patientName}\n` +
    `*Patient Phone:* ${formData.phone}\n` +
    `*Service Type:* ${formData.serviceType}\n` +
    `*Test / Scan:* ${formData.testDetails}\n` +
    `*Preferred Date:* ${formData.preferredDate}\n` +
    `*Preferred Time:* ${formData.preferredTime}\n` +
    `*Visit Type:* ${formData.visitType}\n` +
    (formData.notes ? `*Address / Notes:* ${formData.notes}\n` : '') +
    `----------------------------------\n` +
    `Assalam-o-Alaikum, please confirm my lab booking.`
  );
}

export function buildWhatsAppBookingUrl(formData: BookingFormData): string {
  return `https://wa.me/${LAB_WHATSAPP_NUMBER}?text=${encodeURIComponent(
    buildBookingMessageText(formData)
  )}`;
}

export function buildGeneralWhatsAppUrl(message: string): string {
  return `https://wa.me/${LAB_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
