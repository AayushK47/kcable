import React from 'react';

function LoginPage(props) {
    console.log(props);
    return (
        <div className="bg-overlay h-screen pt-40">
            <div className="bg-white mx-10 md:mx-28 lg:mx-96 lg:w-1/4 py-7 rounded-md px-5">
                <h1 className="text-3xl font-light mb-3">Login</h1>
                <div className="my-2">
                    <label htmlFor="">User Name</label>
                    <input type="text" className="block border mt-2 p-1 w-full" placeholder="User Name"/>
                </div>
                <div className="my-2">
                    <label htmlFor="">Password</label>
                    <input type="password" className="block border mt-2 p-1 w-full" placeholder="Password"/>
                </div>
                <button className="rounded-md mt-2 py-2 px-2 text-white bg-blue-500">Login</button>
            </div>
        </div>
    )
}

export default LoginPage;