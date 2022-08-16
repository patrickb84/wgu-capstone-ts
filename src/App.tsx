import React from 'react'
import './assets/styles/App.css'
import CategoryTable from './features/recipe-data/components/CategoryTable'
import IngredientsTable from './features/recipe-data/components/IngredientsTable'
import { useRecipeData } from './features/recipe-data/hooks'
import 'bootstrap/dist/css/bootstrap.min.css';
function App() {
   const recipeData = useRecipeData()
   const [date, setDate] = React.useState<any>((new Date()).toISOString().substring(0, 10))

   console.log(recipeData)
   console.log(date)

   return (
      <div className="App">
         {/* <IngredientsTable /> */}
         {/* <CategoryTable /> */}
         <input type="date" value={date} onChange={e => setDate(e.currentTarget.value)} />
      </div>
   )
}

export default App
