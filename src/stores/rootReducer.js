import { combineReducers } from "redux";
import cartReducer from "./cart/cartSlice";
import userReducer from './user/userSlice';
import productReducer from "./menu/ProductsSlice";
import addressReducer from "../pages/userInfo/addressSlice";

const rootReducer = combineReducers({
	cart: cartReducer,
	products: productReducer,
	address: addressReducer,
	user: userReducer,
});

export default rootReducer;

