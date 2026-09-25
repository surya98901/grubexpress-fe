import type { signInData, signUpData } from "@/types/AuthFormData";
import {authApi }from "./api";

export const userAuthSignIn = (formData : signInData)=>{
    return authApi.post("/api/auth/login", formData);
}
export const userAuthSignUp = (formData : signUpData)=>{
    return authApi.post("/api/auth/signup", formData);
}
export const userAuthSignout =()=>{
    return authApi.post("/api/auth/logout");
}