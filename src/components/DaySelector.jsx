import '../App.css';
import { useState, useEffect} from 'react'

import { useDispatch } from 'react-redux';
import { setDate } from '../store/dateSlicer';

export const DaySelector = (days) => {
  
//const [AllDays, setAllDays] = useState();
//const [CurrenDay, setCurrenDay] = useState();
const [isLoading, setIsLoadin] = useState(true);
const [listDays, setListDays] = useState(null);
const [countDays, setCountDays] = useState(null);

const dispatch = useDispatch();

useEffect(()=>{
  const getDays = async()=>{
    try{
      const availableDays = days["days"]
      setCountDays(Object.keys(availableDays).length);
      setListDays(Object.values(availableDays));

      setIsLoadin(false)
    }catch(err){
      console.log(err)
    }
  }
  getDays()
},[days])


// useEffect(()=>{
//   const getCurrentDay = async()=>{
//     console.log("CAMBIADO");
//     console.log(CurrenDay);
    
//   }
//   getCurrentDay()
// },[CurrenDay])




const handleSelection = (selectedDat) => {
  console.log("Guardando: " + selectedDat.date);  
  dispatch(setDate(selectedDat.date));
}

if(days === null || days === undefined){return({isLoading})}
if(listDays == null){return(<>ERROR</>)}


return(
<>

<p style={{fontSize:".7rem"}}>({countDays} días analizados)</p>
<nav aria-label="day-navigation">
  <ul className="pagination">
    {listDays.map((day, i) => <li key={i} className="page-item"><span className="page-link" onClick={() => handleSelection(listDays[i])}>{day.date.split("-")[2]} </span></li>)}
  </ul>
</nav>

{/* <p>{countDays} días disponibles </p> */}
</>

)

}