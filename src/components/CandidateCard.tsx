import React, { useState } from 'react';
import { Candidate, DocumentFile } from '@/types/recruiter';
import { Star, MapPin, Mail, Phone, Linkedin, ChevronDown, ChevronUp, Download, Eye, FileText, Briefcase, Award, X } from 'lucide-react';
import { DocumentPreviewModal } from './DocumentPreviewModal';
import { IoLogoLinkedin } from "react-icons/io";

interface CandidateCardProps {
  candidate: Candidate;
  documents?: DocumentFile[];
  onViewDocument?: (document: DocumentFile) => void;
  onDownloadDocument?: (document: DocumentFile) => void;
}

export const CandidateCard: React.FC<CandidateCardProps> = ({ 
  candidate, 
  documents = [], 
  onViewDocument,
  onDownloadDocument 
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedDocument, setSelectedDocument] = useState<DocumentFile | null>(null);

  // Debug: Log documents received
  console.log(`CandidateCard for ${candidate.name} received ${documents.length} documents:`, documents);

  const getDocumentIcon = (type: DocumentFile['type']) => {
    switch (type) {
      case 'resume': return FileText;
      case 'cover': return Briefcase;
      case 'portfolio': return Award;
      default: return FileText;
    }
  };

  const getDocumentLabel = (type: DocumentFile['type']) => {
    switch (type) {
      case 'resume': return 'CV/Resumen';
      case 'cover': return 'Carta de Presentación';
      case 'portfolio': return 'Portfolio';
      default: return 'Documento';
    }
  };

  const handleViewDocument = (doc: DocumentFile) => {
    setSelectedDocument(doc);
    if (onViewDocument) {
      onViewDocument(doc);
    }
  };

  const handleDownloadDocument = (doc: DocumentFile) => {
    if (onDownloadDocument) {
      onDownloadDocument(doc);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="glass-card p-6 hover:border-primary/30 transition-all duration-200 group">
      {/* Candidate Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
            {candidate.name}
          </h3>
          <p className="text-sm text-muted-foreground mt-1">{candidate.title}</p>
          <p className="text-xs text-muted-foreground/70 mt-0.5">{candidate.company}</p>
        </div>
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${i < candidate.rating ? "text-warning fill-warning" : "text-muted-foreground/30"}`}
            />
          ))}
        </div>
      </div>

      {/* Contact Info */}
      <div className="flex flex-wrap gap-4 text-xs text-muted-foreground mb-4">
        <div className="flex items-center gap-1">
          <Mail className="h-3 w-3 text-orange-600 hover:text-orange-700 transition-colors" />
          {candidate.email}
        </div>
        {candidate.phone && (
          <div className="flex items-center gap-1">
            <Phone className="h-3 w-3 text-yellow-600 hover:text-yellow-700 transition-colors" />
            {candidate.phone}
          </div>
        )}
        <div className="flex items-center gap-1">
          <MapPin className="h-3 w-3 text-red-500 hover:text-red-600 transition-colors" />
          {candidate.location}
        </div>
        {candidate.linkedinUrl && (
          <div className="flex items-center gap-1">
            <IoLogoLinkedin className="h-3 w-3 text-primary hover:text-primary/80 transition-colors" />
            <a 
              href={candidate.linkedinUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              LinkedIn
            </a>
          </div>
        )}
      </div>

      {/* Skills */}
      <div className="flex flex-wrap gap-1 mb-4">
        {candidate.skills.slice(0, 4).map((skill, index) => (
          <span
            key={index}
            className="px-2 py-1 text-xs bg-secondary/50 text-secondary-foreground rounded-full"
          >
            {skill}
          </span>
        ))}
        {candidate.skills.length > 4 && (
          <span className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-full">
            +{candidate.skills.length - 4}
          </span>
        )}
      </div>

      {/* Salary */}
      {candidate.salary && (
        <div className="text-sm font-medium text-primary mb-4">
          {candidate.salary}
        </div>
      )}

      {/* Expand/Collapse Button */}
      {documents.length > 0 && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 p-2 text-xs text-primary hover:bg-primary/5 rounded-lg transition-colors"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="h-3 w-3" />
              Ocultar Documentos
            </>
          ) : (
            <>
              <ChevronDown className="h-3 w-3" />
              Ver {documents.length} Documento{documents.length !== 1 ? 's' : ''}
            </>
          )}
        </button>
      )}

      {/* Documents Section */}
      {isExpanded && documents.length > 0 && (
        <div className="mt-4 space-y-3 border-t border-border pt-4">
          <h4 className="text-sm font-medium text-foreground mb-3">Documentos del Candidato</h4>
          {documents.map((doc) => {
            const Icon = getDocumentIcon(doc.type);
            return (
              <div
                key={doc.id}
                className="bg-secondary/30 rounded-lg hover:bg-secondary/50 transition-colors overflow-hidden"
              >
                <div className="p-3">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                      <Icon className="h-4 w-4 text-primary" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground truncate">{doc.name}</p>
                      <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground mt-1">
                        <span className="bg-background px-2 py-0.5 rounded">{getDocumentLabel(doc.type)}</span>
                        <span className="bg-background px-2 py-0.5 rounded">{formatFileSize(doc.fileSize)}</span>
                        <span className="bg-background px-2 py-0.5 rounded">{new Date(doc.uploadedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-end gap-2 mt-3">
                    <button
                      onClick={() => handleViewDocument(doc)}
                      className="w-8 h-8 flex items-center justify-center text-primary hover:bg-primary/10 rounded-lg transition-colors flex-shrink-0"
                      title="Vista previa"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleDownloadDocument(doc)}
                      className="w-8 h-8 flex items-center justify-center text-primary hover:bg-primary/10 rounded-lg transition-colors flex-shrink-0"
                      title="Descargar"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Document Preview Modal */}
      <DocumentPreviewModal
        document={selectedDocument}
        onClose={() => setSelectedDocument(null)}
        onDownload={handleDownloadDocument}
      />
    </div>
  );
};
