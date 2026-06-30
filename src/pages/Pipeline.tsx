import { useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { mockCandidates } from "@/data/mock-data";
import { PIPELINE_STAGES, type Stage, type Candidate } from "@/types/recruiter";
import { PipelineStage } from "@/components/PipelineStage";

export default function Pipeline() {
  const [candidates, setCandidates] = useState<Candidate[]>(mockCandidates);
  const [draggedCandidate, setDraggedCandidate] = useState<any>(null);

  const handleStageChange = (candidateId: string, newStage: string) => {
    setCandidates((prev) =>
      prev.map((candidate) =>
        candidate.id === candidateId
          ? {
              ...candidate,
              stage: newStage as Stage,
              updatedAt: new Date().toISOString(),
            }
          : candidate,
      ),
    );
  };

  // Group candidates by stage
  const candidatesByStage = PIPELINE_STAGES.reduce(
    (acc, stage) => {
      acc[stage] = candidates.filter((candidate) => candidate.stage === stage);
      return acc;
    },
    {} as Record<Stage, Candidate[]>,
  );

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Pipeline</h1>
          <p className="text-muted-foreground text-sm mt-1">
            Arrastra los candidatos para cambiar su etapa • Desplaza
            horizontalmente para ver todo el tablero
          </p>
        </div>

        {/* Kanban Board - Horizontal Scroll */}
        <div className="overflow-x-auto pb-4">
          <div className="flex gap-4 min-w-max px-4 py-2 md:h-[calc(100vh-140px)]">
            {PIPELINE_STAGES.map((stage) => (
              <PipelineStage
                key={stage}
                stage={stage}
                candidates={candidatesByStage[stage] || []}
                onStageChange={handleStageChange}
                draggedCandidate={draggedCandidate}
                setDraggedCandidate={setDraggedCandidate}
              />
            ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
