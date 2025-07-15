import React, { useEffect, useState, useRef, RefObject } from 'react';
import { taskService } from './services/taskService';
import NoteCard from './components/NoteCard';
import { NotebookPen, Search, PlusCircle } from 'lucide-react';
import './styles/styles.scss';

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

type Task = {
  _id: string;
  title: string;
  description: string;
  color: string;
  isFavorite: boolean;
};

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [colorFilter, setColorFilter] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [selectedColor, setSelectedColor] = useState(COLORS[0]);
  const titleRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const data = await taskService.getAllTasks();
        setTasks(data);
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error('Erro ao carregar tarefas:', err);
      }
    }
    fetchTasks();
  }, []);

  function openModalForNew() {
    setCurrentTask(null);
    setSelectedColor(COLORS[0]);
    setModalOpen(true);
    setTimeout(() => titleRef.current?.focus(), 100);
  }

  function openModalForEdit(task: Task) {
    setCurrentTask(task);
    setSelectedColor(task.color);
    setModalOpen(true);
    setTimeout(() => titleRef.current?.focus(), 100);
  }

  function closeModal() {
    setModalOpen(false);
    setCurrentTask(null);
    setSelectedColor(COLORS[0]);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const title = (formData.get('title') as string)?.trim();
    const description = (formData.get('description') as string)?.trim();

    if (!title || !description) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    try {
      if (currentTask) {
        const updatedTask = await taskService.updateTask(currentTask._id, {
          title,
          description,
          color: selectedColor,
          isFavorite: currentTask.isFavorite,
        });
        setTasks(old =>
          old.map(t =>
            t._id === currentTask._id
              ? { ...updatedTask, _id: updatedTask._id ?? t._id }
              : t
          )
        );
      } else {
        const newTask = await taskService.createTask({
          title,
          description,
          color: selectedColor,
          isFavorite: false,
        });
        setTasks(old => [{ ...newTask, _id: newTask._id }, ...old]);
      }
      closeModal();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Erro ao salvar tarefa:', error);
      alert('Erro ao salvar a tarefa. Verifique o console para mais detalhes.');
    }
  }

  async function handleDelete(id: string) {
    if (!window.confirm('Tem certeza que deseja excluir esta tarefa?')) return;
    try {
      await taskService.deleteTask(id);
      setTasks(old => old.filter(t => t._id !== id));
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Erro ao deletar tarefa:', err);
      alert('Erro ao excluir tarefa. Tente novamente.');
    }
  }

  async function toggleFavorite(id: string) {
    const task = tasks.find(t => t._id === id);
    if (!task) return;

    try {
      const updated = await taskService.toggleFavoriteTask(
        id,
        !task.isFavorite
      );
      setTasks(old =>
        old.map(t => (t._id === id ? { ...updated, _id: id } : t))
      );
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('Erro ao atualizar favorito:', err);
      alert('Erro ao favoritar/desfavoritar. Tente novamente.');
    }
  }

  // NOVO: função para alterar a cor da task diretamente
  function handleChangeColor(id: string, color: string) {
    taskService
      .updateTask(id, { color })
      .then(updatedTask => {
        setTasks(old =>
          old.map(t => (t._id === id ? { ...t, color: updatedTask.color } : t))
        );
      })
      .catch(err => {
        // eslint-disable-next-line no-console
        console.error('Erro ao alterar cor da tarefa:', err);
        alert('Erro ao alterar a cor da tarefa.');
      });
  }

  const filteredTasks = tasks.filter(t => {
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesColor = !colorFilter || t.color === colorFilter;

    return matchesSearch && matchesColor;
  });

  const favoriteTasks = filteredTasks.filter(t => t.isFavorite);
  const otherTasks = filteredTasks.filter(t => !t.isFavorite);

  return (
    <>
      <div className="header">
        <h1 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <NotebookPen size={28} strokeWidth={2.2} />
          CoreNotes
        </h1>

        <div className="search-wrapper">
          <input
            type="text"
            placeholder="Pesquisar notas..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <Search size={20} className="search-icon" />
        </div>

        <button
          onClick={openModalForNew}
          style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <PlusCircle size={20} />
          Nova Nota
        </button>
      </div>

      <div
        className="create-note-card"
        onClick={openModalForNew}
        style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
      >
        <PlusCircle size={18} />
        Criar nova nota
      </div>
      <div className="container">
        <div className="color-filter">
          <span className="filter-label">
            <h2>Filtrar por cor:</h2>
          </span>
          <div
            className="color-palette"
            style={{ position: 'relative', zIndex: 10 }}
          >
            {COLORS.map(color => (
              <div
                key={color}
                className={`color-option${colorFilter === color ? ' selected' : ''}`}
                style={{
                  backgroundColor: color,
                  border:
                    colorFilter === color
                      ? '2px solid #333'
                      : '2px solid transparent',
                  cursor: 'pointer',
                  width: 24,
                  height: 24,
                  borderRadius: '50%',
                  display: 'inline-block',
                  marginRight: 8,
                  boxSizing: 'border-box',
                  transform: colorFilter === color ? 'scale(1.2)' : 'scale(1)',
                  position: 'relative',
                  zIndex: 15,
                }}
                onClick={() =>
                  setColorFilter(colorFilter === color ? null : color)
                }
                title={`Filtrar por cor ${color}`}
                tabIndex={0}
                role="button"
                aria-label={`Filtrar por cor ${color}`}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    setColorFilter(colorFilter === color ? null : color);
                  }
                }}
              />
            ))}
            <button
              style={{
                marginLeft: 8,
                padding: '2px 8px',
                borderRadius: 4,
                border: '1px solid #ccc',
                background: '#fff',
                cursor: 'pointer',
                position: 'relative',
                zIndex: 15,
              }}
              onClick={() => setColorFilter(null)}
              disabled={!colorFilter}
            >
              Limpar
            </button>
          </div>
        </div>

        <h2>Favoritos</h2>
        <div className="notes-grid">
          {favoriteTasks.length === 0 && <p>Nenhum favorito</p>}
          {favoriteTasks.map(task => (
            <NoteCard
              key={task._id}
              note={task}
              onEdit={() => openModalForEdit(task)}
              onDelete={() => handleDelete(task._id)}
              onToggleFavorite={() => toggleFavorite(task._id)}
              onChangeColor={handleChangeColor}
            />
          ))}
        </div>

        <h2>Todas as Notas</h2>
        <div className="notes-grid">
          {otherTasks.length === 0 && <p>Nenhuma nota encontrada</p>}
          {otherTasks.map(task => (
            <NoteCard
              key={task._id}
              note={task}
              onEdit={() => openModalForEdit(task)}
              onDelete={() => handleDelete(task._id)}
              onToggleFavorite={() => toggleFavorite(task._id)}
              onChangeColor={handleChangeColor}
            />
          ))}
        </div>
      </div>
      {modalOpen && (
        <Modal
          title={currentTask ? 'Editar Nota' : 'Nova Nota'}
          onClose={closeModal}
          onSave={handleSave}
          task={currentTask}
          selectedColor={selectedColor}
          onSelectColor={setSelectedColor}
          titleRef={titleRef}
        />
      )}
    </>
  );
}

interface ModalProps {
  title: string;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  task: Task | null;
  selectedColor: string;
  onSelectColor: (color: string) => void;
  titleRef: RefObject<HTMLInputElement | null>;
}

function Modal({
  title,
  onClose,
  onSave,
  task,
  selectedColor,
  onSelectColor,
  titleRef,
}: ModalProps) {
  return (
    <div
      className="modal"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="modal-content">
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="close-btn" onClick={onClose}>
            &times;
          </button>
        </div>
        <form onSubmit={onSave}>
          <label htmlFor="title">Título</label>
          <input
            id="title"
            name="title"
            defaultValue={task?.title ?? ''}
            ref={titleRef}
            autoComplete="off"
          />

          <label htmlFor="description">Descrição</label>
          <textarea
            id="description"
            name="description"
            defaultValue={task?.description ?? ''}
          />

          <label>Cor</label>
          <div
            className="color-palette"
            style={{ position: 'relative', zIndex: 10 }}
          >
            {COLORS.map(color => (
              <div
                key={color}
                className="color-option"
                style={{
                  backgroundColor: color,
                  borderColor: selectedColor === color ? '#333' : 'transparent',
                  transform:
                    selectedColor === color ? 'scale(1.2)' : 'scale(1)',
                  cursor: 'pointer',
                  position: 'relative',
                  zIndex: 15,
                }}
                onClick={() => onSelectColor(color)}
                role="button"
                tabIndex={0}
                aria-label={`Selecionar cor ${color}`}
                onKeyDown={e => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    onSelectColor(color);
                  }
                }}
              />
            ))}
          </div>

          <div className="form-actions">
            <button type="button" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit">Salvar</button>
          </div>
        </form>
      </div>
    </div>
  );
}
