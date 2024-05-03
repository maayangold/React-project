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
            const updatedBuyingList = state.buyingList.map(item => {
                if (item.Id === action.payload.Id) {
                    return { ...item, Count: action.payload.Count };
                }
                return item;
            });
            return { ...state, buyingList: updatedBuyingList };
        }
        

        case actionType.DELETE_BUYING: {
            const buyingList = state.buyingList.filter(item => item.Id !== action.payload);
            return { ...state, buyingList };
        }


        default: {
            return { ...state }
        }
    }
}
