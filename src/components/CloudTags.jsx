import { useState, useEffect } from "react";
import { TagCloud } from 'react-tagcloud'
import top from '../top.csv'
import Swal from 'sweetalert2'


export const CloudTags = () => {
const [topTags, setTopTags] = useState([]);
const [loading, setLoading] = useState(true);
const [error, setError] = useState(null);

useEffect(() => {
    const getData = async () => {
      const delim=',';
      var totalTags = [];
      try {
        await fetch(top)
        .then(r => r.text())
        .then(text => {
          //console.log('text decoded:', text);
          const headers = text.slice(0,text.indexOf('\n')).split(delim);
          const rows = text.slice(text.indexOf('\n')+1).split('\n');

          const newArray = rows.map( row => {
            const values = row.split(delim);
            const newElement = {value: [values[0]], count: values[1]}
            totalTags.push(newElement);
            return newElement
 
        })
        setTopTags(newArray);
        });
        setError(null);
      } catch(err) {
        setError(err.message);      
        setTopTags(null);
      } finally {
        setLoading(false);
      }  
    }
    getData()
  }, []);

  //console.log(topTags);

return(
    <>    
    <div className="cloud-container">
    
        <TagCloud
            minSize={12}
            maxSize={35}
            tags={topTags}
            className="dream-cloud"
            //onClick={tag => alert(`${tag.value} se comentó ${tag.count} veces`)}
            onClick={tag => Swal.fire({
              title: `${tag.value}`,
              text:  `se comentó ${tag.count} veces`,
              icon: 'info',
              confirmButtonText: 'ok'
            })}
        />
      
  </div>
  </>
)
}