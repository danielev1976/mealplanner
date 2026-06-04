import RecipeCard from "@/app/components/recipecard";
import recipes from "@/data/recipes.json";
import RecipeSearch from "../components/RecipeSearch";

export default function Recipes() {
  interface Recipe {
    title: string;
    image: string;
    ingredients: string[];
    instructions: string[];
  }
  return (
    <main className="max-w-7xl mx-auto px-6 py-10">
   
      <RecipeSearch />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {(recipes as Recipe[]).map((recipe, index) => (
          <RecipeCard key={index} recipe={recipe} />
        ))}
      </div>
    </main>
  );
}
