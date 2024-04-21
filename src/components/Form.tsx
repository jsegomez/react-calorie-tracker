import { ChangeEvent, FormEvent, useState } from "react";
import { categories } from "../data/form-data";
import { FormDataCalories } from "../types/category.interface";

const Form = () => {
    const [activity, setActivity] = useState<FormDataCalories>({
        category: 1,
        name: '',
        calories: 0
    });

    const isValidActivity = ():boolean => {
        const {name, calories} = activity;
        return name.trim() !== '' && calories > 0;
    };
    
    const handleChange = (event: ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
        const isNumberField: boolean = ['category', 'calories'].includes(event.target.id);             
        const value = isNumberField ? Number(event.target.value) : event.target.value;

        setActivity({
            ...activity,
            [event.target.id]: value
        });
    }

    const saveActivity = (event: FormEvent<HTMLFormElement>) =>{    
        event.preventDefault();    
        console.log(activity)
    }


    return (
        <form className="space-y-5 bg-white p-10 rounded-lg" onSubmit={ saveActivity }>
            <div className="grid grid-cols-1 gap-3">
                
                <label htmlFor="category">Categoría</label>
                <select
                    id="category"                    
                    onChange={ handleChange }
                    className="border border-slate-300 p-2 rounded-lg w-full bg-white">
                    {
                        categories.map( category => (
                            <option key={category.id} value={category.id}>
                                { category.name }
                            </option>
                        ))
                    }
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name">Actividad:</label>
                <input
                    id="name"
                    type="text"
                    className="border border-slate-300 rounded-lg px-3 py-2"
                    placeholder="Ej. Comida, Jugo de naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
                    value={activity.name}
                    onChange={ handleChange }
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories">Calorias:</label>
                <input
                    id="calories"
                    type="number"
                    className="border border-slate-300 rounded-lg px-3 py-2"
                    placeholder="Calorias. Ej. 300"
                    value={activity.calories}
                    onChange={ handleChange }
                />
            </div>

            <input
                type="submit"                
                disabled={!isValidActivity()}
                value={ activity.category == 1 ? 'Guardar comida' : 'Guardar ejercicio' }
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 font-bold uppercase text-white disabled:opacity-10 disabled:cursor-not-allowed enabled:cursor-pointer"
            />
        </form>
    );
}
 
export default Form;