import './styles/styles.scss';
import NoteCard from './NoteCard';
import { Task } from '../types/Task';

interface NotesGridProps {
  tasks: Task[];
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
  onToggleFavorite: (id: string) => void;
  onChangeColor: (id: string, color: string) => void; // nova prop
}

export default function NotesGrid({
  tasks,
  onEdit,
  onDelete,
  onToggleFavorite,
  onChangeColor, // receber a prop aqui
}: NotesGridProps) {
  if (tasks.length === 0) return <p>Nenhuma tarefa encontrada.</p>;

  return (
    <div className="notes-grid">
      {tasks.map(task => (
        <NoteCard
          key={task._id}
          note={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleFavorite={onToggleFavorite}
          onChangeColor={onChangeColor} // passar aqui para cada NoteCard
        />
      ))}
    </div>
  );
}
