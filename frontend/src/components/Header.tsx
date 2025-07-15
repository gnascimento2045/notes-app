import './styles/styles.scss';
import React from 'react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onAddNote: () => void;
}

export default function Header({
  searchTerm,
  onSearchChange,
  onAddNote,
}: HeaderProps) {
  return (
    <header className="header">
      <div className="logo" aria-label="CoreNotes">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path d="M9 11H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2zm2-7h-1V2c0-.55-.45-1-1-1s-1 .45-1 1v2H8V2c0-.55-.45-1-1-1s-1 .45-1 1v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z" />
        </svg>
        CoreNotes
      </div>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Pesquisar notas..."
          value={searchTerm}
          onChange={e => onSearchChange(e.target.value)}
          aria-label="Pesquisar notas"
        />
        <svg
          className="search-icon"
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          focusable="false"
        >
          <path
            d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5
            16 5.91 13.09 3 9.5 3S3 5.91 3 9.5
            5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79
            l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5
            S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
      </div>

      <button
        className="add-note-btn"
        onClick={onAddNote}
        aria-label="Adicionar nova nota"
      >
        + Nova Nota
      </button>
    </header>
  );
}
