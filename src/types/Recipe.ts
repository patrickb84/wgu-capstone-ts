import RecipeIngredient from 'Types/RecipeIngredient'
// import ITag from 'Types/Tag'

export default interface IRecipe {
   id: number | string | undefined
   name: string
   ingredients: RecipeIngredient[]
   area?: string
   category?: string
   tags?: string
   description?: string
   instructions?: string | string[]
   imageUrl?: string
   linkUrl?: string
   youtubeUrl?: string
}
