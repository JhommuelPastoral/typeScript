import axiosInstance from "./axios.ts";
import axios from "axios";
export const signUp = async (data : {email: string, password: string}) : Promise<any>=>{
  try {
    const res = await axiosInstance.post("/auth/signup", data);
    return res.data;
  } catch (error) {
    if(axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
}

export const login = async (data : {email: string, password: string}) : Promise<any>=>{
  try {
    const res = await axiosInstance.post("/auth/login", data);
    return res.data;
  } catch (error) {
    if(axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
}




export const myProfile = async () : Promise<any>=>{
  try {
    const res = await axiosInstance.get("/auth/user");
    return res.data;
  } catch (error) {
    return null;
  }
}

export const logOut = async () : Promise<any>=>{
  try {
    const res = await axiosInstance.post("/auth/logout");
    return res.data;
  } catch (error) {
    return null;
  }
}

export const googleLogin = async (data: {email: string}) : Promise<any>=>{
  try {
    const res = await axiosInstance.post("/auth/google", data);
    return res.data;
  } catch (error) {
    if(axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
}

export const createGoogleUser = async (data: {password: string}) : Promise<any>=>{
  try {
    const res = await axiosInstance.post("/auth/createGoogleUser", data);
    return res.data;
  } catch (error) {
    if(axios.isAxiosError(error)) {
      throw new Error(error.response?.data.message);
    }
  }
}