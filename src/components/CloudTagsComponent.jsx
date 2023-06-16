import { TagCloud } from 'react-tagcloud'
import Swal from 'sweetalert2'


export const CloudTagsComponent = ({currentDay}) => {

  if(currentDay == null){return ("Selecciona un día")}
  if(currentDay.tags == null){return ("No hay datos disponibles")}

  console.log(currentDay.tags)
  let tags = []
  
  if(currentDay.tags != null){
    const tags_list = Object.keys(currentDay.tags);
    tags = Object.keys(currentDay.tags);
    tags_list.map((tag, i) =>{
      const newTag = {value: tag, count: currentDay.tags[tag]}
      tags.push(newTag);
    })
  }

return(
    <>    
    <div className="cloud-container">
    
        <TagCloud
            minSize={12}
            maxSize={35}
            tags={tags}
            className="dream-cloud"
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