import { csrfFetch } from './csrf.js';

const SET_LIST = 'SET_LIST';
const ADD_LIST = 'ADD_LIST';

//ACTIONS
export const setList = (listsSlice) => {
    return {
        type: SET_LIST,
        payload: listsSlice
    }
}

export const addList = (list) => {
    return {
        type: ADD_LIST,
        payload: list
    }
}

//THUNKS
export const getList = () => async dispatch => {
    const response = await csrfFetch('/api/lists');
    if (!response.ok) {
        throw response;
    }
    const list = await response.json();
    dispatch(setList(list));
}



const initalState = {};

// REDUCER
const listReducer = (listsSlice = initalState, action) => {
    switch (action.type) {
        case SET_LIST:
            const lists = action.payload;
            const newLists = {};
            for (const list of lists) {
                newLists[list.id] = list;
            }
            return newLists
        case ADD_LIST:
            return listsSlice
        default:
            return listsSlice
    }
}

export const makeList = (list) => async (dispatch) => {
    const { userId, title } = list;
    const response = await csrfFetch("/api/lists", {
        method: "POST",
        body: JSON.stringify({
            userId,
            title
        }),
    });
    if (!response.ok) {
        throw response
    }
    const data = await response.json();
    dispatch(getList(data.list));
    return response;
};


export default listReducer;
