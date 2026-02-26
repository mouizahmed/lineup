import {
  CalendarClock,
  ClipboardList,
  Bell,
  LayoutDashboard,
  Users,
  Clock,
  GraduationCap,
  Ticket,
  Briefcase,
  Building2,
  Stethoscope,
  ShoppingBag,
  Scale,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

export type Feature = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type UseCase = {
  icon: LucideIcon;
  title: string;
  description: string;
};

export type Step = {
  number: string;
  title: string;
  description: string;
};

export type Category = {
  id: string;
  label: string;
};

export type ServiceStatus = "open" | "busy" | "closed";

export type MockService = {
  id: string;
  name: string;
  organization: string;
  category: string;
  status: ServiceStatus;
  queueLength?: number;
  waitMinutes?: number;
  nextSlot?: string;
  location: string;
  icon: LucideIcon;
};

export const categories: Category[] = [
  { id: "all", label: "All" },
  { id: "healthcare", label: "Healthcare" },
  { id: "government", label: "Government" },
  { id: "education", label: "Education" },
  { id: "retail", label: "Retail" },
  { id: "professional", label: "Professional" },
  { id: "events", label: "Events" },
];

export const mockServices: MockService[] = [
  {
    id: "1",
    name: "Walk-In Clinic",
    organization: "Maple Health Centre",
    category: "healthcare",
    status: "open",
    queueLength: 4,
    waitMinutes: 18,
    location: "123 Maple St, Toronto",
    icon: Stethoscope,
  },
  {
    id: "2",
    name: "Driver's Licence Renewal",
    organization: "ServiceOntario",
    category: "government",
    status: "busy",
    queueLength: 11,
    waitMinutes: 45,
    location: "55 King St W, Hamilton",
    icon: Building2,
  },
  {
    id: "3",
    name: "Genius Bar",
    organization: "Apple Eaton Centre",
    category: "retail",
    status: "open",
    nextSlot: "Today 3:15 PM",
    location: "220 Yonge St, Toronto",
    icon: ShoppingBag,
  },
  {
    id: "4",
    name: "Academic Advising",
    organization: "Lassonde School of Engineering",
    category: "education",
    status: "open",
    queueLength: 3,
    waitMinutes: 12,
    location: "Bergeron Centre, Room 2050",
    icon: GraduationCap,
  },
  {
    id: "5",
    name: "Free Legal Clinic",
    organization: "Downtown Legal Services",
    category: "professional",
    status: "open",
    nextSlot: "Tomorrow 10:00 AM",
    location: "84 Queen St, Toronto",
    icon: Scale,
  },
  {
    id: "6",
    name: "Conference Registration",
    organization: "Toronto Tech Summit",
    category: "events",
    status: "closed",
    location: "Metro Toronto Convention Centre",
    icon: Ticket,
  },
];

export const features: Feature[] = [
  {
    icon: ClipboardList,
    title: "Virtual Queue",
    description:
      "Join a queue from anywhere. See your live position and estimated wait time without standing in line.",
  },
  {
    icon: CalendarClock,
    title: "Appointment Booking",
    description:
      "Book a confirmed timeslot in advance. Receive automatic reminders and check-in when you arrive.",
  },
  {
    icon: Bell,
    title: "Real-Time Notifications",
    description:
      "Get notified the moment your number is called or your appointment is ready — in-app or by email.",
  },
  {
    icon: LayoutDashboard,
    title: "Staff Dashboard",
    description:
      "Call the next person, handle no-shows, and pause the queue — all from a single, clear interface.",
  },
  {
    icon: Users,
    title: "Multi-Service Support",
    description:
      "One platform manages all your organization's services — appointments, walk-ins, events, and more.",
  },
  {
    icon: Clock,
    title: "Flexible Handoff",
    description:
      "Route customers to a physical location or a virtual meeting link — your service, your channel.",
  },
];

export const useCases: UseCase[] = [
  {
    icon: Stethoscope,
    title: "Healthcare Clinics",
    description:
      "Patients join a virtual queue from their phone instead of waiting in a crowded waiting room.",
  },
  {
    icon: Building2,
    title: "Government Offices",
    description:
      "Service centres eliminate physical line-ups for permit renewals, licencing, and registrations.",
  },
  {
    icon: GraduationCap,
    title: "Education Services",
    description:
      "Advising centres, tutoring labs, and office hours run smoothly with live queue visibility.",
  },
  {
    icon: Briefcase,
    title: "Professional Services",
    description:
      "Law firms, financial advisors, and consultants let clients book or queue without phone calls.",
  },
];

export const steps: Step[] = [
  {
    number: "01",
    title: "Find a Service",
    description:
      "Browse services near you or search by organization, category, or name.",
  },
  {
    number: "02",
    title: "Join or Book",
    description:
      "Join the live queue for immediate access or pick a scheduled appointment slot.",
  },
  {
    number: "03",
    title: "Wait Anywhere",
    description:
      "Leave the area and return when notified. Your spot is held and your time is respected.",
  },
  {
    number: "04",
    title: "Get Served",
    description:
      "Receive handoff details and start your session on time, every time.",
  },
];
