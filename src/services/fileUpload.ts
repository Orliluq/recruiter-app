import { DocumentFile } from '@/types/recruiter';

export class FileUploadService {
  private static readonly ALLOWED_TYPES = [
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
  ];

  private static readonly MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

  static validateFile(file: File): { isValid: boolean; error?: string } {
    if (!this.ALLOWED_TYPES.includes(file.type)) {
      return {
        isValid: false,
        error: 'Solo se permiten archivos PDF, DOC y DOCX',
      };
    }

    if (file.size > this.MAX_FILE_SIZE) {
      return {
        isValid: false,
        error: 'El tamaño máximo del archivo es 10MB',
      };
    }

    return { isValid: true };
  }

  static async uploadFile(
    file: File,
    candidateId: string,
    type: DocumentFile['type'] = 'resume'
  ): Promise<DocumentFile> {
    const validation = this.validateFile(file);
    if (!validation.isValid) {
      throw new Error(validation.error);
    }

    // Create a unique filename
    const timestamp = Date.now();
    const randomId = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split('.').pop();
    const fileName = `${candidateId}_${timestamp}_${randomId}.${fileExtension}`;

    // In a real application, this would upload to a server
    // For now, we'll store it in localStorage as a base64 string
    const base64 = await this.fileToBase64(file);
    const fileUrl = `data:${file.type};base64,${base64}`;

    const documentFile: DocumentFile = {
      id: crypto.randomUUID(),
      name: file.name,
      type,
      fileUrl,
      fileName,
      fileSize: file.size,
      uploadedAt: new Date().toISOString(),
    };

    return documentFile;
  }

  static async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        const result = reader.result as string;
        // Remove the data URL prefix to get just the base64 string
        const base64 = result.split(',')[1];
        resolve(base64);
      };
      reader.onerror = (error) => reject(error);
    });
  }

  static downloadFile(doc: DocumentFile): void {
    const link = window.document.createElement('a');
    link.href = doc.fileUrl;
    link.download = doc.name;
    window.document.body.appendChild(link);
    link.click();
    window.document.body.removeChild(link);
  }

  static formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  static getFileIcon(fileName: string): string {
    const extension = fileName.split('.').pop()?.toLowerCase();
    
    switch (extension) {
      case 'pdf':
        return '📄';
      case 'doc':
      case 'docx':
        return '📝';
      default:
        return '📎';
    }
  }
}
