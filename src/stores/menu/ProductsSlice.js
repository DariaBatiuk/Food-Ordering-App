import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from '../../api'

const initialState = {
	items: [],
	error: null,
	status: 'idle',
}

export const productsSlice = createSlice({
	name: 'products',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder.addCase(fetchProducts.fulfilled, (state, action) => {
			state.status = 'fulfilled'
			state.items = [...action.payload]
		});
		builder.addCase(fetchProducts.pending, (state) => {
			state.status = 'pending'
		})
	}
});

export const { getProducts } = productsSlice.actions

export default productsSlice.reducer

export const fetchProducts = createAsyncThunk('products/fetchProducts', api().getProductsByCategory)

export const selectAllProducts = state => state.products
