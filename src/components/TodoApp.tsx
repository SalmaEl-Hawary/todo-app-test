"use client";

import React, { useEffect, useMemo, useState } from "react";

export type TodoItem = {
	id: string;
	text: string;
	completed: boolean;
};

const STORAGE_KEY = "simpletodo.todos";

function generateId(): string {
	const maybeCrypto: any = (globalThis as any).crypto;
	if (maybeCrypto && typeof maybeCrypto.randomUUID === "function") {
		return maybeCrypto.randomUUID();
	}
	return `id-${Date.now()}-${Math.random().toString(16).slice(2)}`;
}

export default function TodoApp() {
	const [todos, setTodos] = useState<TodoItem[]>([]);
	const [input, setInput] = useState<string>("");
	const [isHydrated, setIsHydrated] = useState<boolean>(false);

	// Load from localStorage after mount (avoid SSR issues)
	useEffect(() => {
		try {
			const raw = localStorage.getItem(STORAGE_KEY);
			if (raw) {
				const parsed = JSON.parse(raw) as TodoItem[];
				if (Array.isArray(parsed)) {
					setTodos(parsed);
				}
			}
		} catch {}
		setIsHydrated(true);
	}, []);

	// Persist to localStorage when todos change
	useEffect(() => {
		if (!isHydrated) return;
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
		} catch {}
	}, [todos, isHydrated]);

	function addTodo() {
		const trimmed = input.trim();
		if (!trimmed) return;
		const newTodo: TodoItem = {
			id: generateId(),
			text: trimmed,
			completed: false,
		};
		setTodos((prev) => [newTodo, ...prev]);
		setInput("");
	}

	function toggleTodo(id: string) {
		setTodos((prev) => prev.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
	}

	function deleteTodo(id: string) {
		setTodos((prev) => prev.filter((t) => t.id !== id));
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
		if (e.key === "Enter") {
			addTodo();
		}
	}

	const remainingCount = useMemo(() => todos.filter((t) => !t.completed).length, [todos]);

	// Avoid hydration mismatches: render nothing until the client hydrates
	if (!isHydrated) {
		return null;
	}

	return (
		<div className="mx-auto w-full max-w-xl">
			<h1 className="text-2xl font-semibold tracking-tight mb-4">Simple Todo</h1>
			<div className="flex gap-2">
				<input
					type="text"
					value={input}
					onChange={(e) => setInput(e.target.value)}
					onKeyDown={handleKeyDown}
					placeholder="Add a new task..."
					className="flex-1 rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
					aria-label="Todo input"
				/>
				<button
					onClick={addTodo}
					className="shrink-0 rounded-md bg-blue-600 text-white px-4 py-2 text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
					aria-label="Add todo"
				>
					Add
				</button>
			</div>

			<ul className="mt-4 space-y-2">
				{todos.length === 0 ? (
					<li className="text-sm text-gray-500">No todos yet. Add your first task above.</li>
				) : (
					todos.map((todo) => (
						<li key={todo.id} className="flex items-center gap-3 rounded-md border border-gray-200 p-2">
							<input
								id={`todo-${todo.id}`}
								type="checkbox"
								checked={todo.completed}
								onChange={() => toggleTodo(todo.id)}
								className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
							/>
							<label htmlFor={`todo-${todo.id}`} className={`flex-1 text-sm ${todo.completed ? "line-through text-gray-400" : "text-gray-900"}`}>
								{todo.text}
							</label>
							<button
								className="rounded-md px-2 py-1 text-xs text-red-700 hover:bg-red-50"
								onClick={() => deleteTodo(todo.id)}
								aria-label={`Delete ${todo.text}`}
							>
								Delete
							</button>
						</li>
					))
				)}
			</ul>

			<div className="mt-3 text-xs text-gray-500">{remainingCount} item(s) left</div>
		</div>
	);
}
