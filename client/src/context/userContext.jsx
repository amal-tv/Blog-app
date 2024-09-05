import {createContext,useEffect,useState} from 'react';
import axios from 'axios';
export const userContext = createContext({});

export function UserContextProvider({children}){
    const [user, setUser] = useState(null);

  
 useEffect(()=>{
    getUser(); 
 },[])

async  function  getUser(){
    try{
      const res = await axios.get('http://localhost:3000/api/auth/refetch',{withCredentials : true});
      setUser(res.data);
    //   console.log(res.data);
    }catch(err){
        // console.log(err);
        setUser(null);
    }
 }

    return <userContext.Provider value={{user,setUser}}>
        {children}
    </userContext.Provider>
}
