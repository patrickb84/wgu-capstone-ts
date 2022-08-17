import React from 'react'
import './assets/styles/App.css'
// import CategoryTable from './features/recipe-data/components/CategoryTable'
// import IngredientsTable from './features/recipe-data/components/IngredientsTable'
import { useRecipeData } from './features/recipe-data/hooks'
import 'bootstrap/dist/css/bootstrap.min.css'
import { DatePicker } from './components/DatePicker'
import { DateRangePicker } from './components/DateRangePicker'
import { Schedule } from './components/Schedule'
import { useMealPlan } from './features/meal-plan/meal-plan.state'
import { ShoppingListIngredientMeta } from './features/meal-plan/meal-plan.model'
import { Table } from './components/Table'

function App() {
   const recipeData = useRecipeData()
   const [dateRange, setDateRange] = React.useState<[Date | null, Date | null]>([null, null])
   const [startDate, endDate] = dateRange
   const mealPlan = useMealPlan()
   const [showList, setShowList] = React.useState<boolean>(false)

   console.log(recipeData)

   return (
      <div className="App">
         {/* <DatePicker /> */}
         <DateRangePicker
            onChange={dateRange => {
               console.log(dateRange)
               setDateRange(dateRange)
            }}
         />
         <div>
            <button
               className="btn btn-dark"
               onClick={async () => {
                  await mealPlan.deriveShoppingList()
                  setShowList(true)
               }}>
               ShowList
            </button>
            {showList && (
               <div className="mt-5">
                  <h2>Shopping List</h2>
                  <Table columns={['item', 'recipes', 'actions']}>
                     {mealPlan.shoppingList.map(ingredient => (
                        <tr key={ingredient.id}>
                           <td>{ingredient.name}</td>
                           <td>
                              {ingredient.recipesMeta.map(r => (
                                 <div key={r.recipe}>
                                    <table>
                                       <tbody>
                                          <tr>
                                             <td>{r.mealDate.toLocaleDateString()}</td>
                                             <td>
                                                <strong>{r.recipeName}</strong>
                                             </td>
                                             <td>
                                                <span className="text-danger">{r.recipeIngredientMeasure}</span>
                                             </td>
                                          </tr>
                                       </tbody>
                                    </table>
                                 </div>
                              ))}
                           </td>
                           <td></td>
                        </tr>
                     ))}
                  </Table>

                  <button className="btn btn-dark" onClick={() => setShowList(false)}>
                     HideList
                  </button>
               </div>
            )}
         </div>
         <Schedule startDate={startDate} endDate={endDate} />
         {/*          
         <IngredientsTable />
         <CategoryTable /> */}
      </div>
   )
}

export default App
