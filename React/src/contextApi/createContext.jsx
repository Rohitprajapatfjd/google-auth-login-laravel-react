import { createContext,useContext ,useState } from "react";

 const ContextApi = createContext({
    user: null,
    setUser: {},
    token: null,
    setToken: {},
    notification: null,
    setNotification: {}
});

export const ContextProvider = ({children})=>{
    const [user, setUser] = useState(null);
    const [token , _setToken] = useState(localStorage.getItem('Token'));
    const [notification, _setNotification] = useState(null)
    const setNotification = (message) =>{
      _setNotification(message);
      setTimeout(()=>{
       _setNotification(null)
      },5000)
    }
    const setToken = (token) =>{
         _setToken(token);
         if(token){
            localStorage.setItem('Token', token)
         }else{
            localStorage.removeItem('Token')
         }
    }
     return (
        <ContextApi.Provider value={{user, setUser , token, setToken,notification , setNotification}}>
        {children}
       </ContextApi.Provider>
     )

     
   
}

export const UseContext = ()=> useContext(ContextApi);