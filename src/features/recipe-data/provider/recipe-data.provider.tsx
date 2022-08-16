import ICategory from '@/types/Category'
import IIngredient from '@/types/Ingredient'
import { createContext } from 'react'
import { useEffect, useState } from 'react'
import recipesApi from '../api'

interface IRecipeDataContextState {
   categories: ICategory[]
   areas: any[]
   ingredients: IIngredient[]
   lookupCategory: (label: string) => void
   lookupIngredient: (ingredient: string) => void
}

export const RecipeDataContext = createContext({} as IRecipeDataContextState)

interface RecipeDataProviderProps {
   children: React.ReactNode
}

export const RecipeDataProvider = ({ children }: RecipeDataProviderProps) => {
   const [categories, setCategories] = useState([])
   const [areas, setAreas] = useState([])
   const [ingredients, setIngredients] = useState([])

   useEffect(() => {
      recipesApi.fetchAreas().then(setAreas)
      recipesApi.fetchIngredients().then(setIngredients)
      recipesApi.fetchCategories().then(setCategories)
   }, [])

   const lookupCategory = (label: string) => {
      if (!categories) {
         console.warn('No categories loaded')
      }
      const category = categories.filter((c: ICategory) => c.label === label)[0]
      return category
   }

   const lookupIngredient = (name: string) => {
      if (!ingredients) {
         console.warn('No ingredients loaded')
      }
      const ingredient = ingredients.filter(
         (i: IIngredient) => i.name.toLowerCase() === name.toLowerCase()
      )[0]
      return ingredient
   }

   const context: IRecipeDataContextState = {
      categories,
      areas,
      ingredients,
      lookupCategory,
      lookupIngredient
   }

   return (
      <RecipeDataContext.Provider value={context}>
         {children}
      </RecipeDataContext.Provider>
   )
}
