export interface Category{
    id: number,
    name: string
}

export type FormDataCalories = {
    category: 1 | 2,
    name: string,
    calories: number
}