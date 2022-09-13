import { elementServices } from "@/services/elements.service";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { elementsActions } from "./reducer";


// import { EUserRole } from "../../enums/userRole.enum";
// import { recieveToken } from "../../firebase";



export const GetAllElementsActions: any = (data: any) => async (dispatch: Function) => {
  try {
    dispatch(elementsActions.enableLoading)
    const response = await elementServices.getElements(data.body);
    // dispatch(elementsActions.disableLoading)
    dispatch(elementsActions.addElements(response.data.data))
    return { success: true, data: response.data.data }
  } catch (error) {
    console.log("error:", error)
    return { success: false, data: null }
  }
}


// export const
