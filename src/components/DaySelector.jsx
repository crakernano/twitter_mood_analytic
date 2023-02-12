import { useState, useEffect} from 'react'
import moodData from '../mood.csv'

export const DaySelector = () => {

    const [currentDay, setCurrenDay] = useState([]);
    const [csvArray, setCsvArray] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
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


return(
<nav aria-label="Page navigation example">
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
</nav>)

}