import './App.css';
import { useState, useEffect  } from 'react'
import { Footer } from './components/Footer';

import { SliderTime } from './components/SliderTime';
import { useSelector } from 'react-redux';
import { MoodImage } from './components/MoodImage';
import { MetricasComponent } from './components/MetricasComponent';
import { useGetData } from './hooks/useGetData';
import { CloudTagsComponent } from './components/CloudTagsComponent';
import { GraficaComponent } from './components/GraficaComponent';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const date = useSelector((state)=>state.date.value);
  const moodData = useGetData(date);

  useEffect(()=>{
    setLoading(true);    
    setLoading(false);
  },[date])

  useEffect(()=>{
    setLoading(true);
    setLoading(false);
  }, [moodData])
  

  if(loading){return(<h1>Cargando</h1>)}
  if(error != null){return(<h1>Error: {error}</h1>)}

  return (


    <div className="App">
      <header className="App-header">

      <h2>Selecciona el día del que quieres ver el analisis:</h2>
      <SliderTime/>

      <h4>Dia Seleccionado:</h4>
      {date}
      
      <MoodImage
      currentDay = {moodData}
      />

      <h3>Temas más comentados del momento</h3>

      <CloudTagsComponent
        currentDay={moodData}
      />

      <h3>Métricas</h3>
      
      <MetricasComponent
        currentDay = {moodData}
      />

      <GraficaComponent/> 

      </header>
    <Footer/>


    </div>

  );
}

export default App;
