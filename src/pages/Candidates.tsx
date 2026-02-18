import { AppLayout } from "@/components/layout/AppLayout";
import { mockCandidates } from "@/data/mock-data";
import { STAGE_CONFIG } from "@/types/recruiter";
import { Search, Star, MapPin } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Candidates() {
  const [search, setSearch] = useState("");
  const filtered = mockCandidates.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Candidates</h1>
            <p className="text-muted-foreground text-sm mt-1">{mockCandidates.length} total candidates</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search candidates..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 w-64 transition-colors"
            />
          </div>
        </div>

        <div className="glass-card overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="px-4 py-3 font-medium text-muted-foreground text-xs">Name</th>
                <th className="px-4 py-3 font-medium text-muted-foreground text-xs hidden md:table-cell">Title</th>
                <th className="px-4 py-3 font-medium text-muted-foreground text-xs hidden lg:table-cell">Location</th>
                <th className="px-4 py-3 font-medium text-muted-foreground text-xs">Stage</th>
                <th className="px-4 py-3 font-medium text-muted-foreground text-xs hidden sm:table-cell">Rating</th>
                <th className="px-4 py-3 font-medium text-muted-foreground text-xs hidden xl:table-cell">Skills</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => {
                const stage = STAGE_CONFIG[c.stage];
                return (
                  <tr key={c.id} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3">
                      <Link to={`/candidates/${c.id}`} className="font-medium hover:text-primary transition-colors">
                        {c.name}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden md:table-cell">
                      {c.title} <span className="text-muted-foreground/60">@ {c.company}</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground hidden lg:table-cell">
                      <span className="flex items-center gap-1"><MapPin className="h-3 w-3" /> {c.location}</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`badge-stage ${stage.color}`}>{stage.label}</span>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <div className="flex gap-0.5">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star key={i} className={`h-3 w-3 ${i < c.rating ? "text-warning fill-warning" : "text-muted-foreground/20"}`} />
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden xl:table-cell">
                      <div className="flex gap-1">
                        {c.skills.slice(0, 3).map((s) => (
                          <span key={s} className="text-[10px] px-1.5 py-0.5 rounded bg-secondary text-secondary-foreground">{s}</span>
                        ))}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
}
