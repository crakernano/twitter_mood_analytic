
import noData from '../noData.png'
export const MoodImage = ({currentDay} ) => {
   console.log("IMAGEN " + currentDay)
    
   let img = '';
    img=noData
    
    if(currentDay == null ){return <img className='moodImg' src={img} alt="Selecciona un día"/>} 

    if (currentDay.mood != null){
        const current_image = parseInt(currentDay.mood)  
    
        switch (current_image) {
        
            case -1:
                img='https://cdn.iconscout.com/icon/free/png-256/sad-2689419-2232260.png'
            break;

            case 0:
                img='https://em-content.zobj.net/source/noto-emoji-animations/344/neutral-face_1f610.gif'
            break;

            case 1:
                img='https://cdn.shopify.com/s/files/1/1061/1924/products/Emoji_Icon_-_Happy_large.png?v=1571606093'
            break;
            
            default:
                break;
        }
    }
    return(
        <>
            <img className='moodImg' src={img} alt={currentDay.mood}/>
        </>
    );
    
    }