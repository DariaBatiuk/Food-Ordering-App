import { combineReducers } from "redux";
import cartReducer from "./cart/cartSlice";
import productReducer from "./menu/ProductsSlice";
import addressReducer from "../pages/userInfo/addressSlice";

const rootReducer = combineReducers({
	cart: cartReducer,
	products: productReducer,
	address: addressReducer 
});

export default rootReducer;

