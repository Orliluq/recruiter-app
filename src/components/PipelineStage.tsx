import React from 'react';
import { Candidate, STAGE_CONFIG, type Stage } from '@/types/recruiter';
import { DraggableCandidateCard } from './DraggableCandidateCard';

interface PipelineStageProps {
  stage: Stage;
  candidates: Candidate[];
  onStageChange: (candidateId: string, newStage: string) => void;
  draggedCandidate: any;
  setDraggedCandidate: (candidate: any) => void;
}

export const PipelineStage: React.FC<PipelineStageProps> = ({ 
  stage, 
  candidates, 
  onStageChange,
  draggedCandidate,
  setDraggedCandidate
}) => {
  const stageConfig = STAGE_CONFIG[stage];
  const [isDragOver, setIsDragOver] = React.useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    try {
      const data = JSON.parse(e.dataTransfer.getData('text/plain'));
      if (data.candidateId && data.currentStage !== stage) {
        onStageChange(data.candidateId, stage);
      }
    } catch (error) {
      console.error('Error parsing drop data:', error);
    }
  };

  const handleDragEnd = () => {
    setDraggedCandidate(null);
    setIsDragOver(false);
  };

  return (
    <div
      className="flex flex-col w-80 h-full min-w-80"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Stage Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-card/50 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${STAGE_CONFIG[stage].color}`}></div>
          <h3 className="font-semibold text-sm text-foreground">{stageConfig.label}</h3>
        </div>
        <span className="text-xs text-muted-foreground bg-background px-2 py-1 rounded-full flex-shrink-0">
          {candidates.length}
        </span>
      </div>

      {/* Candidates List */}
      <div 
        className={`flex-1 p-4 space-y-3 overflow-y-auto transition-all duration-200 ${
          isDragOver ? 'bg-primary/5 border-2 border-dashed border-primary/30 rounded-lg' : ''
        }`}
      >
        {candidates.length === 0 ? (
          <div className={`text-center py-8 text-muted-foreground text-sm ${
            isDragOver ? 'text-primary' : ''
          }`}>
            {isDragOver ? 'Suelta aquí' : 'Sin candidatos'}
          </div>
        ) : (
          candidates.map((candidate) => (
            <DraggableCandidateCard
              key={candidate.id}
              candidate={candidate}
              onStageChange={onStageChange}
              isDragging={draggedCandidate?.candidateId === candidate.id}
            />
          ))
        )}
      </div>
    </div>
  );
};
