import { useState } from 'react';
import { Link } from 'react-router';
import background from '../../utils/images/registerBackground.svg';
import type { Route } from "./+types/register";


export function meta({ }: Route.MetaArgs) {
    return [
        { title: "Register" }
    ];
}

export default function Login() {

    const [authChecked, setAuthChecked] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [errorUsername, setErrorUsername] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorConfirm, setErrorConfirm] = useState('')
    const [error, setError] = useState('')
    const [isChecked, setIsChecked] = useState(false)


    const checkConfirm = (e: React.ChangeEvent<HTMLInputElement>) => {
        setErrorConfirm('')
        if (!e.target.value) {
            setErrorConfirm('Please fill confirm password field!')
        } else if (e.target.value !== password) {
            setErrorConfirm('Passwords do not match!')
        }
    }

    const toggleCheckbox = () => {
        setIsChecked(!isChecked)
    }

    return (
        <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
            <div className="max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1">
                <div className="flex-1 bg-green-100 text-center hidden lg:flex">
                    <div className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${background})` }}>
                    </div>
                </div>

                <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12 bg-gradient-to-b from-white via-green-50 to-green-100">
                    <div id="logo">
                        <p className="text-3xl font-bold text-center">
                            E-Commerce
                        </p>
                    </div>
                    <div className="mt-12 flex flex-col items-center">
                        <div className="w-full flex-1 mt-8">

                            <div className="mx-auto max-w-xs">
                                <div className="flex gap-1 flex-col">
                                    <input
                                        className="w-full p-4 rounded-lg font-medium bg-white border border-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white"
                                        type="email" placeholder="Email" value={username} onChange={(e) => setUsername(e.target.value)} required />
                                    {errorUsername && <p className="text-red-500 font-medium text-sm">{errorUsername}</p>}
                                </div>
                                <div className="flex gap-1 flex-col">
                                    <input
                                        className="w-full p-4 rounded-lg font-medium bg-white border border-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                                    {errorPassword && <p className="text-red-500 font-medium text-sm">{errorPassword}</p>}
                                </div>

                                <div className="flex gap-1 flex-col">
                                    <input
                                        className="w-full p-4 rounded-lg font-medium bg-white border border-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5"
                                        type="password" placeholder="Confirm password" onChange={checkConfirm} required />
                                    {errorConfirm && <p className="text-red-500 font-medium text-sm">{errorConfirm}</p>}
                                </div>

                                <div className="mt-6 flex items-center">
                                    <input
                                        type="checkbox"
                                        id="termsCheckbox"
                                        className="cursor-pointer mr-2 h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300 rounded bg-white"
                                        required
                                    />

                                    <label htmlFor="termsCheckbox" className="text-xs text-gray-600">
                                        I agree to
                                        <a href="#" className="border-b text-blue-400 border-blue-400 border-dotted mx-1">
                                            Terms of Service
                                        </a>
                                        and its
                                        <a href="#" className="border-b text-blue-400 border-blue-400 border-dotted mx-1">
                                            Privacy Policy
                                        </a>
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="cursor-pointer mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                                >
                                    <svg className="w-6 h-6 -ml-2" fill="none" stroke="currentColor" strokeWidth="2"
                                        strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                                        <circle cx="8.5" cy="7" r="4" />
                                        <path d="M20 8v6M23 11h-6" />
                                    </svg>
                                    <span className="ml-3">
                                        Sign up
                                    </span>
                                </button>
                                {error && <p className="text-red-500 font-medium">{error}</p>}
                            </div>



                            <div className="my-12 border-b text-center">
                                <div
                                    className="leading-none px-2 inline-block text-sm text-gray-600 tracking-wide font-medium bg-green-100 transform translate-y-1/2">
                                    Or sign up using
                                </div>
                            </div>


                            <div className="flex flex-col items-center">
                                <button
                                    className="cursor-pointer w-full max-w-xs font-bold shadow-sm rounded-lg py-3 bg-green-100 text-gray-800 flex items-center justify-center transition-all duration-300 ease-in-out focus:outline-none hover:shadow focus:shadow-sm focus:shadow-outline">
                                    <div className="bg-white p-2 rounded-full">
                                        <svg className="w-4" viewBox="0 0 533.5 544.3">
                                            <path
                                                d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
                                                fill="#4285f4" />
                                            <path
                                                d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
                                                fill="#34a853" />
                                            <path
                                                d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
                                                fill="#fbbc04" />
                                            <path
                                                d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
                                                fill="#ea4335" />
                                        </svg>
                                    </div>
                                    <span className="ml-4">
                                        Sign In with Google
                                    </span>
                                </button>
                            </div>

                            <p className="text-center text-sm leading-6 mt-2">
                                Already have account? <Link to={"/login"} className="cursor-pointer text-blue-500 hover:text-blue-400">Log in</Link>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
