  import { Link } from "react-router";
  
  
  export function ForForLoop() {
  return (
    <>
    <div className=" flex flex-col h-[700px] justify-center items-center ">
      <p className="whitespace-pre-wrap font-mono bg-white h-[400px] w-[97%] text-[20px] rounded-[10px]">
        {`for loop is written like this -  const fruits = ["apple", "banana", "cherry"];

for (let i = 0; i < fruits.length; i++) {
    console.log(\`Index \${i}: \${fruits[i]}\`);
}
// Output: 
// Index 0: apple
// Index 1: banana
// Index 2: cherry`}
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