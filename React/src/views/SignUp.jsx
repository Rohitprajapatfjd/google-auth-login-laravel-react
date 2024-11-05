import React, { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ClientAxios from '../../axios/clientAxios';
import { UseContext } from '../contextApi/createContext';

function SignUp() {
    const {setNotification} = UseContext()
    const navigate = useNavigate()
    const [errors,seterror] = useState(null);
    const NameRef = useRef();
    const EmailRef = useRef();
    const PasswordRef = useRef();
    const PasswordConfirmationRef = useRef();
    const SubmitHandler = (e)=>{
        e.preventDefault();
        let data = {
            name: NameRef.current.value,
            email: EmailRef.current.value,
            password: PasswordRef.current.value,
            password_confirmation: PasswordConfirmationRef.current.value,
        }
       ClientAxios.post('/register',data).then(({data})=>{
         navigate('/login');
         setNotification('Registation Successfully')
       }).catch(err=>{
        const response = err.response;
        if(response && response.status=== 422){
            seterror(response.data.errors)
        }      
       })
    }
  return (
    <div className=''>
        <section className="bg-gray-50 dark:bg-gray-900 min-h-[100vh] ">
  <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
      <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                  Create an account
              </h1>
              {errors && <div className='bg-red-500 text-white text-sm p-4 rounded-md'>
                   {Object.keys(errors).map((item)=>(
                    <p key={item}> {errors[item][0]}</p>
                   ))}
                </div>}
              <form className="space-y-4 md:space-y-6" onSubmit={SubmitHandler}>
              <div>
                      <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Name</label>
                      <input ref={NameRef} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" />
                  </div>
                  <div>
                      <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                      <input ref={EmailRef} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" />
                  </div>
                  <div>
                      <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                      <input ref={PasswordRef} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"/>
                  </div>
                  <div>
                      <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                      <input ref={PasswordConfirmationRef} type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
                  </div>
                  <div className="flex items-start">
                      <div className="flex items-center h-5">
                        <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-cyan-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-cyan-600 dark:ring-offset-gray-800" />
                      </div>
                      <div className="ml-3 text-sm">
                        <label htmlFor="terms" className="font-light bg- text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-cyan-600 hover:underline dark:text-cyan-500" href="#">Terms and Conditions</a></label>
                      </div>
                  </div>
                  <button type="submit" className="w-full text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">Create an account</button>
                  <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account? <Link to='/login' className="font-medium text-cyan-600 hover:underline dark:text-cyan-500">Login here</Link>
                  </p>
              </form>
          </div>
      </div>
  </div>
</section>
    </div>
  )
}

export default SignUp