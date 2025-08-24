import type { Activity } from "../types/activity"

type CalorieTrackerProps = {
  activities: Activity[]
}

export default function CalorieTracker({ activities }: CalorieTrackerProps) {
  return (
    <div>
      {
        activities.length > 0 && (
          <h1>Habemus actividades</h1>
        )
      }
    </div>
  )
}
