"use client";

import { useState, useRef, useEffect } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

type DietaryTag =
  | "Vegan"
  | "Vegetarian"
  | "Gluten-Free"
  | "Dairy-Free"
  | "Keto"
  | "Paleo";

type MealType = "Breakfast" | "Lunch" | "Dinner" | "Snack" | "Dessert";

type CookTime = "< 15 min" | "< 30 min" | "< 1 hour" | "Any";

type Difficulty = "Easy" | "Medium" | "Hard";

interface RecipeFilters {
  dietary: DietaryTag[];
  mealType: MealType | null;
  cookTime: CookTime;
  difficulty: Difficulty | null;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const DIETARY_TAGS: DietaryTag[] = [
  "Vegan",
  "Vegetarian",
  "Gluten-Free",
  "Dairy-Free",
  "Keto",
  "Paleo",
];

const MEAL_TYPES: MealType[] = [
  "Breakfast",
  "Lunch",
  "Dinner",
  "Snack",
  "Dessert",
];

const COOK_TIMES: CookTime[] = ["< 15 min", "< 30 min", "< 1 hour", "Any"];

const DIFFICULTIES: Difficulty[] = ["Easy", "Medium", "Hard"];

const MEAL_ICONS: Record<MealType, string> = {
  Breakfast: "☀️",
  Lunch: "🌤️",
  Dinner: "🌙",
  Snack: "🍎",
  Dessert: "🍰",
};

// ─── Component ────────────────────────────────────────────────────────────────

export default function RecipeSearch() {
  const [query, setQuery] = useState("");
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState<RecipeFilters>({
    dietary: [],
    mealType: null,
    cookTime: "Any",
    difficulty: null,
  });
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const activeFilterCount =
    filters.dietary.length +
    (filters.mealType ? 1 : 0) +
    (filters.cookTime !== "Any" ? 1 : 0) +
    (filters.difficulty ? 1 : 0);

  // Close panel on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(e.target as Node)
      ) {
        setFiltersOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const toggleDietary = (tag: DietaryTag) =>
    setFilters((f) => ({
      ...f,
      dietary: f.dietary.includes(tag)
        ? f.dietary.filter((d) => d !== tag)
        : [...f.dietary, tag],
    }));

  const clearAll = () =>
    setFilters({ dietary: [], mealType: null, cookTime: "Any", difficulty: null });

  const handleSearch = () => {
    console.log("Search:", { query, filters });
  };

  return (
    <div className="min-h-screen bg-[#faf7f2] flex items-center justify-center p-6 font-sans">
      {/* ── Scoped font import ── */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');

        .recipe-display { font-family: 'Cormorant Garamond', serif; }
        .recipe-body    { font-family: 'DM Sans', sans-serif; }

        .filter-pill {
          transition: all 0.18s ease;
        }
        .filter-pill:hover {
          transform: translateY(-1px);
        }
        .filter-pill.active {
          box-shadow: 2px 2px 0px #2d2d2d;
        }

        .search-bar {
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
        }
        .search-bar.focused {
          box-shadow: 4px 4px 0px #2d2d2d;
        }

        .filter-panel {
          animation: slideDown 0.22s cubic-bezier(0.4,0,0.2,1);
          transform-origin: top;
        }
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-8px) scaleY(0.97); }
          to   { opacity: 1; transform: translateY(0) scaleY(1); }
        }

        .search-btn {
          transition: all 0.18s ease;
        }
        .search-btn:hover {
          transform: translateY(-1px);
          box-shadow: 3px 3px 0px #2d2d2d;
        }
        .search-btn:active {
          transform: translateY(0);
          box-shadow: 1px 1px 0px #2d2d2d;
        }
      `}</style>

      <div className="w-full max-w-2xl recipe-body" ref={panelRef}>

        {/* ── Heading ── */}
        <div className="mb-8 text-center">
          <p className="text-xs uppercase tracking-[0.25em] text-stone-400 mb-2 recipe-body font-medium">
            Find your next meal
          </p>
          <h1 className="recipe-display text-5xl text-stone-800 leading-tight">
            Recipe Search
          </h1>
          <div className="mt-3 flex justify-center gap-1.5">
            <span className="block w-8 h-px bg-amber-400"></span>
            <span className="block w-2 h-px bg-stone-300"></span>
            <span className="block w-2 h-px bg-stone-300"></span>
          </div>
        </div>

        {/* ── Search bar row ── */}
        <div className="flex gap-2">
          <div
            className={`flex-1 flex items-center gap-3 px-4 py-3.5 bg-white border-2 border-stone-800 rounded-none search-bar ${
              focused ? "focused" : ""
            }`}
          >
            {/* Magnifier */}
            <svg
              className="w-4 h-4 text-stone-400 shrink-0"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" strokeLinecap="round" />
            </svg>

            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setFocused(true)}
              onBlur={() => setFocused(false)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              placeholder="Search recipes, ingredients, cuisines…"
              className="flex-1 bg-transparent text-stone-800 placeholder-stone-300 text-sm outline-none recipe-body"
            />

            {query && (
              <button
                onClick={() => setQuery("")}
                className="text-stone-300 hover:text-stone-500 transition-colors"
              >
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path d="M18 6 6 18M6 6l12 12" strokeLinecap="round" />
                </svg>
              </button>
            )}
          </div>

          {/* Filter toggle */}
          <button
            onClick={() => setFiltersOpen((o) => !o)}
            className={`relative px-4 border-2 border-stone-800 transition-all duration-150 ${
              filtersOpen
                ? "bg-stone-800 text-white"
                : "bg-white text-stone-700 hover:bg-stone-50"
            }`}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path d="M3 6h18M7 12h10M11 18h2" strokeLinecap="round" />
            </svg>
            {activeFilterCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 rounded-full bg-amber-400 text-stone-900 text-[9px] font-bold flex items-center justify-center recipe-body">
                {activeFilterCount}
              </span>
            )}
          </button>

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="px-5 py-3 bg-stone-800 text-white text-sm font-medium border-2 border-stone-800 search-btn recipe-body tracking-wide"
          >
            Search
          </button>
        </div>

        {/* ── Filter Panel ── */}
        {filtersOpen && (
          <div className="mt-2 bg-white border-2 border-stone-800 p-6 filter-panel shadow-[4px_4px_0px_#2d2d2d]">

            {/* Header row */}
            <div className="flex items-center justify-between mb-5">
              <span className="text-xs uppercase tracking-[0.2em] text-stone-400 recipe-body font-medium">
                Filters
              </span>
              {activeFilterCount > 0 && (
                <button
                  onClick={clearAll}
                  className="text-xs text-amber-600 hover:text-amber-800 recipe-body underline underline-offset-2 transition-colors"
                >
                  Clear all
                </button>
              )}
            </div>

            <div className="space-y-6">

              {/* Dietary */}
              <section>
                <p className="text-xs font-medium text-stone-500 recipe-body mb-3 uppercase tracking-wider">
                  Dietary
                </p>
                <div className="flex flex-wrap gap-2">
                  {DIETARY_TAGS.map((tag) => {
                    const on = filters.dietary.includes(tag);
                    return (
                      <button
                        key={tag}
                        onClick={() => toggleDietary(tag)}
                        className={`filter-pill px-3 py-1.5 text-xs border-2 recipe-body font-medium transition-colors ${
                          on
                            ? "active bg-stone-800 border-stone-800 text-white"
                            : "bg-white border-stone-300 text-stone-600 hover:border-stone-800"
                        }`}
                      >
                        {tag}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Meal type */}
              <section>
                <p className="text-xs font-medium text-stone-500 recipe-body mb-3 uppercase tracking-wider">
                  Meal Type
                </p>
                <div className="flex flex-wrap gap-2">
                  {MEAL_TYPES.map((type) => {
                    const on = filters.mealType === type;
                    return (
                      <button
                        key={type}
                        onClick={() =>
                          setFilters((f) => ({
                            ...f,
                            mealType: f.mealType === type ? null : type,
                          }))
                        }
                        className={`filter-pill flex items-center gap-1.5 px-3 py-1.5 text-xs border-2 recipe-body font-medium transition-colors ${
                          on
                            ? "active bg-stone-800 border-stone-800 text-white"
                            : "bg-white border-stone-300 text-stone-600 hover:border-stone-800"
                        }`}
                      >
                        <span>{MEAL_ICONS[type]}</span>
                        {type}
                      </button>
                    );
                  })}
                </div>
              </section>

              {/* Cook time + Difficulty side-by-side */}
              <div className="grid grid-cols-2 gap-6">

                {/* Cook time */}
                <section>
                  <p className="text-xs font-medium text-stone-500 recipe-body mb-3 uppercase tracking-wider">
                    Cook Time
                  </p>
                  <div className="flex flex-col gap-2">
                    {COOK_TIMES.map((t) => {
                      const on = filters.cookTime === t;
                      return (
                        <button
                          key={t}
                          onClick={() => setFilters((f) => ({ ...f, cookTime: t }))}
                          className={`flex items-center gap-2 text-xs recipe-body text-left transition-colors ${
                            on ? "text-stone-900 font-medium" : "text-stone-400 hover:text-stone-700"
                          }`}
                        >
                          <span
                            className={`w-3 h-3 rounded-full border-2 flex-shrink-0 transition-colors ${
                              on ? "border-stone-800 bg-stone-800" : "border-stone-300"
                            }`}
                          />
                          {t}
                        </button>
                      );
                    })}
                  </div>
                </section>

                {/* Difficulty */}
                <section>
                  <p className="text-xs font-medium text-stone-500 recipe-body mb-3 uppercase tracking-wider">
                    Difficulty
                  </p>
                  <div className="flex flex-col gap-2">
                    {DIFFICULTIES.map((d) => {
                      const on = filters.difficulty === d;
                      const color =
                        d === "Easy"
                          ? "text-emerald-600"
                          : d === "Medium"
                          ? "text-amber-600"
                          : "text-red-500";
                      return (
                        <button
                          key={d}
                          onClick={() =>
                            setFilters((f) => ({
                              ...f,
                              difficulty: f.difficulty === d ? null : d,
                            }))
                          }
                          className={`flex items-center gap-2 text-xs recipe-body text-left transition-colors ${
                            on ? `font-medium ${color}` : "text-stone-400 hover:text-stone-700"
                          }`}
                        >
                          <span
                            className={`w-3 h-3 rounded-full border-2 flex-shrink-0 transition-colors ${
                              on ? `border-current bg-current` : "border-stone-300"
                            }`}
                          />
                          {d}
                        </button>
                      );
                    })}
                  </div>
                </section>

              </div>
            </div>

            {/* Apply button */}
            <div className="mt-6 pt-5 border-t border-stone-100 flex justify-end">
              <button
                onClick={() => setFiltersOpen(false)}
                className="px-6 py-2.5 bg-amber-400 border-2 border-stone-800 text-stone-900 text-xs font-semibold recipe-body uppercase tracking-widest search-btn"
              >
                Apply Filters
              </button>
            </div>

          </div>
        )}

        {/* ── Active filter summary ── */}
        {activeFilterCount > 0 && !filtersOpen && (
          <div className="mt-3 flex flex-wrap gap-1.5 items-center">
            <span className="text-xs text-stone-400 recipe-body">Active:</span>
            {filters.dietary.map((d) => (
              <span
                key={d}
                className="inline-flex items-center gap-1 px-2 py-0.5 bg-stone-800 text-white text-xs recipe-body"
              >
                {d}
                <button onClick={() => toggleDietary(d)} className="opacity-60 hover:opacity-100">
                  ×
                </button>
              </span>
            ))}
            {filters.mealType && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-stone-800 text-white text-xs recipe-body">
                {MEAL_ICONS[filters.mealType]} {filters.mealType}
                <button
                  onClick={() => setFilters((f) => ({ ...f, mealType: null }))}
                  className="opacity-60 hover:opacity-100"
                >
                  ×
                </button>
              </span>
            )}
            {filters.cookTime !== "Any" && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-stone-800 text-white text-xs recipe-body">
                ⏱ {filters.cookTime}
                <button
                  onClick={() => setFilters((f) => ({ ...f, cookTime: "Any" }))}
                  className="opacity-60 hover:opacity-100"
                >
                  ×
                </button>
              </span>
            )}
            {filters.difficulty && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-stone-800 text-white text-xs recipe-body">
                {filters.difficulty}
                <button
                  onClick={() => setFilters((f) => ({ ...f, difficulty: null }))}
                  className="opacity-60 hover:opacity-100"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        )}

      </div>
    </div>
  );
}