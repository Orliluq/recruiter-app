import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { CandidateCard } from '@/components/CandidateCard';
import { Candidate, DocumentFile } from '@/types/recruiter';

// Mock simple de datos
const mockCandidate: Candidate = {
  id: 'test-1',
  name: 'Test Candidate',
  title: 'Software Engineer',
  company: 'Test Company',
  location: 'Test Location',
  email: 'test@example.com',
  phone: '+1234567890',
  linkedinUrl: 'https://linkedin.com/in/test',
  avatar: '/test-avatar.jpg',
  rating: 4,
  skills: ['React', 'TypeScript', 'Node.js'],
  stage: 'Screening',
  appliedAt: '2024-01-01',
  jobId: 'job-1',
  updatedAt: '2024-01-01'
};

const mockDocs: DocumentFile[] = [
  {
    id: 'doc-1',
    name: 'Test Resume.pdf',
    fileName: 'Test Resume.pdf',
    type: 'resume',
    fileSize: 1024000,
    uploadedAt: '2024-01-01',
    fileUrl: '/test-resume.pdf'
  }
];

// Mock de funciones
const mockOnViewDocument = vi.fn();
const mockOnDownloadDocument = vi.fn();

describe('CandidateCard Simple Tests', () => {
  test('renders candidate information correctly', () => {
    render(
      <CandidateCard
        candidate={mockCandidate}
        documents={mockDocs}
        onViewDocument={mockOnViewDocument}
        onDownloadDocument={mockOnDownloadDocument}
      />
    );

    expect(screen.getByText(mockCandidate.name)).toBeInTheDocument();
    expect(screen.getByText(mockCandidate.title)).toBeInTheDocument();
    expect(screen.getByText(mockCandidate.company)).toBeInTheDocument();
    expect(screen.getByText(mockCandidate.location)).toBeInTheDocument();
  });

  test('displays documents count correctly', () => {
    render(
      <CandidateCard
        candidate={mockCandidate}
        documents={mockDocs}
        onViewDocument={mockOnViewDocument}
        onDownloadDocument={mockOnDownloadDocument}
      />
    );

    // Use function matcher for text that might be split across elements
    expect(screen.getByText((content, element) => {
      return content.includes('Ver') && content.includes('1') && content.includes('Documento');
    })).toBeInTheDocument();
  });

  test('expands and collapses documents section', () => {
    render(
      <CandidateCard
        candidate={mockCandidate}
        documents={mockDocs}
        onViewDocument={mockOnViewDocument}
        onDownloadDocument={mockOnDownloadDocument}
      />
    );

    // Use function matcher for expand button
    const expandButton = screen.getByText((content, element) => {
      return content.includes('Ver') && content.includes('1') && content.includes('Documento');
    });
    expect(expandButton).toBeInTheDocument();

    // Click to expand
    fireEvent.click(expandButton);
    expect(screen.getByText('Ocultar Documentos')).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(screen.getByText('Ocultar Documentos'));
    
    // Use function matcher again for collapsed state
    expect(screen.getByText((content, element) => {
      return content.includes('Ver') && content.includes('1') && content.includes('Documento');
    })).toBeInTheDocument();
  });

  test('displays LinkedIn link', () => {
    render(
      <CandidateCard
        candidate={mockCandidate}
        documents={mockDocs}
        onViewDocument={mockOnViewDocument}
        onDownloadDocument={mockOnDownloadDocument}
      />
    );

    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', mockCandidate.linkedinUrl);
  });

  test('handles empty documents array', () => {
    render(
      <CandidateCard
        candidate={mockCandidate}
        documents={[]}
        onViewDocument={mockOnViewDocument}
        onDownloadDocument={mockOnDownloadDocument}
      />
    );

    expect(screen.queryByText(/Ver \d+ Documentos/i)).not.toBeInTheDocument();
    expect(screen.queryByText('Ocultar Documentos')).not.toBeInTheDocument();
  });
});
