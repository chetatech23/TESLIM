import { useState , useEffect } from "react"
import axios from "axios";
import { Link } from "react-router";
  export function ForLocation () {
    const [ location , SetLocation ] = useState ('');

    const [lat ,  setLat ] = useState(null);

    const [lng ,  setLng ] = useState(null);

    const [mylocation , setMyLocation] = useState('');

    const [errorMsg, setErrorMsg] = useState('');

    const [geminiresponse , setGeminiResponse] = useState('');

   useEffect(() => {
    if (navigator.geolocation) {
      SetLocation("Yes, you can get latitude and longitude! 🎉");

       console.log(location);
    } 
    
    else {
     SetLocation ("Sorry, you can't. Geolocation is not supported.");
       
     console.log(location);
     
    }

    if (!mylocation) return;


    axios.post('/api/safety',{ address: mylocation }).then((response) => {
      console.log(response.data.result);
      setGeminiResponse(response.data.result);
    })
  }, [mylocation]); // Empty brackets [] mean "run only once on start"

   function mylatlng() {
    
    
    

    setErrorMsg("Locating...");

    navigator.geolocation.getCurrentPosition(
      // 1. Success Callback
      (position) => {
        const mylat = position.coords.latitude;
        const mylng = position.coords.longitude;

        console.log(mylng, mylat);
        setLat(mylat);
        setLng(mylng);

        // Fetch address safely down here, outside of the GPS wrapper
        fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${mylat}&lon=${mylng}`)
          .then((response) => response.json())
          .then((data) => {
            console.log(data.display_name);
            setMyLocation(data.display_name);
            setErrorMsg(""); // Clear any errors on success
          })
          .catch((fetchError) => {
            console.error("Fetch Error:", fetchError);
            setErrorMsg("Could not fetch address name.");
          });
      },

      // 2. Error Callback (Belongs here, as the SECOND argument of getCurrentPosition)
      (error) => {
        console.error("Geolocation Error:", error.message);
        setErrorMsg(`Error: ${error.message}`);
      },

      // 3. Options Object (Belongs here, as the THIRD argument of getCurrentPosition)
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
    );
  }
   

   return (
    <>
    <div className="flex items-center justify-center  h-[600px]">
    <div className="bg-white h-[400px] flex flex-col justify-center w-[95%] items-center gap-[20px] rounded-[20px]">
      <p className="w-[300px] text-center text-[18px] font-['poppins']">Your current location is - {mylocation}</p>
      <button className="h-[70px] w-[80%] bg-green-500 rounded-[20px]" onClick={mylatlng}>CHECK LOCATION</button>
    </div>

    </div>

    
    <div className="mt-[10px]">
      <p>{`ABOUT LOCATION - ${geminiresponse}`}</p>
    </div>

     



    
     <Link to='/'>
    <div className="flex items-center justify-center ">
       <p className="text-[20px]  w-[60%] border-b text-center">Go Back</p>
    </div>
    </Link>
    </>
   )
 }