import { useMemo } from "react"
import CalorieDisplay from "./CalorieDisplay"
import { useActivity } from "../hooks/useActivity"

export default function CalorieTracker() {
  const { state } = useActivity();

  const consumedCalories = useMemo(() => {
    return state.activities.reduce((acc, activity) => {
      if (activity.category == 1 && activity.calories) return acc + activity.calories;      
      return acc
    } , 0)
  }, [state.activities])

  const burnedCalories = useMemo(() => {
    return state.activities.reduce((acc, activity) => {
      if (activity.category == 2 && activity.calories) return acc + activity.calories;
      return acc
    } , 0)
  }, [state.activities])

  const differenceCalories = useMemo(() => {
    return consumedCalories - burnedCalories
  }, [consumedCalories, burnedCalories])

  return (
    <div className="py-5">
      <h2 className="text-2xl font-bold text-white text-center">Resumen de calorías</h2>

      <div className="flex flex-col items-center md:flex-row md:justify-between gap-5 mt-10">
        <CalorieDisplay calories={consumedCalories} category="Consumidas" />
        <CalorieDisplay calories={burnedCalories} category="Quemadas" />
        <CalorieDisplay calories={differenceCalories} category="Diferencia" />
      </div>
    </div>
  )
}
