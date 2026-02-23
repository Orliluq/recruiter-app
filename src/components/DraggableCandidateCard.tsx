import React from 'react';
import { Candidate, STAGE_CONFIG } from '@/types/recruiter';
import { GripVertical, Star, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DraggableCandidateCardProps {
  candidate: Candidate;
  onStageChange: (candidateId: string, newStage: string) => void;
  isDragging?: boolean;
}

export const DraggableCandidateCard: React.FC<DraggableCandidateCardProps> = ({ 
  candidate, 
  onStageChange,
  isDragging = false 
}) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', JSON.stringify({
      candidateId: candidate.id,
      candidateName: candidate.name,
      currentStage: candidate.stage
    }));
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragEnd = (e: React.DragEvent) => {
    // Handle drop logic in parent component
  };

  const stage = STAGE_CONFIG[candidate.stage];

  return (
    <div
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      className={`glass-card p-3 block hover:border-primary/30 transition-all cursor-move group ${
        isDragging ? 'opacity-50 rotate-2' : ''
      }`}
    >
      <div className="flex items-start gap-2">
        <GripVertical className="h-4 w-4 text-muted-foreground/40 mt-0.5 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing" />
        <div className="flex-1 min-w-0">
          <Link
            to={`/candidates/${candidate.id}`}
            className="block"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-sm font-medium truncate group-hover:text-primary transition-colors">
              {candidate.name}
            </p>
            <p className="text-xs text-muted-foreground truncate mt-0.5">
              {candidate.title}
            </p>
            <p className="text-xs text-muted-foreground/70 truncate">{candidate.company}</p>
            <div className="flex items-center gap-2 mt-2">
              <div className="flex items-center gap-0.5">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3 w-3 ${i < candidate.rating ? "text-warning fill-warning" : "text-muted-foreground/30"}`}
                  />
                ))}
              </div>
              <span className={`badge-stage ${stage.color} text-xs`}>
                {stage.label}
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};
