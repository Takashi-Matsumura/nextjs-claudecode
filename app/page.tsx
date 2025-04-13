import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-8">
      <h1 className="text-4xl font-bold text-blue-600">Hello World!</h1>
      <Link 
        href="/tetris" 
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
      >
        Play Tetris
      </Link>
    </div>
  );
}