import { DocumentFile } from '@/types/recruiter';

export class DocumentService {
  // Convert file to base64 for storage and preview
  static async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  // Create ATS-friendly filename
  static generateATSFileName(candidate: { name: string }, documentType: DocumentFile['type'], originalName: string): string {
    const sanitizedName = candidate.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_')
      .replace(/^_|_$/g, '');
    
    const timestamp = new Date().toISOString().split('T')[0];
    const typePrefix = documentType === 'resume' ? 'CV' : 
                    documentType === 'cover' ? 'Cover' : 
                    documentType === 'portfolio' ? 'Portfolio' : 'Doc';
    
    return `${typePrefix}_${sanitizedName}_${timestamp}.${this.getFileExtension(originalName)}`;
  }

  // Get file extension
  static getFileExtension(filename: string): string {
    return filename.split('.').pop()?.toLowerCase() || 'pdf';
  }

  // Validate file type for ATS compatibility
  static isValidFileType(file: File): boolean {
    const validTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'application/rtf'
    ];
    
    return validTypes.includes(file.type) || 
           file.name.toLowerCase().endsWith('.pdf') ||
           file.name.toLowerCase().endsWith('.doc') ||
           file.name.toLowerCase().endsWith('.docx') ||
           file.name.toLowerCase().endsWith('.txt') ||
           file.name.toLowerCase().endsWith('.rtf');
  }

  // Get file type from MIME type or extension
  static getFileType(file: File): DocumentFile['type'] {
    const name = file.name.toLowerCase();
    
    if (name.includes('resume') || name.includes('cv') || name.includes('curriculum')) {
      return 'resume';
    }
    if (name.includes('cover') || name.includes('letter') || name.includes('carta')) {
      return 'cover';
    }
    if (name.includes('portfolio') || name.includes('work') || name.includes('proyectos')) {
      return 'portfolio';
    }
    
    return 'other';
  }

  // Download document with proper headers
  static downloadDocument(document: DocumentFile): void {
    const link = window.document.createElement('a');
    link.href = document.fileUrl;
    link.download = document.fileName;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  }

  // Create preview URL for documents
  static createPreviewUrl(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(file);
    });
  }

  // Extract text content from file for ATS parsing (mock implementation)
  static async extractTextContent(file: File): Promise<string> {
    // In a real implementation, this would use a library like pdf-parse or mammoth
    // For now, we'll return a placeholder
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`Contenido extraído de ${file.name}. En una implementación real, esto contendría el texto completo del documento para análisis ATS.`);
      }, 1000);
    });
  }

  // Check if document is ATS-optimized
  static isATSOptimized(file: File): { isOptimized: boolean; suggestions: string[] } {
    const suggestions: string[] = [];
    const name = file.name.toLowerCase();
    
    // Check filename
    if (!name.includes('resume') && !name.includes('cv')) {
      suggestions.push('El nombre del archivo debería incluir "resume" o "cv" para mejor identificación ATS');
    }
    
    // Check file type
    if (!file.name.endsWith('.pdf') && !file.name.endsWith('.docx')) {
      suggestions.push('Use formatos PDF o DOCX para mejor compatibilidad con ATS');
    }
    
    // Check file size (ATS systems often have limits)
    if (file.size > 5 * 1024 * 1024) { // 5MB
      suggestions.push('El archivo es demasiado grande. Considere reducirlo a menos de 5MB');
    }
    
    return {
      isOptimized: suggestions.length === 0,
      suggestions
    };
  }

  // Generate ATS-friendly content suggestions
  static generateATSSuggestions(content: string): string[] {
    const suggestions: string[] = [];
    const lowerContent = content.toLowerCase();
    
    // Check for common ATS keywords
    const atsKeywords = [
      'experience', 'skills', 'education', 'projects', 'achievements',
      'leadership', 'teamwork', 'communication', 'problem-solving'
    ];
    
    const missingKeywords = atsKeywords.filter(keyword => !lowerContent.includes(keyword));
    
    if (missingKeywords.length > 0) {
      suggestions.push(`Considere incluir estas palabras clave: ${missingKeywords.join(', ')}`);
    }
    
    // Check for formatting issues
    if (content.includes('  ') || content.includes('\t')) {
      suggestions.push('Evite usar tablas o múltiples espacios. Use formato simple y limpio.');
    }
    
    if (content.length < 500) {
      suggestions.push('El contenido parece muy corto. Considere añadir más detalles sobre tu experiencia.');
    }
    
    return suggestions;
  }

  // Store document metadata
  static async storeDocument(file: File, candidateId: string): Promise<DocumentFile> {
    const base64 = await this.fileToBase64(file);
    const fileType = this.getFileType(file);
    const atsFileName = this.generateATSFileName(
      { name: file.name }, 
      fileType, 
      file.name
    );
    
    const document: DocumentFile = {
      id: crypto.randomUUID(),
      name: file.name,
      type: fileType,
      fileUrl: base64,
      fileName: atsFileName,
      fileSize: file.size,
      uploadedAt: new Date().toISOString()
    };
    
    // Store in localStorage (in real app, this would be stored in database/cloud storage)
    const existingDocs = localStorage.getItem(`documents_${candidateId}`);
    const docs = existingDocs ? JSON.parse(existingDocs) : [];
    docs.push(document);
    localStorage.setItem(`documents_${candidateId}`, JSON.stringify(docs));
    
    return document;
  }

  // Get documents for a candidate
  static getDocumentsForCandidate(candidateId: string): DocumentFile[] {
    const existingDocs = localStorage.getItem(`documents_${candidateId}`);
    return existingDocs ? JSON.parse(existingDocs) : [];
  }

  // Delete document
  static deleteDocument(candidateId: string, documentId: string): void {
    const existingDocs = localStorage.getItem(`documents_${candidateId}`);
    if (existingDocs) {
      const docs = JSON.parse(existingDocs);
      const filtered = docs.filter((doc: DocumentFile) => doc.id !== documentId);
      localStorage.setItem(`documents_${candidateId}`, JSON.stringify(filtered));
    }
  }
}
