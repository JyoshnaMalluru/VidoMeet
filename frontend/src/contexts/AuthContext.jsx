import axios from "axios";
import {createContext} from "react";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";


export const AuthContext = createContext({});

const client = axios.create({
    baseURL: "http://localhost:8000/api/v1/users"
})

export const AuthProvider = ({children}) => {
    const authContext = useContext(AuthContext);
    const [userData,setUserData] = useState(authContext);
    const handleRegister = async(name,username,password)=>{
        try{
            let request = await client.post("/register",{
                name : name,
                username : username,
                password : password
            })
            if(request.status === 201){
                return request.data.message;
            }
        }catch(err){
            throw err.response?.data?.message || err.message;
        }
    }

    const handleLogin = async(username,password)=>{
        try{
            const request = await client.post("/loginr",{
                username : username,
                password : password
            })
            if(request.status === 200){
                localStorage.setItem("token",request.data.token);
                return "Login successful!";
            }
        }catch(err){
            throw err.response?.data?.message || err.message;
        }
    }
    // const router = useNavigate();
    const data = {
        userData,setUserData,handleRegister,handleLogin
    }
    return(
        <AuthContext.Provider value={data}>
            {children}
        </AuthContext.Provider>
    )
}