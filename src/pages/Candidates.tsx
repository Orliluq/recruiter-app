import { AppLayout } from "@/components/layout/AppLayout";
import { mockCandidates, mockDocuments, candidateDocuments } from "@/data/mock-data";
import { STAGE_CONFIG, DocumentFile } from "@/types/recruiter";
import { Search, Star, MapPin, Linkedin } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { CandidateCard } from "@/components/CandidateCard";
import { DocumentService } from "@/services/documentService";

export default function Candidates() {
  const [search, setSearch] = useState("");
  const [documents, setDocuments] = useState<Record<string, DocumentFile[]>>({});
  
  // Load documents for each candidate
  useEffect(() => {
    console.log('Loading documents...');
    console.log('candidateDocuments mapping:', candidateDocuments);
    console.log('mockDocuments available:', mockDocuments);
    
    const loadedDocuments: Record<string, DocumentFile[]> = {};
    
    // Use the new candidateDocuments mapping
    Object.entries(candidateDocuments).forEach(([candidateId, docIds]) => {
      const docs = docIds
        .map(id => mockDocuments.find(doc => doc.id === id))
        .filter((doc): doc is DocumentFile => doc !== undefined);
      
      loadedDocuments[candidateId] = docs;
      console.log(`Candidate ${candidateId} gets ${docs.length} documents:`, docs);
    });
    
    console.log('Final candidate documents:', loadedDocuments);
    setDocuments(loadedDocuments);
  }, []);

  const filtered = mockCandidates.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()))
  );

  const handleViewDocument = (document: DocumentFile) => {
    // In a real app, this would open a document viewer
    console.log('Viewing document:', document);
    alert(`Viendo documento: ${document.name}`);
  };

  const handleDownloadDocument = (document: DocumentFile) => {
    console.log('Downloading document:', document);
    DocumentService.downloadDocument(document);
  };

  return (
    <AppLayout>
      <div className="space-y-6 animate-fade-in">
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Candidatos</h1>
            <p className="text-muted-foreground text-sm mt-1">{mockCandidates.length} total candidatos</p>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Buscar candidatos..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 text-sm rounded-lg bg-secondary border border-border focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary/50 w-64 transition-colors"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filtered.map((candidate) => {
            const candidateDocs = documents[candidate.id] || [];
            console.log(`Candidate ${candidate.id} documents:`, candidateDocs);
            return (
              <CandidateCard
                key={candidate.id}
                candidate={candidate}
                documents={candidateDocs}
                onViewDocument={handleViewDocument}
                onDownloadDocument={handleDownloadDocument}
              />
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
}
