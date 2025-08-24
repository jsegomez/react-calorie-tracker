import { useEffect, useReducer } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducer/activityReducer";
import ActivityList from "./components/ActivityList";

function App() {  
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities));
  }, [state.activities])
  
  return (
    <div className="bg-gray-100 h-screen">
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex justify-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de calorías
          </h1>
        </div>
      </header>

      <section className="bg-lime-500 py-20 px-20">
        <div className="max-w-4xl mx-auto">
          <Form             
            dispatch={dispatch}
            state={state}
          />
        </div>
      </section>

      <section className="py-20 px-20">
          <ActivityList
            activities={state.activities}
            dispatch={dispatch}
          />
      </section>
    </div>
  )
}

export default App
