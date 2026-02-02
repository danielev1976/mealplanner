import Recipes from "@/app/recipes/page";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <h2>My Recipes</h2>
     <Recipes/>
    </div>
  );
}
