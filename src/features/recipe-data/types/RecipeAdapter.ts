import recipesApi from '../api'
import IIngredient from 'Types/Ingredient'
import RecipeIngredient from 'Types/RecipeIngredient'
import IRecipe from 'Types/Recipe'
import IApiRecipe from './ApiRecipe'

export default class Recipe implements IRecipe {
   id: any
   name: string
   ingredients: IIngredient[]
   category?: string | undefined
   area?: string | undefined
   tags?: string | undefined
   private apiRecipe: any

   constructor(apiRecipe: IApiRecipe, ingredients: RecipeIngredient[]) {
      this.apiRecipe = apiRecipe
      this.id = apiRecipe.idMeal
      this.name = apiRecipe.strMeal || 'Recipe name not found'
      this.category = apiRecipe.strCategory
      this.area = apiRecipe.strArea
      this.tags = apiRecipe.strTags
      this.ingredients = ingredients
   }

   public static parseIngredients = (apiRecipe: any) => {
      const list: RecipeIngredient[] = []
      const listHas = (name: string) =>
         list.find(ingredient => ingredient.name === name)
      for (let i = 1; i <= 20; i++) {
         const name = apiRecipe[`strIngredient${i}`]
         const measure = apiRecipe[`strMeasure${i}`]
         if (name && !listHas(name)) {
            const ingredient: RecipeIngredient = {
               name,
               measure
            }
            list.push(ingredient)
         }
      }
      return list
   }

   public static async lookupIngredients(apiRecipe: any) {
      const table: IIngredient[] = await recipesApi.fetchIngredients()
      const bag: RecipeIngredient[] = []
      const inBag = (name: string) =>
         bag.find(i => i.name.toLowerCase() === name.toLowerCase())

      for (let i = 1; i <= 20; i++) {
         const name = apiRecipe[`strIngredient${i}`]
         const measure = apiRecipe[`strMeasure${i}`]

         if (name && !inBag(name)) {
            const listIndex = table.findIndex(i => i.name === name)

            if (listIndex !== -1)
               bag.push({
                  ...table[listIndex],
                  measure
               })
            else bag.push({ name, measure })
         }
      }

      console.warn(bag)
      return bag
   }

   public static async withIngredients(apiRecipe: any) {
      const table: IIngredient[] = await recipesApi.fetchIngredients()
      const bag: RecipeIngredient[] = []
      const inBag = (name: string) =>
         bag.find(i => i.name.toLowerCase() === name.toLowerCase())

      for (let i = 1; i <= 20; i++) {
         const name = apiRecipe[`strIngredient${i}`]
         const measure = apiRecipe[`strMeasure${i}`]

         if (name && !inBag(name)) {
            const listIndex = table.findIndex(i => i.name === name)

            if (listIndex !== -1)
               bag.push({
                  ...table[listIndex],
                  measure
               })
            else bag.push({ name, measure })
         }
      }

      return new Recipe(apiRecipe, bag)
   }
}
