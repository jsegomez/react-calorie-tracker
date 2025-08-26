type CalorieDisplayProps = {
  calories: number
  category: "Consumidas" | "Quemadas" | "Diferencia"
}

export default function CalorieDisplay({ calories, category }: CalorieDisplayProps) {
  return (
    <>
        <p className="text-white text-center rounded-full grid grid-cols-1 gap-3">
          <span className="font-black text-6xl text-orange">{calories}</span>
          {category}
        </p>
    </>
  )
}
