import analitic from '../analytic.json'

const month_name = [
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

export const useGetData = (date) =>{
    if (date == null) return
    const fecha = date.split("-");
    console.log("Recuperar datos de " + date);

    const year = fecha[0];
    const month = month_name[fecha[1] - 1].label ;
    const day = fecha[2];

    //console.log(analitic[year][month][day])

    return analitic[year][month][day]
    
}

export const useGetAllData = (year = 2023) =>{
  return analitic[year];
}