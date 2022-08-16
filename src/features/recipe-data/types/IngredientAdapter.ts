import IIngredient from 'Types/Ingredient'

export default class Ingredient implements IIngredient {
   // private _ingredient: ApiIngredient
   id: number
   name: string
   description: string | undefined
   type: string | undefined

   constructor(adaptee: ApiIngredient) {
      // this._ingredient = adaptee
      this.id = parseInt(adaptee.idIngredient)
      this.name = adaptee.strIngredient
      this.description = adaptee.strDescription
      this.type = adaptee.strType
   }
}

export interface ApiIngredient {
   idIngredient: string
   strDescription: string
   strIngredient: string
   strType: string
}