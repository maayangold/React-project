import * as actionType from './action'

const initialState = {
    buyingList: [],

}

export default function ReducerBuying(state = initialState, action) {
    switch (action.type) {
        case actionType.SET_BUYING:
            {
                return ({
                    ...state,
                    buyingList: action.payload
                });
            }

        case actionType.ADD_BUYING: {
            const buyingList = [...state.buyingList];
            buyingList.push(action.payload);
            return { ...state, buyingList }
        }
        case actionType.EDIT_BUYING: {
            const buying = [...state.buyingList];
            const findeIndex = buying.findIndex(x => x.Id === action.payload.Id);
            buying[findeIndex].Count = action.payload.Count;
            return {
                ...state,
                buyingList: buying
            }
        }
        case actionType.DELETE_BUYING: {
            const recipes = state.recipes.filter(r => r.Id !== action.payload);
            return { ...state, recipes }

        }


        default: {
            return { ...state }
        }
    }
}
