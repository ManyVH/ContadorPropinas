import { useState, ChangeEvent, FormEvent, Dispatch, useEffect } from "react";
import { v4 as uuidv4} from 'uuid'
import { categories } from "../data/category";
import { Activity } from "../types";
import { ActivityActions, ActivityState } from '../reducers/activity-reducer';

type FormProps ={
  dispatch: Dispatch<ActivityActions>,
  state: ActivityState
}

const initialState: Activity = {
    id: uuidv4(),
    category: 1,
    name: '',
    calories: 0
}


export default function Form({dispatch, state}: FormProps) {
  const [activity, setActivity] = useState<Activity>(initialState)
  useEffect( ()=>{
    if (state.activeID) {
      const selectActivity = state.activities.filter( stateActivity => stateActivity.id === state.activeID)[0]
      setActivity(selectActivity)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.activeID])

  const handleChange = (e: ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLInputElement>) => {
    const isNumberField = ['category', 'calories'].includes(e.target.id)
    setActivity({
      ...activity,
      [e.target.id]: isNumberField ? +e.target.value : e.target.value
    })
  
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    dispatch({type: "save-activity", payload: {newActivity: activity}})

    setActivity({
      ...initialState,
      id: uuidv4()
    })
  }

  const isValueActivity = ()=>{
    const {name, calories} = activity
    return name.trim() != '' && calories>0
  }

  return (
    <form
      className="space-y-5 bg-white shadow p-10 rounded-lg "
      onSubmit={handleSubmit}>
        
      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="category" className="font-bold">Categorias</label>
        <select className="border border-slate-300 p-2 rounded-lg w-full"
          id="category"
          value={activity.category}
          onChange={handleChange}>
          {categories.map(category => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}</select>
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="name" className="font-bold">Actividad:</label>
        <input
          id="name"
          type="text"
          className="border border-slate-300 p-2 rounded-lg "
          placeholder="Ej. Comida, Jugo de Naranja, Bicicleta, Ejercicio"
          value={activity.name}
          onChange={handleChange} />
      </div>

      <div className="grid grid-cols-1 gap-3">
        <label htmlFor="calories" className="font-bold">Calorias:</label>
        <input
          id="calories"
          type="number"
          className="border border-slate-300 p-2 rounded-lg "
          placeholder="Ej. 200 , 300"
          value={activity.calories}
          min={0}
          onChange={handleChange} />
      </div>

      <input
        type="submit"
        className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white cursor-pointer disabled:bg-gray-300"
        value={activity.category === 1 ? "Guardar Comida" : "Guardar Ejercicio"} 
        disabled ={!isValueActivity()}
        />
    </form>
  )
}
