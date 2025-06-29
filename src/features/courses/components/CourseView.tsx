import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BookOpen, CheckSquare } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useState, useEffect } from "react";
import type { Todo } from "@/features/calendar/types";

const STORAGE_KEY_PREFIX = 'course_todos_';

const CourseView = () => {
  const { courseId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const courseTitle = location.state?.courseTitle || "Cours";
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(`${STORAGE_KEY_PREFIX}${courseId}`);
    if (stored) {
      setTodos(JSON.parse(stored));
    }
  }, [courseId]);

  const saveTodos = (newTodos: Todo[]) => {
    localStorage.setItem(`${STORAGE_KEY_PREFIX}${courseId}`, JSON.stringify(newTodos));
    setTodos(newTodos);
  };

  const toggleTodo = (todoId: string) => {
    const newTodos = todos.map(todo => 
      todo.id === todoId ? { ...todo, completed: !todo.completed } : todo
    );
    saveTodos(newTodos);
  };

  const addTodo = () => {
    const text = prompt("Nouvelle tâche:");
    if (text) {
      const newTodo: Todo = {
        id: crypto.randomUUID(),
        courseId: courseId!,
        text,
        completed: false
      };
      saveTodos([...todos, newTodo]);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <Button 
        variant="ghost" 
        onClick={() => navigate(-1)}
        className="mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour
      </Button>

      <h1 className="text-4xl font-bold mb-8">{courseTitle}</h1>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/course/${courseId}/notes`)}>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Notes de cours
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Accéder à vos notes pour ce cours
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="flex items-center">
              <CheckSquare className="mr-2 h-5 w-5" />
              À faire
            </CardTitle>
            <Button variant="outline" size="sm" onClick={addTodo}>
              Ajouter
            </Button>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {todos.map(todo => (
                <li
                  key={todo.id}
                  className="flex items-center gap-2 p-2 hover:bg-accent rounded-md cursor-pointer"
                  onClick={() => toggleTodo(todo.id)}
                >
                  <input
                    type="checkbox"
                    checked={todo.completed}
                    readOnly
                    className="h-4 w-4"
                  />
                  <span className={todo.completed ? "line-through text-muted-foreground" : ""}>
                    {todo.text}
                  </span>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CourseView;