import * as actionType from './action'

const initialState = {
    recipes: [],
    selectedRecipe: null
}

export default function ReducerRecipe(state = initialState, action) {
    switch (action.type) {
        case actionType.SET_RECIPES:
            return { ...state, recipes: action.payload }

        case actionType.ADD_RECIPE: {
            const recipes = [...state.recipes];
            recipes.push(action.payload);
            return { ...state, recipes }
        }
        case actionType.EDIT_RECIPE: {
            const recipes = [...state.recipes];
            const findeIndex = recipes.findIndex(x => x.Id === action.payload.Id);
            recipes[findeIndex] = action.payload;
            return { ...state, recipes }
        }
        case actionType.DELETE_RECIPE: {
            const recipes = state.recipes.filter(r => r.Id !== action.payload.Id);
            return { ...state, recipes }

        }
        case actionType.SET_SELECTED_RECIPE:
            {
                return { ...state,  selectedRecipe: action.payload }
    
            }
        
        default: {
            return { ...state }
        }
    }
}
