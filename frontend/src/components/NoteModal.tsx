import React, { useEffect, useState } from 'react';
import './styles/styles.scss';

interface Note {
  id: string;
  title: string;
  content: string;
  color: string;
}

interface NoteModalProps {
  note: Note | null;
  onClose: () => void;
  onSave: (note: Partial<Note>) => void;
}

const COLORS = [
  '#ffffff', // white
  '#7979ee', // blue
  '#68dd68', // green
  '#d8d869', // yellow
  '#e9b149', // orange
  '#ffc0cb', // pink
  '#c269c2', // purple
  '#6bc5c5', // teal
  '#f55959', // red
  '#808080', // gray
  '#ac6161', // brown
];

export default function NoteModal({ note, onClose, onSave }: NoteModalProps) {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');
  const [color, setColor] = useState(note?.color || 'blue');

  useEffect(() => {
    setTitle(note?.title || '');
    setContent(note?.content || '');
    setColor(note?.color || 'blue');
  }, [note]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }
    onSave({ title, content, color });
  }

  return (
    <div
      className="modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modalTitle"
      onClick={e => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h3 id="modalTitle" className="modal-title">
            {note ? 'Editar Nota' : 'Nova Nota'}
          </h3>
          <button
            className="close-btn"
            onClick={onClose}
            aria-label="Fechar"
            type="button"
          >
            &times;
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="noteTitle">
              Título
            </label>
            <input
              id="noteTitle"
              className="form-input"
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Digite o título da nota"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="noteContent">
              Conteúdo
            </label>
            <textarea
              id="noteContent"
              className="form-input form-textarea"
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Digite o conteúdo da nota"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Cor</label>
            <div className="color-palette">
              {COLORS.map(c => (
                <div
                  key={c}
                  className={`color-option ${c}`}
                  onClick={() => setColor(c)}
                  style={{
                    borderColor: c === color ? '#333' : 'transparent',
                    transform: c === color ? 'scale(1.2)' : 'scale(1)',
                    cursor: 'pointer',
                  }}
                  aria-label={`Selecionar cor ${c}`}
                  role="button"
                  tabIndex={0}
                  onKeyDown={e => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setColor(c);
                    }
                  }}
                ></div>
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary">
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
