
const api_key="appid=a0d21d890b66555c6547a231b61d6121";
const base_url="https://api.openweathermap.org/data/2.5/weather?";

var valid_city=document.getElementById('valid');
var city=document.getElementById('country');
var getLocation=document.getElementById('getLocation').addEventListener('click',getLocation);

function processData(e){
    e.preventDefault();
    //prevent default action after submitting form
    city_name=city.value;
    //console.log(city_name);
    var api_url=base_url+api_key+ "&q=" + city_name;
    getResults(api_url);
}



function getResults(url){
    //if input is invalid then 404 error ocuurs so,display error message
    //fetch method is used to fetch resource from server
    fetch(url).then(res => res.json()).then(data => {
        if(data.cod == "404"){
            //console.log("Error");
            city.style.border="2px solid red";
            valid_city.innerHTML=`<p style="border:3px solid red;color:red; border-radius:10px;">Please Enter Valid city Name</p>`;
        }else{
            city.style.border="2px solid green";
            showResults(data.main,data.weather[0].description,data.sys.country,data.name);
        }
        
    });
}

//display results in the informaiton container
function showResults(main,clouds,country,city){
    document.querySelector('.city-info').innerHTML=`<span><i class="fa fa-location-dot"></i></span>`+city+", "+country;
    document.querySelector('.temp-num').innerText=Math.round(main.feels_like-273);
    document.querySelector('.humid-num').innerText=main.humidity;
    document.querySelector('.clouds-condition').innerHTML=`<span><i class='fas fa-cloud-moon-rain'></i></span>`+clouds;
    document.getElementById('relative').style.marginLeft="400px";
}

function getLocation(){
    //sends an asynchronous request to browser
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      }
}
function showPosition(position){
    console.log(position);
    alert("Latitude: " + position.coords.latitude +"\n"+"Longitude: " + position.coords.longitude);
}

document.addEventListener('submit',processData);