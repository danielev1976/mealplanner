import Image from "next/image";
import { notFound } from "next/navigation";
import recipes from "@/data/recipes.json";
import { Recipe } from "@/app/types/recipe";

interface Props {
  params: {
    slug: string;
  };
}

export default function RecipePage({ params }: Props) {
  const recipe = (recipes as Recipe[]).find(
    (r) => r.slug === params.slug
  );

  if (!recipe) {
    notFound();
  }

  return (
    <main className="max-w-3xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-6">
        {recipe.title}
      </h1>

      <div className="relative h-64 w-full mb-8 rounded-xl overflow-hidden">
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className="object-cover"
        />
      </div>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-3">Ingredients</h2>
        <ul className="list-disc pl-5 space-y-1">
          {recipe.ingredients.map((item, i) => (
            <li key={i}>{item}</li>
          ))}
        </ul>
      </section>

      <section>
        <h2 className="text-xl font-semibold mb-3">Instructions</h2>
        <ol className="list-decimal pl-5 space-y-2">
          {recipe.instructions.map((step, i) => (
            <li key={i}>{step}</li>
          ))}
        </ol>
      </section>
    </main>
  );
}
