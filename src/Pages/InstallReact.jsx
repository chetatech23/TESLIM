   import { Link } from "react-router";
 
 
 export function ForInstallReact () {
   return(
     <> 
    <div className=" flex flex-col h-[700px] justify-center items-center ">
      <p className="whitespace-pre-wrap font-mono bg-white h-[400px] w-[97%] text-[20px] rounded-[10px] flex flex-col justify-center items-center text-center">
        To install react npm create vite@latest my-react-app -- --template react
      </p>
    </div>



     <Link to='/'>
    <div className="flex items-center justify-center ">
       <p className="text-[20px]  w-[60%] border-b text-center">Go Back</p>
    </div>
    </Link>
    </>

   );
 }