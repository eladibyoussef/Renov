// import { Response } from 'express';
import axios from 'axios'
import { Base_URL } from '../../constants';
import { createSlice , createAsyncThunk  } from '@reduxjs/toolkit'
const API = axios.create({baseURL: Base_URL})



export interface proDocument{
    CIN: string,
    license: string
    username:string,
    email:string,
    phoneNumber:number,
    address: string,
    servicesProvided:string[]
}


interface professionalState{
   professional: [proDocument]
   loading:boolean,
   message: string,
   error: string | null
   
}

const initialState: professionalState = {
  professional:[{
    CIN: "",
    username:"",
    email:"",
    phoneNumber :NaN,
    license:'',
    address: "",
    servicesProvided:[]
  }],
  loading:false,
  message: "",
  error: null
}


export const professionalRegisterReq = createAsyncThunk('professional/professionalRegisterReq' , 
async (form:proDocument, {rejectWithValue}) =>{
    try {
        
        const response = await API.post('/pro/request-register',form)
        console.log(response.data);
        return response.data
        
        
    } catch (error) {
        const errorMessage ='An error occurred';
      // Dispatch the error message as payload
      return rejectWithValue(errorMessage);    }
} 
)
export const  professionalSlice = createSlice({
    name: 'professional',
    initialState,
    reducers: {
        
    },
    extraReducers: builder =>{
        builder
        .addCase(professionalRegisterReq.pending, (state)=>{
            state.loading= true 



        })
        .addCase(professionalRegisterReq.fulfilled, (state, action)=>{
            state.loading = false;
            state.message = action.payload as string,
            console.log('state',state.message);
            
        })
        .addCase(professionalRegisterReq.rejected, (state, action)=>{
            state.loading = false;
            state.error = action.payload as string; 
        })

    }

})


export default professionalSlice.reducer