import React, { useEffect, useState } from "react";
import { UseContext } from "../contextApi/createContext";
import ClientAxios from "../../axios/clientAxios";

function Profile() {
    const { user,setUser,setNotification } = UseContext();
    const [errors, setError] = useState(null);
    const [data, setData] = useState({
        name: '',
        email: '',
        image: '',
    });
    const SubmitHandler = (e) => {
        e.preventDefault();
        let formData = new FormData();
        formData.append("name", data.name);
        formData.append("email", data.email);
        if(data.image instanceof File){
            formData.append("image", data.image);
        }
        const config = {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        };
        ClientAxios.post("/profile", formData, config)
            .then(({ data }) => {
               setUser(data.user)
               setData({...data,image:""})
               setNotification(data.message)
               setError(null)
            })
            .catch((err) => {
                const response = err.response;
                if (response && response.status === 422) {
                    setError(response.data.errors);
                }
            });
    };
    useEffect(()=>{
      setData({...data,name:user?.name,email:user?.email,image:user?.image_path})
    },[user])

    return (
        <div className="">
            <section className="bg-gray-50 dark:bg-gray-900 min-h-[100vh] ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto  lg:py-0">
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                Profile Settings
                            </h1>
                            {errors && (
                                <div className="bg-red-500 text-white text-sm p-4 rounded-md">
                                    {Object.keys(errors).map((item) => (
                                        <p key={item}> {errors[item][0]}</p>
                                    ))}
                                </div>
                            )}
                            <form
                                className="space-y-4 md:space-y-6"
                                onSubmit={SubmitHandler}
                                encType="multipart/form-data"
                            >
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={data.name}
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                name: e.target.value,
                                            })
                                        }
                                        id="name"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="John"
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                email: e.target.value,
                                            })
                                        }
                                        value={data.email}
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="name@company.com"
                                    />
                                </div>
                                <div>
                                    <img width={200} className="mb-2 rounded-md"
                                        src={`${
                                            import.meta.env.VITE_BASE_URL
                                        }/storage/${user?.image_path}`}
                                        alt=""
                                    />
                                    <label
                                        htmlFor="image"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                    >
                                        Profile Image
                                    </label>
                                    <input
                                        type="file"
                                        name="image"
                                        onChange={(e) =>
                                            setData({
                                                ...data,
                                                image: e.target.files[0],
                                            })
                                        }
                                        id="image"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-cyan-600 focus:border-cyan-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full text-white bg-cyan-600 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-cyan-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800"
                                >
                                    Update
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Profile;
