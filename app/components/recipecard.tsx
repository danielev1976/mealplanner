import Image from 'next/image'
import Link from 'next/link';
export interface Recipe {
  title: string;
  image: string;
  ingredients: string[];
  instructions: string[];
}

interface Props {
    key: number;
  recipe: Recipe;
}
export default function RecipeCard({key, recipe}: Props) {

    return (
        <Link href={`/recipes/${key}`} className="max-w-sm rounded overflow-hidden shadow-lg">
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                 <Image
                    src="/images/chicken.jpg"
                    width={300}
                    height={300}
                    alt="Picture of the author"
                />  
            
                <div className="px-6 py-4">
                    
                    <div className="font-bold text-xl mb-2">{recipe.title}</div>
               
                </div>
               <div className="p-4">
     
        <p className="text-sm text-amber-600 mb-3">
          {recipe.ingredients.join(", ")}
        </p>

        <span className="text-sm text-gray-300 font-medium">
          
        </span>
      </div>
            </div>
        </Link>
    )
}