import React, { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.css'
import * as echarts from 'echarts';
import Chart from "react-apexcharts";
import '../App.css'
import { useNavigate } from "react-router-dom";
import { getFirestore } from "firebase/firestore"
import { Watch } from 'react-loader-spinner';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from "firebase/auth";

function Home() {
    var [cryptos, setCryptos] = useState({})
    var [status, setStatus] = useState("offline")
    var [initial24, setInitial24] = useState([]);
    var [initialcp24, setInitialcp24] = useState([]);
    var [showloader, setShowloader] = useState(false)
    var [isDisabled, setIsDisabled] = useState(false);
    var [current_email, setCurrent_email] = useState("");
    const firebaseConfig = {
        apiKey: "AIzaSyDrG_7Slhi1UDkiQVIKtW0sV6s429kq5rc",
        authDomain: "fir-authentication-bf2ff.firebaseapp.com",
        projectId: "fir-authentication-bf2ff",
        storageBucket: "fir-authentication-bf2ff.appspot.com",
        messagingSenderId: "227042239084",
        appId: "1:227042239084:web:4188753625d06741bfee49"
    };
    var [signupemail, setSignupemail] = useState("");
    var [signuppassword, setSignuppassword] = useState("");
    var [signinemail, setSigninemail] = useState("");
    var [signinpassword, setSigninpassword] = useState("");
    var [signuptext, setSignuptext] = useState("");
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);


    const auth = getAuth(app);
    const provider = new GoogleAuthProvider();
    async function starttrack() {

        if (document.cookie.indexOf("FAuthCookie") != -1) {
            console.log("cookie found")
            // console.log(document.cookie.indexOf("FAuthCookie"))
            // console.log((document.cookie.split("FAuthCookie=")[1]))
            var obj = JSON.parse((document.cookie.split("FAuthCookie=")[1]))
            console.log(obj)
            setCurrent_email(obj.email)
            setIsDisabled(true);
        }
        else {
            console.log("NO cookie found")
            setCurrent_email("")
            setIsDisabled(false);

        }

        const response = await fetch("http://localhost:3010/api/home/", { mode: 'cors' });
        const jsonData = await response.json();
        console.log(jsonData)
        setInitial24(Object.entries(jsonData).map((doc) => ({ ...doc })))
        setInitialcp24(Object.entries(jsonData).map((doc) => ({ ...doc })))
    }
    useEffect(() => {
        starttrack()
    }, [])
    const navigate = useNavigate();


    // async function fetchCompanies() {
    //     try {
    //         const response = await fetch("http://localhost:3010/api/home/", { mode: 'cors' });
    //         if (!response.ok) {
    //             throw new Error("Network response was not ok");
    //         }
    //         const jsonData = await response.json();
    //         console.log(jsonData)
    //     } catch (error) {
    //         console.error("Error fetching data:", error);
    //     }
    // }
    // console.log(typeof(initial24))
    function searchcrypto(event) {
        console.log(event.target.value)
        setShowloader(true)
        console.log(event.target.value)
        if (event.target.value == "") {
            setInitial24(initialcp24)
        }
        else {
            setInitial24(initialcp24.filter((item) => { if (item[1].symbol.toLowerCase().includes(event.target.value.toLowerCase())) { return item; } }))
        }
        setShowloader(false)
    }
    const googlesignin = async () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                // The signed-in user info.
                const user = result.user;
                document.cookie = "FAuthCookie=" + JSON.stringify(user) + ";expires=" + new Date(user.stsTokenManager.expirationTime);
                console.log(user)
                console.log(token)
                setCurrent_email(user.email)
                setIsDisabled(true);
                // IdP data available using getAdditionalUserInfo(result)
                // ...
            }).catch((error) => {
                // Handle Errors here.
                const errorCode = error.code;
                const errorMessage = error.message;
                // The email of the user's account used.
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = GoogleAuthProvider.credentialFromError(error);
                // ...
            });
    }
    const logout = async () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            console.log("logout successful")
            document.cookie = "FAuthCookie=; expires=" + new Date(0);
            setIsDisabled(false);
        }).catch((error) => {
            // An error happened.
            alert("logout failed, please try again")
        });
    }
    return (
        <div style={{ fontFamily: "Open Sans" }}>
            <div className="container-fluid bg-dark text-light text-end p-2">
                {!isDisabled ? <div><button className="btn btn-outline-light" onClick={googlesignin}>Login with google</button> </div> : <div>
                    {current_email} <button className="btn btn-outline-light" onClick={logout}>Logout</button> </div>}

            </div>
            <div className="container">
                {console.log(typeof (initial24))}


                <div className="d-flex flex-row">
                    <input type="text" onChange={searchcrypto} className="container px-4 m-2 py-3 rounded-pill " placeholder="Enter the crypto name and hit enter" />
                    <Watch
                        height="40"
                        width="50"
                        radius="40"
                        color="#4fa94d"
                        ariaLabel="watch-loading"
                        wrapperStyle={{}}
                        wrapperClassName=""
                        visible={showloader}
                    />
                </div>

                {initial24.map((ele, index) => {
                    { console.log(ele) }
                    if (ele[0] > 100) {
                        return (<div></div>)
                    }
                    return (
                        <div onClick={() => { navigate(`/${ele[1].symbol}`) }} key={ele[0]} className="container border rounded m-2 p-2">
                            <div> <h3> {ele[1].symbol} <span className="float-end text-end"> <h4>{ele[1].baseAsset}</h4></span></h3>
                                <div className="row">
                                    <div className="col">
                                        <div>Open price {ele[1].openPrice}</div>
                                        <div>Low price {ele[1].lowPrice}</div>
                                    </div>
                                    <div className="col">
                                        <div>
                                            {(Math.round(((ele[1].openPrice-ele[1].lastPrice)*100/ele[1].openPrice)*100)/100)<0 ? <div className="text-danger"><b>{ Math.round(((ele[1].openPrice-ele[1].lastPrice)*100/ele[1].openPrice)*100)/100}%</b> </div> : <div className="text-success"><b> {Math.round(((ele[1].openPrice-ele[1].lastPrice)*100/ele[1].openPrice)*100)/100}%</b> </div>}
                                        </div>
                                    </div>
                                    <div className="col">
                                        <div>High price {ele[1].highPrice}</div>
                                        <div>Current Price {ele[1].lastPrice}</div>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>)
                })}
            </div>


        </div>
    )
}

export default Home