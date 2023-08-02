import React, { useEffect } from "react";
import '../App.css'
import { useParams } from "react-router-dom";
import { useState } from "react";
import Chart from "react-apexcharts";
function EachCrypto(props) {
    const params = useParams();
    console.log(params)
    var [currentprices, setCurrentprices] = useState([]);
    var [dates, setDates] = useState([]);
    var [points, setPoints] = useState([]);
    var [currentdatac,setCurrentdatac]=useState([])
    var [currentdata,setCurrentdata]=useState([])
    async function fetchPrices() {
        //     const req24 = await fetch(`https://api.wazirx.com/sapi/v1/klines?`+new URLSearchParams({
        //     symbol:params.name,
        //     limit:20,
        //     interval:"1h"
        // }))
        //         const resp24 = await req24.json()
        //         console.log(resp24)
        const response = await fetch(`http://localhost:3010/api/eachcrypto/${params.name}/`, { mode: 'cors' });
        const jsonData = await response.json();
        console.log(jsonData)
        
        Object.entries(jsonData).map((doc) => ( (currentdatac.push({x:(doc[1][0]*1000),y:[doc[1][1],doc[1][2],doc[1][3],doc[1][4]]}))))
        setCurrentdata(currentdatac)
    }
    useEffect(() => {
        fetchPrices()
    }, [])
    return (
        <div style={{fontFamily:"Open Sans"}}>
            <div className="text-end">
                Time is displayed in UTC
            </div>
            
                    <div>
                        <Chart
                            options={{
                                chart:{
                                    height:"100vh"
                                },
                                xaxis: {
                                    type: 'datetime'
                                },
                                yaxis: {
                                    scale: false,
                                    splitArea: {
                                        show: true
                                    }
                                },
                                tooltip: {
                                    show: false
                                },

                            }}
                            series={[{

                                name: 'candle',
                                type: 'candlestick',
                                data: currentdata
                            }]}
                            type="candlestick"
                            
                            
                        />
                    </div>


        </div>
    )
}
export default EachCrypto;