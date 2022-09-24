//for better performance
setTimeout(() =>{
    document.querySelector("body").style.opacity = '1';
},300);

/* Global Variables */
const generate = document.querySelector("#generate");
//const zip = document.querySelector("#zip");
//const feelings = document.querySelectorAll("#feelings");
const feeling = document.querySelector("#content");
const temp = document.querySelector("#temp");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

// Base URL
const baseURL = "https://api.openweathermap.org/data/2.5/weather?zip=";

// Personal API Key for OpenWeatherMap API
const apiKey = "&appid=775fb489d52eb45ff49f87e72c53beb1&units=imperial";

// Event listener to add function to existing HTML DOM element
generate.addEventListener("click", (event)=> {
    event.preventDefault();
    const zip = document.getElementById("zip").value;
    const fURL = `${baseURL}${zip}${apiKey}`;
    fetchData(fURL)
    .then((data)=>{
        getInfo(data)
        .then((info)=>{
            postData("/add", info)
            .then(retrieveData())
        })
    })
});

//GET Web API Data
const fetchData = async (url) =>{
    //get value after click on the button
    const feelings = document.getElementById("feelings").value;
    const zip = document.querySelector("#zip");
    try {
        const result = await fetch(url);
        const data = await result.json();
        if(data.cod == 200){
            return data;
        }else{
            console.log(data.message);
        }   
    } catch (error) {
        console.log(error);
    }
}

const getInfo = async (data)=>{
    try{
        if(data.message){
            const info = data.message;
            return info;
        }else{
            const info = {
                newDate,
                feelings : feelings.value,
                temp: data.main.temp,
            };
            return info;
        }
        
    }catch(error){
        console.error(error);
    }

}

// Function to POST data
const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials:"same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data)
    });
    try {
        const result = await response.json();
        return result;
    } catch (error) {
        console.error(error);
    }
}

//Function to GET Project Data and updating UI
const retrieveData = async () =>{
    const request = await fetch('/all');
    try {
        // Transform into JSON
        const allData = await request.json()
        console.log(allData)
        // Write updated data to DOM elements
        document.getElementById('temp').innerHTML = Math.round(allData.temp)+ ' degrees';
        document.getElementById('content').innerHTML = allData.feelings;
        document.getElementById("date").innerHTML =allData.newDate;
    }
    catch(error) {
        console.log("\"error\"", error);
        // appropriately handle the error
    }
}