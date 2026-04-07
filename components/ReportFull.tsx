import {
  AlertTriangle,
  BriefcaseBusiness,
  CircleDollarSign,
  Cpu,
  Crosshair,
  LineChart,
  Users
} from "lucide-react";

import { RiskBadge } from "@/components/RiskBadge";
import { ScoreBadge } from "@/components/ScoreBadge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { IdeaRecord } from "@/types";

function leadSentence(value: string) {
  const sentence = value.split(/(?<=[.!?])\s+/)[0]?.trim();
  return sentence && sentence.length > 0 ? sentence : value;
}

function ReportSection({
  icon: Icon,
  title,
  content,
  className
}: {
  icon: typeof Crosshair;
  title: string;
  content: string;
  className?: string;
}) {
  return (
    <section className={className}>
      <div className="mb-4 flex items-center gap-3">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl border bg-muted text-foreground">
          <Icon className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-xl font-semibold tracking-tight text-foreground">{title}</h3>
          <div className="mt-2 h-px w-16 bg-foreground/15" />
        </div>
      </div>
      <p className="text-sm leading-8 text-muted-foreground">{content}</p>
    </section>
  );
}

export function ReportFull({ idea }: { idea: IdeaRecord }) {
  return (
    <div className="space-y-8">
      <Card className="overflow-hidden">
        <CardHeader className="gap-6 border-b bg-muted/20">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="max-w-3xl space-y-3">
              <p className="text-sm uppercase tracking-[0.24em] text-muted-foreground">Validation Report</p>
              <CardTitle className="text-3xl leading-tight md:text-4xl">{idea.idea_text}</CardTitle>
              <p className="text-sm text-muted-foreground">
                Generated on {new Date(idea.created_at).toLocaleString()}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <ScoreBadge score={idea.profit_score} />
              <RiskBadge level={idea.risk_level} />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-xl border border-zinc-200 bg-background p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Problem Summary
              </p>
              <p className="mt-3 text-sm leading-6 text-foreground">{leadSentence(idea.problem)}</p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                Market Overview
              </p>
              <p className="mt-3 text-sm leading-6 text-foreground">{leadSentence(idea.market)}</p>
            </div>
            <div className="rounded-xl border border-sky-200 bg-sky-50/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-700">
                Competitor Pressure
              </p>
              <p className="mt-3 text-sm leading-6 text-foreground">{leadSentence(idea.competitors)}</p>
            </div>
            <div className="rounded-xl border border-amber-200 bg-amber-50/80 p-4">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-700">
                Profitability Read
              </p>
              <p className="mt-3 text-sm leading-6 text-foreground">{leadSentence(idea.profit_reasoning ?? "")}</p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-10 p-6 md:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-3 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-rose-100 text-rose-700">
                <AlertTriangle className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-rose-700">Risk Level</p>
                <p className="text-sm text-foreground">
                  This idea is currently rated <span className="font-semibold">{idea.risk_level}</span> risk.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-amber-700">
                <CircleDollarSign className="h-4 w-4" />
              </span>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-amber-700">Profitability Score</p>
                <p className="text-sm text-foreground">
                  Scored <span className="font-semibold">{idea.profit_score}/100</span> based on market, moat, and execution reality.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-10 lg:grid-cols-2 lg:gap-x-12">
            <ReportSection icon={Crosshair} title="Problem" content={idea.problem} />
            <ReportSection icon={Users} title="Target Customer" content={idea.customer} />
            <ReportSection icon={LineChart} title="Market Opportunity" content={idea.market} />
            <ReportSection icon={BriefcaseBusiness} title="Competitors" content={idea.competitors} />
          </div>

          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-x-12">
            <ReportSection icon={Cpu} title="Suggested Tech Stack" content={idea.tech_stack} />
            <ReportSection
              icon={CircleDollarSign}
              title="Profitability Rationale"
              content={idea.profit_reasoning ?? ""}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
