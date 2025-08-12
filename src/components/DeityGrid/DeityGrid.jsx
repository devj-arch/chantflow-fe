import React, { useState } from 'react';
import DeityCard from '../DeityCard/DeityCard';
import imageMap from '../../data/DeityList.js'
import './DeityGrid.css'
// import { useGetDeitiesQuery } from '../../app/api';

// import shiv from '../../assets/shiv-image.png'
// import lakshmi from '../../assets/lakshmi-image.png'
// import ganpati from '../../assets/ganpati-image.png'
import LoadingScreen from '../LoadingScreen/LoadingScreen';

function DeityGrid({deities, onSelectDeity}) {
  const [visibleCount, setVisibleCount] = useState(4)
  const [showBtn, setShowBtn] = useState('Show More VV')

  const handleShowMore = () => {
    setVisibleCount(prevCount => Math.min(prevCount+4, deities.length))
    console.log('visibleCount: ', visibleCount);
    if(visibleCount >= deities.length-4) {
      setShowBtn('Show Less ^^')
    } else {
      setShowBtn('Show More VV')
    }
    if(showBtn==='Show Less ^^') {
      setVisibleCount(4)
      setShowBtn('Show More VV')
    }
  }

  // const imageMap = {
  //   'shiva.jpg': shiv,
  //   'maaLakshmi.jpg': lakshmi,
  //   'ganesha.jpg': ganpati,
  //   'vishnu.jpg': 'https://i.pinimg.com/1200x/19/89/f1/1989f1301739d704cf5ac12e6991f4f3.jpg',
  //   'mahadevi.jpg': 'https://i.pinimg.com/1200x/31/46/b4/3146b49b86e1c19b023716ed2d22e378.jpg',
  //   'avalokiteshvara.jpg': 'https://i0.wp.com/zenstudiespodcast.com/wp-content/uploads/2018/04/Avalokiteshvara-Square-1400px.jpg?fit=1400%2C1400&ssl=1',
  //   'brahman.jpg': 'https://brahmand.com/newsimages/201429573762ce6cc2609d0.jpg',
  //   'shakti.jpg': 'https://yssofindia.org/wp-content/uploads/picture-of-divine-mother-nature-prakriti-photo-regular-yss-front-600x858.jpg',
  //   'savitr.jpg': 'https://www.harivara.com/wp-content/uploads/2019/05/Gayatri-Mantra-jaap-harivara.jpg'

  // };

  return (
    <div className="deity-grid">
      {deities && deities.slice(0, visibleCount).map((deity) => {
        const imageSrc = imageMap[deity.image] || null;

        return(
          <>
            <DeityCard key={deity._id} name={deity.name} image={imageSrc} onClick={() => onSelectDeity(deity._id)}/>
            <button className='secondary-button show-more' onClick={handleShowMore}>
              {showBtn}
            </button>
          </>
        )
      })}
    </div>
  );
}

export default DeityGrid;
