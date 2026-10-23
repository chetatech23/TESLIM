import { TheThingsiForget  } from './componet/ThingsiForget'
import {  ForForLoop } from './Pages/ForLoop'
import { ForInstallReact } from './Pages/InstallReact'
import { ForReactRouter } from './Pages/ReactRouter'
import { Routes ,Route} from 'react-router'
import { ForLocation } from './Pages/Location'
import './index.css'


function App() {
  return(
    <>
      
     
     <Routes>
      <Route path='checklocation' element={<ForLocation />}>
        
        </Route>
      <Route path='/' element={ <TheThingsiForget /> }></Route>
     
      <Route path='forloop' element={ <ForForLoop/>}></Route>

      <Route path='forinstallreact' element={ <ForInstallReact /> }></Route>

       <Route path='forreactrouter' element={ <ForReactRouter /> }></Route>
     </Routes>
     </>
     

    
  )

}

export default App
