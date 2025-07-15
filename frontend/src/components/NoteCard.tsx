import { Star, Pencil, PaintBucket, X } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import { Task } from '../types/Task';
import '../styles/styles.scss';

const COLORS = [
  '#ffffff',
  '#7979ee',
  '#68dd68',
  '#d8d869',
  '#e9b149',
  '#ffc0cb',
  '#c269c2',
  '#6bc5c5',
  '#f55959',
  '#808080',
  '#ac6161',
];

interface NoteCardProps {
  note: Task;
  onEdit: (note: Task) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onChangeColor: (id: string, color: string) => void;
}

export default function NoteCard({
  note,
  onEdit,
  onDelete,
  onToggleFavorite,
  onChangeColor,
}: NoteCardProps) {
  const [showPalette, setShowPalette] = useState(false);
  const paletteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        paletteRef.current &&
        !paletteRef.current.contains(event.target as Node)
      ) {
        setShowPalette(false);
      }
    }
    if (showPalette) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showPalette]);

  return (
    <div
      className={`note-card ${note.isFavorite ? 'selected' : ''}`}
      style={{
        position: 'relative',
        backgroundColor: note.color || '#fff',
      }}
    >
      <div className="note-header">
        <strong className="note-title">{note.title}</strong>
        <button
          className="star"
          onClick={() => onToggleFavorite(note._id)}
          title={note.isFavorite ? 'Desfavoritar' : 'Favoritar'}
          aria-label={note.isFavorite ? 'Desfavoritar' : 'Favoritar'}
          style={{
            background: 'transparent',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1.2rem',
          }}
        >
          <Star
            size={20}
            fill={note.isFavorite ? '#FFD700' : 'none'}
            stroke={note.isFavorite ? '#FFD700' : '#888'}
          />
        </button>
      </div>

      <p className="note-content">{note.description}</p>

      <div className="note-footer">
        <div className="icons-left" style={{ position: 'relative' }}>
          <button
            onClick={() => onEdit(note)}
            title="Editar"
            aria-label="Editar"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.2rem',
              marginRight: 8,
            }}
          >
            <Pencil size={20} />
          </button>
          <button
            onClick={() => setShowPalette(!showPalette)}
            title="Alterar cor"
            aria-label="Alterar cor"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.2rem',
            }}
          >
            <PaintBucket size={20} />
          </button>

          {showPalette && (
            <div ref={paletteRef} className="color-palette-popup">
              {COLORS.map(color => (
                <div
                  key={color}
                  onClick={() => {
                    onChangeColor(note._id, color);
                    setShowPalette(false);
                  }}
                  title={`Selecionar cor ${color}`}
                  className="color-option"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          )}
        </div>

        <div className="icons-right">
          <button
            onClick={() => onDelete(note._id)}
            title="Excluir"
            aria-label="Excluir"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              fontSize: '1.2rem',
              color: '#d00',
            }}
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
