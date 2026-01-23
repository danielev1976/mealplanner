import fs from "fs/promises";
import path from "path";

const dataFilePath = path.join(process.cwd(), "data", "recipes.json");

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  createdAt: string;
}

export async function getAllRecipes(): Promise<Recipe[]> {
  const data = await fs.readFile(dataFilePath, "utf-8");
  return JSON.parse(data) as Recipe[];
}

export async function saveRecipe(recipe: Recipe): Promise<void> {
  const recipes = await getAllRecipes();
  recipes.push(recipe);
  await fs.writeFile(dataFilePath, JSON.stringify(recipes, null, 2));
}  

export async function findRecipeById(id: string): Promise<Recipe | undefined> {
  const recipes = await getAllRecipes();
  return recipes.find((recipe) => recipe.id === id);
}

export async function deleteRecipeById(id: string): Promise<void> {
  const recipes = await getAllRecipes();
  const filteredRecipes = recipes.filter((recipe) => recipe.id !== id);
  await fs.writeFile(dataFilePath, JSON.stringify(filteredRecipes, null, 2));
}

export async function updateRecipe(updatedRecipe: Recipe): Promise<void> {
  const recipes = await getAllRecipes();
  const index = recipes.findIndex((recipe) => recipe.id === updatedRecipe.id);
  if (index !== -1) {
    recipes[index] = updatedRecipe;
    await fs.writeFile(dataFilePath, JSON.stringify(recipes, null, 2));
  }
}

