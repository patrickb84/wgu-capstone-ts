import IIngredient from '@/types/Ingredient'

export default interface RecipeIngredient extends IIngredient {
   idRecipe?: number
   measure?: string
}