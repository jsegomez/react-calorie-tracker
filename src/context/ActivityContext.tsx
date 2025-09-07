import { createContext, useReducer, type Dispatch, type ReactNode } from "react";
import {
    activityReducer,
    initialState,
    type ActivityActions,
    type ActivityState
} from "../reducer/activityReducer";

type ActivityProviderProps = {
    children: ReactNode
}

type ActivityContextProps = {
    state: ActivityState,
    dispatch: Dispatch<ActivityActions>
}

export const ActivityContext = createContext<ActivityContextProps>({} as ActivityContextProps);

export const ActivityProvider = ({children} : ActivityProviderProps) =>{
    const [state, dispatch] = useReducer(activityReducer, initialState)

    return (
        <ActivityContext.Provider value={{state, dispatch}}>
            { children }
        </ActivityContext.Provider>
    );
}



