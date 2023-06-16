export const MetricasComponent = ({currentDay}) => {

    if(currentDay == null){
        return("Seleccione un día")
    }

    //console.log("Metricas:" + currentDay.date)
    
    let positiveTwits, negativeTwits, totalTwits = '';
    if(currentDay.positive == null){positiveTwits = "Sin datos disponibles"}else{positiveTwits = Math.round(currentDay.positive) + '%'}
    if(currentDay.negative == null){negativeTwits = "Sin datos disponibles"}else{negativeTwits = Math.round(currentDay.negative) + '%'}
    if(currentDay.total == null){totalTwits = "Sin datos disponibles"}else{totalTwits = currentDay.total}
return(
    <>
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
    </>
)

}