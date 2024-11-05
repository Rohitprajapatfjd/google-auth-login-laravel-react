import axios from "axios";

const ClientAxios = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_URL}/api`
});

ClientAxios.interceptors.request.use(
    (config)=>{
    const token = localStorage.getItem('Token');

    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
},
  (error)=>{
     return Promise.reject(error)
  }
)

ClientAxios.interceptors.response.use((fullfill)=>{
   return fullfill;
},(reject)=>{
  const {response} = reject;

  if(response && response.status == 401){
    localStorage.removeItem('Token')
  }

  return Promise.reject(reject)
})

export default ClientAxios
