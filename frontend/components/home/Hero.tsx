"use client";

import { useState, useCallback } from "react";
import { Search, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "./home-data";

type HeroProps = {
  onSearch?: (query: string) => void;
  onCategoryChange?: (categoryId: string) => void;
};

export function Hero({ onSearch, onCategoryChange }: HeroProps) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const handleCategoryClick = useCallback(
    (id: string) => {
      setActiveCategory(id);
      onCategoryChange?.(id);
    },
    [onCategoryChange]
  );

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      onSearch?.(query);
    },
    [onSearch, query]
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-muted/60 to-background pb-16 pt-32">
      {/* subtle grid texture */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,hsl(var(--border))_1px,transparent_1px),linear-gradient(to_bottom,hsl(var(--border))_1px,transparent_1px)] bg-[size:48px_48px] opacity-40"
      />

      <div className="relative mx-auto max-w-4xl px-4 sm:px-6">
        {/* heading */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
            Skip the wait. Join any queue.
          </h1>
          <p className="mt-3 text-base text-muted-foreground">
            Find a service, join a virtual queue or book an appointment — from
            anywhere, for any organization.
          </p>
        </div>

        {/* search bar */}
        <form
          onSubmit={handleSearch}
          className="flex flex-col items-stretch gap-2 rounded-2xl border border-border bg-background p-2 shadow-sm sm:flex-row sm:items-center"
        >
          <div className="flex flex-1 items-center gap-2 rounded-xl px-4 py-2">
            <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              type="text"
              placeholder="City, organization, or address"
              className="w-32 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none sm:w-44"
            />
            <div className="mx-2 h-4 w-px bg-border" />
            <Search className="h-4 w-4 shrink-0 text-muted-foreground" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search services, organizations..."
              className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>
          <Button type="submit" size="lg" className="rounded-xl">
            Search
          </Button>
        </form>

        {/* category pills */}
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {categories.map(({ id, label }) => (
            <Button
              key={id}
              type="button"
              size="sm"
              variant={activeCategory === id ? "default" : "outline"}
              className="rounded-full"
              onClick={() => handleCategoryClick(id)}
            >
              {label}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
}
