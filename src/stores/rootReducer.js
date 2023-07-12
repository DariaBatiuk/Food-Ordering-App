import { combineReducers } from "redux";
import cartReducer from "./cart/cartSlice";
import productReducer from "./menu/ProductsSlice";

const rootReducer = combineReducers({
	cart: cartReducer,
	products: productReducer
});

export default rootReducer;

