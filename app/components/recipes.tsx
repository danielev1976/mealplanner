import RecipeCard from "./recipecard";
const baseUrl = process.env.SPOONCULAR_API_URL;
export default async function Recipes() {
  //https://api.spoonacular.com/recipes/complexSearch?query=pizza&apiKey=YOUR_KEY
  //  const response = await fetch('${baseUrl}/complexSearch?query=${searchParam}1&apiKey=${process.env.SPOONCULAR_API_KEY}');
   // const recipes = await response.json();
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
     <RecipeCard/>
    </div>
  );
}