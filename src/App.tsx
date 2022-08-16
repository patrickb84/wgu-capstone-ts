import React from 'react'
import './assets/styles/App.css'
import CategoryTable from './features/recipe-data/components/CategoryTable'
import IngredientsTable from './features/recipe-data/components/IngredientsTable'
import { useRecipeData } from './features/recipe-data/hooks'

function App() {
   const recipeData = useRecipeData()

   console.log(recipeData)

   return (
      <div className="App">
         {/* <IngredientsTable /> */}
         <CategoryTable />
      </div>
   )
}

export default App
