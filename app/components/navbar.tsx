import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white dark:bg-black shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <a href="#" className="text-xl font-bold text-gray-900 dark:text-white">MealPlanner</a>
          </div>
          <div>
            <Link href="#" className="text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">Home</Link>
            <Link href="#" className="text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">Recipes</Link>
            <Link href="#" className="text-gray-800 dark:text-gray-200 px-3 py-2 rounded-md text-sm font-medium">About</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}