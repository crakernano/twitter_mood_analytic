import './App.css';
import moodData from './mood.csv'
import noData from './noData.png'
import { useState, useEffect  } from 'react'
import { CloudTags } from './components/CloudTags';
import { Footer } from './components/Footer';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

var labels = [];
var datos = [];




function getLabelForValue(val){

  var label = ''
  switch (val) {
    case -1:
      label = '😢'
      break;
    case 0:
      label = '😐'
      break;
    case 1: 
    label = '🙂'
      break;
    default:
      label = ''
      break;
  }
  return label

}

function getTextLabelForValue(val){
  let label = '';
  switch (val) {
    case -1:
      label = '  Negativo';
      break;
    case 0:
      label = ' Neutral';
    case 1:
      label = ' Positivo'
  
    default:
      break;
  }
  return label;
}

const footer = (tooltipItems) => {
  return getLabelForValue(tooltipItems[0].parsed.y)
};

export const options = {
  responsive: true,
  scales:{
    y:{
      ticks:{
        callback: function(val, index){return getLabelForValue(val)}
      },
      
    },
    x:{
      ticks:{
      color:'#FFFFFF',
      size: 16,
    },
    }
  },
  plugins: {
    legend: {
      position: 'top',
      
      labels:{
        family: 'Jua',
        size: 14,
        color:'#FFFFFF',
      }
    },
    tooltip:{
      titleColor: '#FFFFFF',
      titleAlign: 'center',
      titleFont: {size: 16},     
      titleMarginBottom: 6,
      bodyAlign: 'center', 
      bodyFont: {size: 30},
      footerFont: {size: 10},   
      footerAlign: 'center',   
      footerMarginTop: 6,
      displayColors: false,
      callbacks: {
        title: function(){return 'Sentimiento'},
        label: function(context) {return getLabelForValue(context.parsed.y)},
        labelTextColor: function() {return '#FFFFFF';},
        footer: function(tooltipItems){return getTextLabelForValue(tooltipItems[0].parsed.y)}
      } 
      
    },
    title: {
      display: true,
      text: 'Grafica de las emociones mayoritarias de cada día',
      font: {
        size: 25,
        family: 'Jua',
      }, 

      color: '#FFFFFF',

    },
  },
};

const App = () => {
  const [csvArray, setCsvArray] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentDay, setCurrenDay] = useState([]);
  
  useEffect(() => {
    const getData = async () => {
      const delim=',';
      try {
        await fetch(moodData)
        .then(r => r.text())
        .then(text => {
          console.log('text decoded:', text);
          const headers = text.slice(0,text.indexOf('\n')).split(delim);
          const rows = text.slice(text.indexOf('\n')+1).split('\n');

          const newArray = rows.map( row => {
            const values = row.split(delim);
            const eachObject = headers.reduce((obj, header, i) => {
                obj[header.trim()] = values[i];
                return obj;
            }, {})
            return eachObject;
        })
          setCsvArray(newArray);
        });
        setError(null);
      } catch(err) {
        setError(err.message);      
        setCsvArray(null);
      } finally {
        setLoading(false);
      }  
    }
    getData()
  }, [])

  csvArray.map((item, i) => (
    labels.push(item.date)    
    ))

    csvArray.map((item, i) => (
      datos.push(item.mood)    
      ))

  const data = {
    labels,
    datasets: [
      {
        label: 'Sentimiento',
        data: datos,
        borderColor: '#4535EA',
        backgroundColor: '#4535EA',
        pointRadius: 6,
        
      },
    ],
  };

  if(loading){return(<h1>Cargando</h1>)}
  if(error != null){return(<h1>Error: {error}</h1>)}
  console.log(csvArray[0]);
  console.log("Dia actual");
  console.log(currentDay);
  let img = '';
  let positiveTwits, negativeTwits, totalTwits = '';
  if(currentDay.mood == null){img=noData}
  if(currentDay.mood == -1){img='https://cdn.iconscout.com/icon/free/png-256/sad-2689419-2232260.png'}
  if(currentDay.mood == 0){img='https://em-content.zobj.net/source/noto-emoji-animations/344/neutral-face_1f610.gif'}
  if(currentDay.mood == 1){img='https://cdn.shopify.com/s/files/1/1061/1924/products/Emoji_Icon_-_Happy_large.png?v=1571606093'}
  if(currentDay.positive == null){positiveTwits = "Selecciona un día"}else{positiveTwits = Math.round(currentDay.positive) + '%'}
  if(currentDay.negative == null){negativeTwits = "Selecciona un día"}else{negativeTwits = Math.round(currentDay.negative) + '%'}
  if(currentDay.total == null){totalTwits = "Selecciona un día"}else{totalTwits = currentDay.total}
  return (
    <div className="App">
      <header className="App-header">
      <h2>Selecciona el día del que quieres ver el analisis:</h2>
      <nav aria-label="day-navigation">
        <ul className="pagination">
            <li className="page-item">
            <a className="page-link" href="#" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
            </li>
            {
                csvArray.map((item, i) => (
                <li key={i} className="page-item"><a className="page-link" onClick={() => setCurrenDay(csvArray[i])}>{item.date}</a></li>
                ))
            }
            <li className="page-item">
            <a className="page-link" href="#" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
            </li>
        </ul>
        </nav>
       
      <p>Dia Seleccionado:</p>
      {currentDay.date}

      <img className='moodImg' src={img} alt={currentDay.mood}/>
      <h3>Temas más comentados del momento</h3>
      <CloudTags/>

      <h3>Métricas</h3>
      <div className="container text-center">
        <div className="row">
        <div className="w-100">Twits totales analizado</div>
        <div className="w-100"><span className='counter-field'>{totalTwits}</span></div>
        
          <div className="col-6">Tweets Positivos</div>
          <div className="col-6">Tweets Negativos</div>

          <div className="w-100"></div>          
          <div className="col-6"><span className='counter-field'>{positiveTwits}</span></div>
          <div className="col-6"><span className='counter-field'>{negativeTwits}</span></div>
        </div>
      </div>
      <div className="container text-center" id='char-container'>
        <Line options={options} data={data} />
      </div>
      </header>
      <Footer/>


    </div>
  );
}



export default App;
