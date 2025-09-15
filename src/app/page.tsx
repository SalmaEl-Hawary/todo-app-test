import TodoApp from "@/components/TodoApp";

export default function Home() {
	return (
		<div className="min-h-screen bg-white text-gray-900 p-6">
			<div className="mx-auto max-w-2xl">
				<TodoApp />
			</div>
		</div>
	);
}
