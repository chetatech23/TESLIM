 import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router";

export function ForLocation() {
  const [mylocation, setMyLocation] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [geminiresponse, setGeminiResponse] = useState('');

  useEffect(() => {
    if (!mylocation) return;

    setGeminiResponse('Loading...');

    axios
      .post('/api/safety', { address: mylocation })
      .then((response) => {
        setGeminiResponse(response.data.result);
      })
      .catch((err) => {
        console.error(err);
        setGeminiResponse(err.response?.data?.error || err.message);
      });
  }, [mylocation]);

  function mylatlng() {
    setErrorMsg('Locating...');

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const mylat = position.coords.latitude;
        const mylng = position.coords.longitude;

        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${mylat}&lon=${mylng}`)
          .then((response) => response.json())
          .then((data) => {
            setMyLocation(data.display_name);
            setErrorMsg('');
          })
          .catch(() => {
            setErrorMsg('Could not fetch address name.');
          });
      },
      (error) => {
        setErrorMsg(`Error: ${error.message}`);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }

  return (
    <>
      <div className="flex items-center justify-center h-[600px]">
        <div className="bg-white h-[400px] flex flex-col justify-center w-[95%] items-center gap-[20px] rounded-[20px]">
          <p className="w-[300px] text-center text-[18px] font-['poppins']">
            Your current location is - {mylocation}
          </p>
          
          <button
            className="h-[70px] w-[80%] bg-green-500 rounded-[20px]"
            onClick={mylatlng}
          >
            CHECK LOCATION
          </button>
        </div>
      </div>

     <div className="    flex  items-center justify-center mb-[30px]">
      <div className="mt-[10px] whitespace-pre-wrap w-[80%] bg-white flex  items-center justify-center rounded-[10px]">
        <p className="font-['poppins'] text-center w-[80%] mt-[10px] mt-[10px]">{`ABOUT LOCATION - ${geminiresponse}`}</p>
      </div>
     </div>


      <Link to="/">
        <div className="flex items-center justify-center">
          <p className="text-[20px] w-[60%] border-b text-center">Go Back</p>
        </div>
      </Link>
    </>
  );
}
  
