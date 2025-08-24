import { useEffect, useReducer } from "react"
import Form from "./components/Form"
import { activityReducer, initialState } from "./reducer/activityReducer";
import ActivityList from "./components/ActivityList";
import CalorieTracker from "./components/CalorieTracker";

function App() {
  const [state, dispatch] = useReducer(activityReducer, initialState);

  useEffect(() => {
    localStorage.setItem('activities', JSON.stringify(state.activities));
  }, [state.activities])

  return (
    <div className="bg-gray-100 h-screen">
      <header className="bg-lime-600 py-3">
        <div className="max-w-4xl mx-auto flex flex-row justify-between items-center">
          <h1 className="text-center text-lg font-bold text-white uppercase">
            Contador de calorías
          </h1>

          {
            state.activities.length > 0 && (
              <button
                className="bg-gray-800 hover:bg-gray-900 p-2 font-bold text-white uppercase rounded-lg text-sm cursor-pointer"
                onClick={() => dispatch({ type: 'CLEAR_ACTIVITIES' })}
              >
                Limpiar actividades
              </button>
            )
          }
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

      <section className="bg-gray-800">
          <div className="max-w-4xl mx-auto">
            <CalorieTracker activities={ state.activities }/>
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
