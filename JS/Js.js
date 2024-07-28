// Icon on form
const form = document.querySelector('.weather-search');
const icon1 = document.querySelectorAll('.weather-search i');
const loader = document.querySelector('.message-box');
form.addEventListener('click',()=>{
    icon1.forEach((ele)=>{
        ele.setAttribute('style','visibility:visible;')
    });
});
// Working API
const apiKey = "";  //Enter ApiKey
const apiUrl = "";  //Enter URL 
form.addEventListener('submit',(e)=>{
    e.preventDefault();
    let searchVal = document.querySelector('.weather-search .form-input input');
    let givenVal = searchVal.value;
    searchVal.setAttribute('placeholder',givenVal);
    loader.setAttribute('style','display:block;color: cyan;');
    loader.innerText = 'Just wait few seconds...';
    timerfunction(givenVal);
    searchVal.value = "";
});
async function timerfunction(givenVal){
    const response = await fetch(apiUrl+givenVal+'&appid='+apiKey);
    const data = await response.json();
    const outputreport = document.querySelector('.weather-report');
    if(data.message == "bad query"){
        loader.setAttribute('style','display:block;color: #f0f0f0;font-size:1.4rem;');
        loader.innerText = 'Wrong Input';        
        outputreport.innerHTML = "";
    }
    else if(data.message == "Nothing to geocode"){
        loader.setAttribute('style','display:block;color: #f0f0f0;font-size:1.4rem;');
        loader.innerText = 'Please enter city name';        
        outputreport.innerHTML = "";
    }
    else if(data.message == "city not found"){
        loader.setAttribute('style','display:block;color: #f0f0f0;font-size:1.4rem;');
        loader.innerText = 'Please check city name';        
        outputreport.innerHTML = "";
    }
    else{
        let weatherimage = document.createElement('img');
        let weatherreport = document.createElement('div'); 
        outputreport.innerHTML = ` <img src="" alt="">
                <p>${data.main.temp}<span>&deg;C</span></p>
                <h3>${data.name +','+ data.sys.country}</h3>
                <div class="extra-report">
                    <div class="humidity-box">
                        <img src="Images/2.png" alt=""/>
                        <div class="humidity-report">
                            <p>${data.main.humidity+'%'}</p>
                            <h4>Humidity</h4>
                        </div>
                    </div>
                    <div class="wind-box">
                        <img src="Images/3.png" alt=""/>
                        <div class="wind-report">
                            <p>${(data.wind.speed*(18/5)).toFixed(2)+' Km/h'}</p>
                            <h4>Wind Speed</h4>
                        </div>
                    </div>
                </div>`;
        const image = document.querySelector('.weather-report img');
        if(data.weather[0].main == 'Clouds'){
            image.src ="Images/6.png";
        }
        else if(data.weather[0].main == 'Sunny' ||data.weather[0].main == 'Clear' ){
            image.src ="Images/4.png";
        }
        else if(data.weather[0].main == 'Rain'){
            image.src ="Images/1.png";
        }
        else if(data.weather[0].main == 'Haze'){
            image.src ="Images/5.png";
        }
        else{
            image.src ="Images/2.png";
        }
        loader.setAttribute('style','display:block;color: #f0f0f0;font-size:1.4rem;');
        loader.innerText = `Information about ${data.name} city`;
    }    
};


