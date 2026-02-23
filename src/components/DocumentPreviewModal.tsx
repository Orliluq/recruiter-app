import React from 'react';
import { DocumentFile } from '@/types/recruiter';
import { X, Download, FileText, Eye } from 'lucide-react';

interface DocumentPreviewModalProps {
  document: DocumentFile | null;
  onClose: () => void;
  onDownload: (document: DocumentFile) => void;
}

export const DocumentPreviewModal: React.FC<DocumentPreviewModalProps> = ({ 
  document, 
  onClose, 
  onDownload 
}) => {
  if (!document) return null;

  const getDocumentIcon = (type: DocumentFile['type']) => {
    switch (type) {
      case 'resume': return FileText;
      case 'cover': return FileText;
      case 'portfolio': return FileText;
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

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const Icon = getDocumentIcon(document.type);

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="bg-background rounded-2xl shadow-2xl w-full max-w-5xl h-[90vh] flex flex-col border border-border/50 animate-fade-in">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-6 border-b border-border bg-card/50 flex-shrink-0 gap-4">
          <div className="text-center sm:text-left">
            <div className="flex items-center gap-3 justify-center sm:justify-start mb-2">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <h3 className="text-lg sm:text-xl font-bold text-foreground break-words">{document.name}</h3>
            </div>
            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <span className="bg-background px-2 py-1 rounded">{getDocumentLabel(document.type)}</span>
              <span className="text-muted-foreground">•</span>
              <span className="bg-background px-2 py-1 rounded">{formatFileSize(document.fileSize)}</span>
              <span className="text-muted-foreground">•</span>
              <span className="bg-background px-2 py-1 rounded">{new Date(document.uploadedAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex items-center justify-center sm:justify-end gap-2">
            <button
              onClick={() => onDownload(document)}
              className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 text-sm font-medium shadow-lg hover:shadow-xl"
            >
              <Download className="h-4 w-4 flex-shrink-0" />
              <span className="hidden sm:inline">Descargar</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-accent hover:text-accent-foreground rounded-lg transition-all duration-200 flex-shrink-0"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Preview Content */}
        <div className="flex-1 overflow-hidden p-4 sm:p-6">
          {document.fileUrl ? (
            <iframe
              src={document.fileUrl}
              className="w-full h-full border border-border rounded-lg"
              title={document.name}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center p-8">
                <div className="w-16 h-16 sm:w-20 sm:h-20 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-8 w-8 sm:h-10 sm:w-10 text-muted-foreground" />
                </div>
                <p className="text-sm sm:text-base text-muted-foreground mb-4">Vista previa no disponible</p>
                <button
                  onClick={() => onDownload(document)}
                  className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all duration-200 mx-auto shadow-lg hover:shadow-xl"
                >
                  <Download className="h-4 w-4" />
                  Descargar Documento
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
