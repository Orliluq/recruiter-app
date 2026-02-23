import React, { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, Save, X, Clock } from 'lucide-react';
import { CandidateNote } from '@/types/recruiter';
import { db } from '@/services/database';

interface CandidateNotesProps {
  candidateId: string;
}

export const CandidateNotes: React.FC<CandidateNotesProps> = ({ candidateId }) => {
  const [notes, setNotes] = useState<CandidateNote[]>([]);
  const [newNote, setNewNote] = useState('');
  const [editingNote, setEditingNote] = useState<string | null>(null);
  const [editContent, setEditContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadNotes();
  }, [candidateId]);

  const loadNotes = async () => {
    try {
      const candidateNotes = await db.getNotesByCandidate(candidateId);
      setNotes(candidateNotes);
    } catch (error) {
      console.error('Error loading notes:', error);
    }
  };

  const handleAddNote = async () => {
    if (!newNote.trim()) return;

    setIsLoading(true);
    try {
      await db.createNote({
        candidateId,
        content: newNote.trim(),
      });
      setNewNote('');
      await loadNotes();
    } catch (error) {
      console.error('Error adding note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditNote = async (noteId: string) => {
    if (!editContent.trim()) return;

    setIsLoading(true);
    try {
      await db.updateNote(noteId, editContent.trim());
      setEditingNote(null);
      setEditContent('');
      await loadNotes();
    } catch (error) {
      console.error('Error updating note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNote = async (noteId: string) => {
    if (!confirm('¿Estás seguro de que deseas eliminar esta nota?')) return;

    setIsLoading(true);
    try {
      await db.deleteNote(noteId);
      await loadNotes();
    } catch (error) {
      console.error('Error deleting note:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const startEdit = (note: CandidateNote) => {
    setEditingNote(note.id);
    setEditContent(note.content);
  };

  const cancelEdit = () => {
    setEditingNote(null);
    setEditContent('');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) {
      const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
      return `Hace ${diffInMinutes} minuto${diffInMinutes !== 1 ? 's' : ''}`;
    } else if (diffInHours < 24) {
      return `Hace ${diffInHours} hora${diffInHours !== 1 ? 's' : ''}`;
    } else {
      const diffInDays = Math.floor(diffInHours / 24);
      return `Hace ${diffInDays} día${diffInDays !== 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="space-y-4">
      {/* Add new note */}
      <div className="glass-card p-4">
        <h3 className="font-semibold text-sm mb-3">Agregar Nota</h3>
        <div className="space-y-3">
          <textarea
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Escribe una nota sobre este candidato..."
            className="w-full p-3 text-sm border border-border rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
            rows={3}
          />
          <button
            onClick={handleAddNote}
            disabled={!newNote.trim() || isLoading}
            className="flex items-center gap-2 px-4 py-2 text-sm bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Plus className="h-4 w-4" />
            Agregar Nota
          </button>
        </div>
      </div>

      {/* Notes list */}
      <div className="space-y-3">
        {notes.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p className="text-sm">No hay notas aún</p>
            <p className="text-xs mt-1">Agrega tu primera nota sobre este candidato</p>
          </div>
        ) : (
          notes.map((note) => (
            <div key={note.id} className="glass-card p-4">
              {editingNote === note.id ? (
                <div className="space-y-3">
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    className="w-full p-3 text-sm border border-border rounded-lg bg-background resize-none focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary"
                    rows={4}
                    autoFocus
                  />
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditNote(note.id)}
                      disabled={!editContent.trim() || isLoading}
                      className="flex items-center gap-1 px-3 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <Save className="h-3 w-3" />
                      Guardar
                    </button>
                    <button
                      onClick={cancelEdit}
                      className="flex items-center gap-1 px-3 py-1 text-xs bg-secondary text-secondary-foreground rounded hover:bg-secondary/80 transition-colors"
                    >
                      <X className="h-3 w-3" />
                      Cancelar
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1">
                      <p className="text-sm text-foreground whitespace-pre-wrap">
                        {note.content}
                      </p>
                      <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{formatDate(note.createdAt)}</span>
                        {note.updatedAt !== note.createdAt && (
                          <span className="text-muted-foreground/70">
                            · Editado
                          </span>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        onClick={() => startEdit(note)}
                        className="p-1 text-muted-foreground hover:text-foreground transition-colors"
                        title="Editar nota"
                      >
                        <Edit2 className="h-3 w-3" />
                      </button>
                      <button
                        onClick={() => handleDeleteNote(note.id)}
                        className="p-1 text-muted-foreground hover:text-destructive transition-colors"
                        title="Eliminar nota"
                      >
                        <Trash2 className="h-3 w-3" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
