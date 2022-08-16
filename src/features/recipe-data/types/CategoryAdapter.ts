import ICategory from "@/types/Category"

export default class Category implements ICategory {
   id: number
   label: string
   description?: string
   image?: string
   private _apiCategory: ApiCategory

   constructor(apiCategory: ApiCategory) {
      this._apiCategory = apiCategory
      this.id = parseInt(apiCategory.idCategory)
      this.label = apiCategory.strCategory
      this.description = apiCategory.strCategoryDescription
      this.image = apiCategory.strCategoryThumb
   }
}

export interface ApiCategory {
   idCategory: string
   strCategory: string
   strCategoryDescription: string
   strCategoryThumb: string
}
