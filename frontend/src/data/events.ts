export const departments = [] as { id: string; name: string }[]; // Add verified departments only.
export type OrganizerType = 'school' | 'department' | 'club';
export type EventType = '迎新' | '宿營' | '茶會' | '晚會' | '競賽' | '其他';
export type RegistrationStatus = '開放報名' | '尚未開放' | '已截止' | '無須報名';
export interface CampusEvent {
  slug: string;
  title: string;
  date: string; // YYYY-MM-DD
  location: string;
  organizer: string;
  organizerType: OrganizerType;
  departmentId?: string;
  type: EventType;
  registrationStatus: RegistrationStatus;
  description: string;
  sourceUrl?: string;
}
export const events: CampusEvent[] = []; // No unverified event listings.
export const eventTypes: EventType[] = ['迎新','宿營','茶會','晚會','競賽','其他'];
export const organizerTypes: {value: OrganizerType; label: string}[] = [
  {value:'school',label:'學校'}, {value:'department',label:'系學會'}, {value:'club',label:'社團'}
];
