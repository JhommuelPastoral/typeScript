import axiosInstance from "./axios.ts";
export const signUp = async (data : {email: string, password: string}) : Promise<any>=>{
  try {
    const res = await axiosInstance.post("/auth/signup", data);
    return res.data
  } catch (error) {
    console.log(error);
  }
}