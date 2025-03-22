import { userState } from "@/Types/user.type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const loginFunc =createAsyncThunk("user/login", async (values:{email:string,password:string})=>{
  const option={
    method:"POST",
    url:`https://linked-posts.routemisr.com/users/signin`,
    data:values
  }
  const response = await axios.request(option)
  return response.data
})

const initialState :userState = {
  token:localStorage.getItem("token"),
};


const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: function (builder) {
  builder.addCase(loginFunc.fulfilled,(state,action)=>{
  toast.success("Welcome Back"); 
    state.token=action.payload.token;
    localStorage.setItem("token",action.payload.token)
  })
  builder.addCase(loginFunc.rejected,(state)=>{
    state.token=null;
    toast.error("InCorrect Email Or Password");
  })
  }
});

export const userReducer= userSlice.reducer;