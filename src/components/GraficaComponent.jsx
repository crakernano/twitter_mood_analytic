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
import { useGetAllData } from '../hooks/useGetData';


export const GraficaComponent = ( ) => {
    const availability = false

    ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );

    // ToDo: Permitir navegar entre periodos temporales
    const mood_data = useGetAllData();
    var labels = [];
    var datos = [];

    console.log(mood_data["Abril"]);

    // Obtener los meses

    
    Object.keys(mood_data).map((mes, i) =>{
      
      //console.log(mes)
      Object.keys(mood_data[mes]).map((dia,i) =>{ 
        datos.push(mood_data[mes][dia].mood)        
        const label = dia + "-" + mes
        labels.push(label);
      })      
    })
    
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
            break;
          case 1:
            label = ' Positivo'
            break;
          default:
            break;
        }
        return label;
      }

const options = {
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

return(
<>
<div className="container text-center" id='char-container'>
        <Line options={options} data={data} />
      </div>
</>
);
    
    }