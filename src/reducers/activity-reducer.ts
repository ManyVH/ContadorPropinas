import { Activity } from "../types/index";

export type ActivityActions = 
{ type: "save-activity" , payload: { newActivity: Activity}}|
{ type: "set-activeID" , payload: { id: Activity['id']}}|
{ type: "remove-activity" , payload: { id: Activity['id']}}|
{ type: "clean-activities"}

export type ActivityState = {
  activities: Activity[],
  activeID: Activity['id']
};

const localStorageActivivities = (): Activity[]=>{
  const activities = localStorage.getItem('activities')
  return activities ? JSON.parse(activities): []
}



export const initialState: ActivityState = {
  activities: localStorageActivivities(),
  activeID: ''
};



export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {

    if (action.type === 'save-activity') {
        //Este código maneja la lógica del state
        let updateActivities: Activity[] = []
        if(state.activeID){
          updateActivities = state.activities.map(activity => activity.id === state.activeID ? action.payload.newActivity: activity)
        }else{
          updateActivities = [...state.activities, action.payload.newActivity]
        }
        
        return {
          ...state,
          activities: updateActivities,
          activeID: ''
        }
    }
    if (action.type === 'set-activeID') {
      //Este código maneja la lógica del state
      
      
      return {
        ...state,activeID: action.payload.id
      }
  }

  if (action.type === 'remove-activity') {
    //Este código maneja la lógica del state
    
    
    return {
      ...state,
      activities: state.activities.filter( activity => activity.id!==action.payload.id)
    }
}

if (action.type === 'clean-activities') {
  //Este código maneja la lógica del state
  
  
  return {
    activities: [],
    activeID:''
  }
}
    return state
};
