import Link from "next/link";
import { MapPin, Clock, Users, CalendarClock, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { mockServices, type ServiceStatus } from "./home-data";

const statusConfig: Record<
  ServiceStatus,
  { label: string; classes: string }
> = {
  open: {
    label: "Open",
    classes: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/30 dark:text-emerald-400 dark:border-emerald-900",
  },
  busy: {
    label: "Busy",
    classes: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-400 dark:border-amber-900",
  },
  closed: {
    label: "Closed",
    classes: "bg-muted text-muted-foreground border-border",
  },
};

export function ServiceBrowse() {
  return (
    <section className="py-16 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        {/* section header */}
        <div className="mb-8 flex items-baseline justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            Services available now
          </h2>
          <Link
            href="/services"
            className="flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            See all
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* service card grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {mockServices.map((service) => {
            const { label, classes } = statusConfig[service.status];
            const Icon = service.icon;

            return (
              <Link
                key={service.id}
                href={`/services/${service.id}`}
                className={cn(
                  "group flex flex-col rounded-2xl border border-border bg-card p-5 transition-all",
                  "hover:border-foreground/20 hover:shadow-md",
                  service.status === "closed" && "opacity-60"
                )}
              >
                {/* card top row */}
                <div className="mb-4 flex items-start justify-between gap-3">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border bg-muted">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <span
                    className={cn(
                      "rounded-full border px-2.5 py-0.5 text-xs font-medium",
                      classes
                    )}
                  >
                    {label}
                  </span>
                </div>

                {/* name + org */}
                <p className="text-sm font-semibold leading-snug text-foreground group-hover:underline">
                  {service.name}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {service.organization}
                </p>

                {/* divider */}
                <div className="my-4 h-px bg-border" />

                {/* meta row */}
                <div className="mt-auto flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {service.location}
                  </span>

                  {service.queueLength !== undefined && (
                    <span className="flex items-center gap-1">
                      <Users className="h-3 w-3" />
                      {service.queueLength} in queue
                    </span>
                  )}

                  {service.waitMinutes !== undefined && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      ~{service.waitMinutes} min wait
                    </span>
                  )}

                  {service.nextSlot && (
                    <span className="flex items-center gap-1">
                      <CalendarClock className="h-3 w-3" />
                      Next: {service.nextSlot}
                    </span>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
