export type ServiceType = 'Blood Test' | 'X-Ray' | 'Ultrasound';

export type VisitType = 'Lab Visit' | 'Home Sample';

export interface BookingFormData {
  patientName: string;
  phone: string;
  serviceType: ServiceType;
  visitType: VisitType;
  testDetails: string;
  preferredDate: string;
  preferredTime: string;
  notes: string;
}

export interface BookingRecord extends BookingFormData {
  id: string;
  createdAt: string;
}

export interface ToastState {
  message: string;
  isError?: boolean;
}
