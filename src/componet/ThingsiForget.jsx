  import { Link } from "react-router"; 
  

 export function TheThingsiForget () {
    return (
      <>
   <Link to='/checklocation'>
        <p className="font-['poppins'] ml-[20px] mt-[10px] bg-white w-[200px]  ">
          Check Location
        </p>
       </Link> 

      
     <p className="mt-[90px] text-center text-[30px] font-['poppins']  mb-[50px] border-b w-[80%] mx-auto ">Things I Forget</p>

    <div className=" flex flex-col justify-center items-center gap-[20px]">
      <Link className="w-[100%] flex justify-center items-center" to='/forloop'>
      <div className="h-[300px] bg-black w-[80%] rounded-[20px] flex justify-center items-center "
      ><p className="text-white font-['poppins'] text-[20px]">FOR LOOP</p>
      </div>
      </Link>
      
      <Link className="w-[100%] flex justify-center items-center" to='/forinstallreact'>
       <div className="h-[300px] bg-black w-[80%] rounded-[20px] flex justify-center items-center ">
        <p className="text-white font-['poppins'] text-[20px]">HOW TO INSTALL REACT</p>
        </div>
        </Link>


        <Link className="w-[100%] flex justify-center items-center"  to='/forreactrouter'>
         <div className="h-[300px] bg-black w-[80%] rounded-[20px] flex justify-center items-center ">
        <p className="text-white font-['poppins'] text-[20px]"> How do i install router in react</p>
        </div>
       </Link>

    </div>
   
   
    </>
    );
  }