import { UPDATE_PRODUCTS, UPDATE_CATEGORIES, UPDATE_CURRENT_CATEGORY } from "./actions";
import {useReducer} from 'react';

export const reducer = (state, action) => {
    switch(action.type){
        //if we are updating products then copy the state to the new state and give it the new products category
        case UPDATE_PRODUCTS: 
            return {
                ...state,
                products: [...action.products]
            };

        //if we are updating the categories array, then we spread the state and update the categories with a new array
        case UPDATE_CATEGORIES:
            return {
                ...state,
                categories: [...action.categories]
            };

        case UPDATE_CURRENT_CATEGORY:
            return {
                ...state,
                currentCategory: action.currentCategory
            }

        //if we are not updating anything then we do not update state at all
        default:
            return state;
    }
}

export function useProductReducer(initialState){
    return useReducer(reducer, initialState);
}