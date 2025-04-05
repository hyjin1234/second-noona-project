
import './App.css';
import { useEffect ,useState} from 'react';
import WeatherBox from './component/WeatherBox';
import WeatherButton from './component/WeatherButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import ClipLoader from "react-spinners/ClipLoader";

const cities=['paris','sydney','tokyo','seoul'];
//1. 앱이 실행되자마자 현재위치기반의 날씨 정보가 보인다.
//2. 날씨정보에는 도시,섭씨 화씨 날씨상태
//3. 5개의 버튼이 있다 (1개는 현재위치, 4개는 다른도시)
//4. 도시버튼을 클릭할때 마다 도시별 날씨가 나온다.
//5. 현재윛 버튼을 누르면 다시 현재위치 기반의 날씨가 나온다.
//6. 데이터를 들고오는 동안 로딩 스피너가 돈다.
function App() {


  const [weather,setWeather] = useState(null);
  const [city,setCity]=useState('');
  const [loading,setLoading]=useState(false);
  const [apiError, setAPIError] = useState("");
  
  

  const getWeatherByCurrentLocation = async(lat,lon)=>{
    try{
      let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=cc302ecfb6412facc9949e15bc5af1c2&units=metric`
      setLoading(true)
      let response = await fetch(url) 
      let data = await response.json();
      setWeather(data);
      setLoading(false)
    }catch (err) {
      setAPIError(err.message);
      setLoading(false);
    }
    
  };

  const getCurrentlocation=()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      let lat = position.coords.latitude;
      let lon = position.coords.longitude;
      getWeatherByCurrentLocation(lat,lon)
      
    });
  };

  const getWeatherByCity=async()=>{
    try{
      let url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=cc302ecfb6412facc9949e15bc5af1c2&units=metric`
      setLoading(true)
      let response = await fetch(url);
      let data = await response.json();
      setWeather(data);
      setLoading(false)
    } catch (err) {
      console.log(err);
      setAPIError(err.message);
      setLoading(false);
    }
    
  }

  useEffect(()=>{
    if(city==''){
      getCurrentlocation()
    }else{
      getWeatherByCity();
    }
    
  },[city])

  const handleCityChange = (city) => {
    if (city === "current") {
      setCity('');
    } else {
      setCity(city);
    }
  };

  

  return (
    <div>
      {loading?<div className="container"><ClipLoader
        color="#f88c6b"
        loading={loading}
        size={150}
      /></div>:<div className="container">
      
      <WeatherBox weather={weather}/>
      <WeatherButton
              cities={cities}
              handleCityChange={handleCityChange}
              selectedCity={city}
            />   
    </div>}
      
    </div>
  );
}

export default App;
