import type { Activity } from "../types/activity";

export type ActivityActions = 
    { type: 'ADD_ACTIVITY', payload: { newActivity: Activity } } | 
    { type: 'SET_ACTIVE_ID', payload: { activeId: Activity['id'] } } |
    { type: 'REMOVE_ACTIVITY', payload: { id: Activity['id'] } } |
    { type: 'CLEAR_ACTIVITIES' }

export type ActivityState = {
    activities: Activity[];
    activeId: Activity['id'];
}

export const localStorageActivities = (): Activity[] => {
    const localStorageData = localStorage.getItem('activities');
    return localStorageData ?  JSON.parse(localStorageData) : [];
}

export const initialState: ActivityState = {
    activities: localStorageActivities(),
    activeId: ''
}

export const activityReducer = (
    state: ActivityState = initialState,
    action: ActivityActions
) => {
    if(action.type == 'ADD_ACTIVITY' && state.activeId){
        const updatedActivities = state.activities.map(activity =>
            activity.id === state.activeId ? {...action.payload.newActivity, id: state.activeId } : activity
        );

        return {
            ...state,
            activities: updatedActivities, 
            activeId: ''
        }
    }

    if(action.type == 'ADD_ACTIVITY' && !state.activeId){
        return {
            ...state,
            activities: [...state.activities, action.payload.newActivity]
        }
    }

    if(action.type == 'SET_ACTIVE_ID'){
        return {
            ...state,
            activeId: action.payload.activeId
        }
    }

    if(action.type == 'REMOVE_ACTIVITY'){
        const filteredActivities = state.activities.filter(activity => activity.id !== action.payload.id);

        return {
            ...state,
            activities: filteredActivities
        }
    }

    if(action.type == 'CLEAR_ACTIVITIES'){
        return {
            ...state,
            activities: [],
            activeId: ''
        }
    }

    return state;
}   