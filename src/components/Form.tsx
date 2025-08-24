import { useEffect, useMemo, useState, type ChangeEvent, type Dispatch, type FormEvent } from 'react';
import { categories } from '../data/data';
import { v4 as uuidv4 } from 'uuid';

import type { Activity } from '../types/activity';
import type { ActivityActions, ActivityState } from '../reducer/activityReducer';

type FormProps = {
    dispatch: Dispatch<ActivityActions>;
    state: ActivityState;
}

export default function Form({ dispatch, state } : FormProps) {
    const { activeId, activities } = state;
    const initialState: Activity = {
        id: '',
        category: 1,
        name: '',
        calories: null
    };

    const [activity, setActivity] = useState<Activity>(initialState);

    useEffect(() => {
        if(activeId){            
            const selectedActivity = activities.find(activity => activity.id === activeId);
            if(selectedActivity) setActivity(selectedActivity);
        }
    }, [activeId, activities]);

    const isFormValid = useMemo(() => {
        return activity.name.trim().length > 0 && activity.category != null && activity.calories != null;
    }, [activity])

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {  
        const activityId = uuidv4();
        const isNumberField = ['calories', 'category'].includes(event.target.id);
        const value = isNumberField ? Number(event.target.value) : event.target.value;

        setActivity({ ...activity, [event.target.id]: value, id: activityId });
    }

    const saveActivity = (event: FormEvent<HTMLFormElement>) => {        
        event.preventDefault();
        dispatch({
            type: 'ADD_ACTIVITY',
            payload: {
                newActivity: activity
            }
        });

        setActivity(initialState);
    }

    return (
        <form
            className="space-y-5 bg-white shadow rounded-lg p-10"
            onSubmit={ (e) => saveActivity(e) }
        >
            <div className="grid grid-co
            ls-1 gap-3">
                <label htmlFor="category" className="font-bold">Categoría:</label>
                <select
                    name="calories"
                    id="category"
                    className="border border-slate-300 rounded-lg bg-white p-2"
                    value={activity.category}
                    onChange={(e) => handleChange(e)}
                >
                    {categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="name" className="font-bold">Actividad:</label>
                <input
                    id="name"
                    type="text"
                    value={activity.name}
                    onChange={(e) => handleChange(e)}
                    className="border border-slate-300 rounded-lg bg-white p-2"
                    placeholder="Ejemplo: Comida, Jugo de Naranja, Ensalada, Ejercicio, Pesas, Bicicleta"
                />
            </div>

            <div className="grid grid-cols-1 gap-3">
                <label htmlFor="calories" className="font-bold">Calorias:</label>
                <input
                    id="calories"
                    type="number"
                    value={activity.calories ?? ''}
                    onChange={(e) => handleChange(e)}
                    className="border border-slate-300 rounded-lg bg-white p-2"
                    placeholder="Ejemplo: 200, 150, 300"
                />
            </div>

            <input
                type="submit"
                disabled={!isFormValid}                
                value={ activity.category == 1 ? 'Guardar comida' : 'Guardar ejercicio'}
                className="bg-gray-800 hover:bg-gray-900 w-full p-2 uppercase text-white font-bold mt-4 rounded-lg cursor-pointer disabled:opacity-30"
            />
        </form>
    )
}
