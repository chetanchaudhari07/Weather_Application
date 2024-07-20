async function getWeather(){
    const city = document.getElementById("nag").value;
   
    const url = `http://localhost:4508/weather?city=${city}`;
    try {
        const response = await fetch(url);
        const data = await response.json();

        if(response.ok){
            const weatherData = data.days[0];
            document.getElementById("temperature").innerText = weatherData.temp + "F";
            document.getElementById("weather").innerText = `Max: ${weatherData.tempmax} °F, Min: ${weatherData.tempmin} °F`;

        }else{
            document.getElementById('temperature').innerText = 'N/A';
            document.getElementById('weather').innerText = 'N/A';
            console.error('Error:', data.message);
        }

    } catch (error) {

        document.getElementById('temperature').innerText = 'N/A';
        document.getElementById('weather').innerText = 'N/A';
        console.error('Error:', error);
    }
}

window.onload = getWeather;