import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
    loading: false,
    elements: [],
    categories: [],
    filterdcategories: [],
    isMore: false
};

const slice = createSlice({
    name: "elements",
    initialState: initialState,
    reducers: {
        addElements: (state: any, {type, payload}: any ) => {
            console.log("payload:-=-=-", payload)
            state.elements = payload.page > 1 ? [...state.elements, ...payload.elements] : payload.elements
            state.categories = payload.categories
            state.filterdcategories = payload.filterdcategories
            state.isMore = payload.next
            state.loading = false
        },
        enableLoading: (state: any, payload: any) => {
            state.loading = true
        },
        disableLoading: (state: any, payload: any) => {
            state.loading = false
        },
        emptyElements: (state: any) => {
            state.elements = []
            state.categories = []
            state.filterdcategories = []
            state.isMore = []
        }
    },

});

export const { reducer: elementsReducer, actions: elementsActions } = slice;
