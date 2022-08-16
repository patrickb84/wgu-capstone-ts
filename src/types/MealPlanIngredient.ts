import IIngredient from 'Types/Ingredient'

export default interface IMealPlanIngredient extends IIngredient {
   // fromRecipes: RecipeIngredient[]
   crossedOff: boolean
}
