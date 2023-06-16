
import { useEffect, useState } from 'react'
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import analitic from '../analytic.json'
import { DaySelector } from './DaySelector';

const month = [
  {"label": "Enero", "value" : 1},
  {"label": "Febrero", "value" : 2},
  {"label": "Marzo", "value" : 3},
  {"label": "Abril", "value" : 4},
  {"label": "Mayo", "value" : 5},
  {"label": "Junio", "value" : 6},
  {"label": "Julio", "value" : 7},
  {"label": "Agosto", "value" : 8},
  {"label": "Septiembre", "value" : 9},
  {"label": "Octubre", "value" : 10},
  {"label": "Noviembre", "value" : 11},
  {"label": "Diciembre", "value" : 12},
  
]
function valuetext(value) {
  return `${value}°C`;
}

function valueLabelFormat(value) {
  return month.findIndex((month) => month.value === value) + 1;
}





export const SliderTime = () => {
  const [currentMonth, setCurrenMonth] = useState(["Enero"]);
  
  const [error, setError] = useState(null);
  const [data, setData]= useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        //const data = JSON.parse(analitic);
        //console.log(analitic[2023][currentMonth])
        setData(analitic[2023][currentMonth])
        setError(null);
      } catch(err) {
        setError(err);
        console.log(error);
      } finally {
        setError(null);
      }  
    }
    getData()
  }, [currentMonth])


  useEffect(()=>{
    const getDays = async()=>{
      try{
        //console.log(data)
      }catch(err){
        setError(err)
      }
    }
    getDays()
  },[data])

  const handleOnChange = (e) =>{
    //console.log(e.target.value);
    //console.log(month[e.target.value - 1].label);
    setCurrenMonth(month[e.target.value - 1].label)
  }

  return (
    
        <Box sx={{ width: 900 }}>
        <Slider
          aria-label="Restricted values"
          defaultValue={1}
          valueLabelFormat={valueLabelFormat}
          getAriaValueText={valuetext}
          step={null}
          max={month.length}          
          marks={month}
          onChange={handleOnChange}
          />
          <p><span aria-hidden="true">&laquo; 2023 &raquo;</span></p>
          {currentMonth}
        
        {
          data 
            ?  <DaySelector days={data}/>
            : <p>No hay datos</p>

        }

      </Box>
    
    )
}