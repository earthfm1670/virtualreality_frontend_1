"use client";

import { useState } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Pencil, Trash, Check, X } from "lucide-react";

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: number) => void;
  onToggle: (id: number) => void;
  onEdit: (id: number, newText: string) => void;
}

export default function TodoItem({
  todo,
  onDelete,
  onToggle,
  onEdit,
}: TodoItemProps) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editText, setEditText] = useState<string>(todo.text);

  const handleEdit = () => {
    onEdit(todo.id, editText);
    setIsEditing(false);
  };

  return (
    <li className="flex items-center justify-between p-4 border-b border-gray-700">
      <div className="flex item-center space-x-2">
        <Checkbox
          checked={todo.completed}
          onCheckedChange={() => onToggle(todo.id)}
          id={`todo-${todo.id}}`}
          className="border-gray-600 text-blue-500"
        />
        {isEditing ? (
          <Input
            type="text"
            value={editText}
            onChange={(e) => setEditText(e.target.value)}
            className="flex-grow bg-gray-800 text-gray-100 border-gray-700"
          />
        ) : (
          <label
            htmlFor={`todo-${todo.id}`}
            className={`flex-grow ${
              todo.completed ? "line-through text-gray-500" : "text-gray-100"
            }`}
          >
            {todo.text}
          </label>
        )}
      </div>
      <div className="flex space-x-2">
        {isEditing ? (
          <>
            <Button
              size="icon"
              variant="ghost"
              onClick={handleEdit}
              className="hover:bg-gray-700"
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsEditing(false)}
              className="hover:bg-gray-700"
            >
              <X className="h-4 w-4" />
            </Button>
          </>
        ) : (
          <>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setIsEditing(true)}
              className="hover:bg-gray-700"
            >
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onDelete(todo.id)}
              className="hover:bg-gray-700"
            >
              <Trash className="h-4 w-4" />
            </Button>
          </>
        )}
      </div>
    </li>
  );
}
