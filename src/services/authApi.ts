import type { signInData, signUpData } from "@/types/AuthFormData";
import {authApi }from "./api";

export const userAuthSignIn = (formData : signInData, role: string)=>{
    return authApi.post(`/api/auth/login?role=${role}`, formData);
}
export const userAuthSignUp = (formData : signUpData, role: string)=>{
    return authApi.post(`/api/auth/signup?role=${role}`, formData);
}
export const userAuthSignout =()=>{
    return authApi.post("/api/auth/logout");
}