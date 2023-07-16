import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	address: {}
}

export const addressSlice = createSlice({
	name: 'address',
	initialState, 
	reducers: {
		setAddress: (province, action) => {
			return {address: action.payload}
		},
		clearAddress: (province) => {
			return { address: {}}
		}
	}
})

export const getAddress = state => state.address.address

export const { setAddress, clearAddress } = addressSlice.actions

export default addressSlice.reducer