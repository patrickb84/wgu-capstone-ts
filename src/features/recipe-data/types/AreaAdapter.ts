import IArea from '@/types/Area'

export default class Area implements IArea {
   id: number | null
   name: string
   private _apiArea: ApiArea

   constructor(apiArea: ApiArea) {
      this._apiArea = apiArea
      this.id = null
      this.name = apiArea.strArea
   }
}

export interface ApiArea {
   strArea: string
}
