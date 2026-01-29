import RecipeCard from "@/app/components/recipecard";
import recipes from "@/data/recipes.json";
import { Recipe } from "@/app/types/recipe";

export default function Recipes() {
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">
        Recipes
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {(recipes as Recipe[]).map(recipe => (
          <RecipeCard {...recipe} />
        ))}
      </div>
    </main>
  );
}
