import { createStore, combineReducers, applyMiddleware } from 'redux';
import User from "./reducerUser";
import Recipe from './reducerRecipe';
import Category from './reducerCategory';
import BuyList from './reducerBuying';
import { thunk } from 'redux-thunk'
const reducers = combineReducers({
    user: User,
    recipes: Recipe,
    categories: Category,
    buying: BuyList
})
export const store = createStore(reducers, applyMiddleware(thunk));

