
import * as actionType from './action'

const initialState = {
    user:null
}

export default function ReducerUser(state = initialState, action) {
    switch (action.type) {
       
        case actionType.SET_USER: {
          
            return { ...state,
                user: action.payload  }
        }

        default: {
            return { ...state }
        }
    }
}