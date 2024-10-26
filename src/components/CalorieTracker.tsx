import { useMemo } from "react"
import { Activity } from "../types"
import CaloriesDisplay from "./CaloriesDisplay"


type CaloriesTrackerProps = {
  activities: Activity[]
}

export default function CalorieTracker({activities}: CaloriesTrackerProps) {
  //Contadores
  const caloriesConsumed = useMemo(()=> activities.reduce((total,activity)=>activity.category===1?total+activity.calories:total,0), [activities])
  const caloriesBurned = useMemo(()=> activities.reduce((total,activity)=>activity.category===2?total+activity.calories:total,0), [activities])
  const netCalories = useMemo(()=> caloriesConsumed-caloriesBurned, [caloriesBurned, caloriesConsumed])
  
  return (
    <>
      <h2 className="text-4xl text-white font-black text-center ">Resumen de Calorias</h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CaloriesDisplay calories={caloriesConsumed} texto="Consumidas"></CaloriesDisplay>
        <CaloriesDisplay calories={caloriesBurned} texto="Quemadas"></CaloriesDisplay>
        <CaloriesDisplay calories={netCalories} texto={netCalories>0?'Calorías Ganadas':'Calorías Perdidas'}></CaloriesDisplay>
      </div>
      
      
    </>
  )
}
