import { useDispatch, useSelector } from "react-redux";
import { fetchProducts, selectAllProducts } from "../../stores/menu/ProductsSlice";
import { useEffect } from "react";


export const Menu = () => {
	const dispatch  = useDispatch();
	const products = useSelector(selectAllProducts);

	useEffect(() => {
		dispatch (fetchProducts())
	}, [])

	return (
		<>Menu</>
	)
}

export default Menu;