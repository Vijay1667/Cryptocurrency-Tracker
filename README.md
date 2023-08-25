# Cryptocurrency-Tracker


# Technology Stack:

## Front-end
React.js, Bootstrap
## Back-end: 
Node.js, Express.js, AWS (Lightsail)
## Database: 
Google Firebase
Cryptocurrency Price API: WazirX API.
## Additional:
Apache echarts for Reactjs for graph visualisation

## Start Frontend

```
cd frontend
npm start
```

## Start Backend

```
cd server
npm run devstart
```


# IMPLEMENTATION

1. Login: I have used firebase authentication which uses gmail login, it is secure and google makes sure of it,
2. API: I have used wazirx free API for retriving the data.
3. The backend is hosted on aws lightsail, and we send api call to that ip.

I have used express js as backend and AWS to host the backend, I have made sure that API is not leaked on the frontend side. All requests are made to backend and from the backend to wazirx API

The API call is sent to backend aws and then to express.js and from that it sent to wazirxAPI. The API call is sent for every 15 sec so that data on frontend is updated every 15sec.

The data on the graphs is also updated and visualised for every 15sec using setInterval() method

fronend <-->  AWS (backend) <--> wazirxAPI 





https://github.com/Vijay1667/Cryptocurrency-Tracker/assets/95224492/60edbd1f-5c1d-4f0b-bda1-443125601ab9

