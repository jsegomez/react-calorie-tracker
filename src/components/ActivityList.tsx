import type { Dispatch } from "react";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

import { categories } from "../data/data";
import type { Activity } from "../types/activity";
import type { ActivityActions } from "../reducer/activityReducer";
import type { Category } from "../types/category";

type ActivityListProps = {
    activities: Activity[],
    dispatch: Dispatch<ActivityActions>
};

const categoryName = (category: Category['id']) => {
    return categories.find(cat => cat.id === category)?.name || 'Sin categoría';
};

const categoryColor = (category: Category['id']) => {
    const selectedColor = category === 1 ? "bg-lime-500" : "bg-orange-500";
    return selectedColor.concat(" absolute -top-8 -left-8 px-10 py-2 text-white uppercase font-bold");
};

export default function ActivityList({ activities, dispatch }: ActivityListProps) {

    const setActivityId = (id: string) => {
        dispatch({
            type: 'SET_ACTIVE_ID',
            payload: {
                activeId: id
            }
        });
    }

    const deleteActivity = (id: Activity['id']) => {
        dispatch({
            type: 'REMOVE_ACTIVITY',
            payload: { id }
        });
    }

    return (
        <>
            {
                activities.length === 0 && (
                    <p className="text-center text-2xl text-gray-500">
                        No hay actividades registradas
                    </p>
                )
            }


            {
                activities.length > 0 && (
                    <>
                        <h2 className="text-4xl font-bold text-slate-600 text-center">
                            Comida y actividades
                        </h2>

                        {
                            activities.map((activity) => (
                                <div
                                    key={activity.id}
                                    className="px-5 py-5 bg-white mt-7 flex justify-between"
                                >
                                    <div className="space-y-2 relative">
                                        <p className={categoryColor(activity.category)}>
                                            {categoryName(activity.category)}
                                        </p>
                                        <p className="text-2xl font-bold pt-5">{activity.name}</p>
                                        <p className="font-black text-2xl text-lime-500">
                                            {activity.calories}
                                            <span> Calorias</span>
                                        </p>
                                    </div>

                                    <div className="flex">
                                        <div className="flex gap-5 items-center">
                                            <button onClick={() => setActivityId(activity.id)}>
                                                <PencilSquareIcon className="h-8 w-8 text-gray-500 cursor-pointer" />
                                            </button>
                                        </div>

                                        <div className="flex gap-5 items-center ml-2">
                                            <button onClick={() => deleteActivity(activity.id)}>
                                                <TrashIcon className="h-8 w-8 text-red-500 cursor-pointer" />
                                            </button>
                                        </div>
                                    </div>

                                </div>
                            ))
                        }
                    </>
                )
            }
        </>
    )
}
