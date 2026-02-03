import Image from 'next/image'
import {Recipe} from '@/app/types/recipe';

interface Props {
    key: number;
  recipe: Recipe;
}
export default function RecipeCard({key, recipe}: Props) {

    return (
        <>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
            

                <Image
                    src="/images/chicken.jpg"
                    width={500}
                    height={500}
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
          
          <ol>
            {recipe.instructions.map((step, index) => (
              <li className='mb-3' key={index}>{step}</li>
            ))}
          </ol>
        </span>
      </div>
            </div>
        </>
    )
}