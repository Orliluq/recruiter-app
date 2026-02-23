import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { CandidateCard } from '@/components/CandidateCard';
import { mockCandidates, mockDocuments } from '@/data/mock-data';

// Mock de DocumentService
vi.mock('@/services/documentService', () => ({
  DocumentService: {
    downloadDocument: vi.fn()
  }
}));

const mockCandidate = mockCandidates[0];
const mockDocs = mockDocuments.slice(0, 2);

describe('CandidateCard Component', () => {
  test('renders candidate information correctly', () => {
    render(
      <CandidateCard
        candidate={mockCandidate}
        documents={mockDocs}
        onViewDocument={vi.fn()}
        onDownloadDocument={vi.fn()}
      />
    );

    expect(screen.getByText(mockCandidate.name)).toBeInTheDocument();
    expect(screen.getByText(mockCandidate.title)).toBeInTheDocument();
    expect(screen.getByText(mockCandidate.company)).toBeInTheDocument();
    expect(screen.getByText(mockCandidate.location)).toBeInTheDocument();
  });

  test('displays LinkedIn link when available', () => {
    render(
      <CandidateCard
        candidate={mockCandidate}
        documents={mockDocs}
        onViewDocument={vi.fn()}
        onDownloadDocument={vi.fn()}
      />
    );

    const linkedinLink = screen.getByRole('link', { name: /linkedin/i });
    expect(linkedinLink).toBeInTheDocument();
    expect(linkedinLink).toHaveAttribute('href', mockCandidate.linkedinUrl);
    expect(linkedinLink).toHaveAttribute('target', '_blank');
  });

  test('displays documents count correctly', () => {
    render(
      <CandidateCard
        candidate={mockCandidate}
        documents={mockDocs}
        onViewDocument={vi.fn()}
        onDownloadDocument={vi.fn()}
      />
    );

    expect(screen.getByText(`Ver ${mockDocs.length} Documentos`)).toBeInTheDocument();
  });

  test('expands and collapses documents section', () => {
    render(
      <CandidateCard
        candidate={mockCandidate}
        documents={mockDocs}
        onViewDocument={vi.fn()}
        onDownloadDocument={vi.fn()}
      />
    );

    const expandButton = screen.getByText(/Ver \d+ Documentos/i);
    expect(expandButton).toBeInTheDocument();

    // Click to expand
    fireEvent.click(expandButton);
    expect(screen.getByText('Ocultar Documentos')).toBeInTheDocument();

    // Click to collapse
    fireEvent.click(screen.getByText('Ocultar Documentos'));
    expect(screen.getByText(/Ver \d+ Documentos/i)).toBeInTheDocument();
  });

  test('calls onViewDocument when view button is clicked', () => {
    const mockOnViewDocument = vi.fn();
    const mockOnDownloadDocument = vi.fn();
    render(
      <CandidateCard
        candidate={mockCandidate}
        documents={mockDocs}
        onViewDocument={mockOnViewDocument}
        onDownloadDocument={mockOnDownloadDocument}
      />
    );

    // Expand documents section first
    const expandButton = screen.getByText((content, element) => {
      return content.includes('Ver') && content.includes(mockDocs.length.toString()) && content.includes('Documento');
    });
    fireEvent.click(expandButton);

    // Get the first view button (there might be multiple)
    const viewButtons = screen.getAllByTitle('Vista previa');
    expect(viewButtons.length).toBeGreaterThan(0);
    fireEvent.click(viewButtons[0]);

    expect(mockOnViewDocument).toHaveBeenCalledWith(mockDocs[0]);
  });

  test('calls onDownloadDocument when download button is clicked', () => {
    const mockOnViewDocument = vi.fn();
    const mockOnDownloadDocument = vi.fn();
    render(
      <CandidateCard
        candidate={mockCandidate}
        documents={mockDocs}
        onViewDocument={mockOnViewDocument}
        onDownloadDocument={mockOnDownloadDocument}
      />
    );

    // Expand documents section first
    const expandButton = screen.getByText((content, element) => {
      return content.includes('Ver') && content.includes(mockDocs.length.toString()) && content.includes('Documento');
    });
    fireEvent.click(expandButton);

    // Get the first download button (there might be multiple)
    const downloadButtons = screen.getAllByTitle('Descargar');
    expect(downloadButtons.length).toBeGreaterThan(0);
    fireEvent.click(downloadButtons[0]);

    expect(mockOnDownloadDocument).toHaveBeenCalledWith(mockDocs[0]);
  });

  test('displays rating stars correctly', () => {
    const mockOnViewDocument = vi.fn();
    const mockOnDownloadDocument = vi.fn();
    render(
      <CandidateCard
        candidate={mockCandidate}
        documents={mockDocs}
        onViewDocument={mockOnViewDocument}
        onDownloadDocument={mockOnDownloadDocument}
      />
    );

    // Find all star icons by their SVG element and class
    const starSvgs = document.querySelectorAll('.lucide-star');
    expect(starSvgs).toHaveLength(5);
    
    // Check that 4 stars are filled (rating 4) by checking fill-warning class
    const filledStars = Array.from(starSvgs).filter(star => 
      star.classList.contains('fill-warning')
    );
    expect(filledStars).toHaveLength(4);
    
    // Check that 1 star is empty (rating 4 out of 5)
    const emptyStars = Array.from(starSvgs).filter(star => 
      star.classList.contains('text-muted-foreground/30')
    );
    expect(emptyStars).toHaveLength(1);
  });

  test('displays skills correctly', () => {
    render(
      <CandidateCard
        candidate={mockCandidate}
        documents={mockDocs}
        onViewDocument={vi.fn()}
        onDownloadDocument={vi.fn()}
      />
    );

    mockCandidate.skills.forEach(skill => {
      expect(screen.getByText(skill)).toBeInTheDocument();
    });
  });

  test('handles empty documents array', () => {
    render(
      <CandidateCard
        candidate={mockCandidate}
        documents={[]}
        onViewDocument={vi.fn()}
        onDownloadDocument={vi.fn()}
      />
    );

    // Should not show documents section
    expect(screen.queryByText(/Ver \d+ Documentos/i)).not.toBeInTheDocument();
    expect(screen.queryByText('Ocultar Documentos')).not.toBeInTheDocument();
  });
});
