import { csrfFetch } from './csrf.js';

const SET_TASK = "GET_TASK";
const ADD_TASK = "ADD_TASK";
//ACTIONS
export const setTasks = (taskSlice) => {
    return {
        type: SET_TASK,
        payload: taskSlice
    }
}

export const addTask = (task) => {
    return {
        type: ADD_TASK,
        payload: task
    }
}

//THUNKS
export const getTasks = () => async dispatch => {
    const response = await csrfFetch('/api/tasks');
    if (!response.ok) {
        throw response
    }
    const tasks = await response.json();
    dispatch(setTasks(tasks))
}

export const createTasks = (task) => async dispatch => {
    const response = await csrfFetch('/api/tasks', {
        method: 'POST',
        body: JSON.stringify(task)
    });
    if (!response.ok) {
        throw response
    }
    const myTask = await response.json();
    dispatch(addTask(myTask))
}

const initialState = {};
//REDUCER
const taskReducer = (taskSlice = initialState, action) => {
    const newState = { ...taskSlice };
    switch (action.type) {
        case SET_TASK:
            const tasks = action.payload;
            const newTasks = {};
            for (const task of tasks) {
                newTasks[task.id] = task
            }
            return newTasks;
        case ADD_TASK:
            newState[action.payload.id] = action.payload
            return newState;
        default:
            return taskSlice;
    }
}

export default taskReducer;
