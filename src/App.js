import React, { Fragment, useCallback, useState } from 'react'
import 'h8k-components'

import { image1, image2, image3, image4 } from './assets/images'
import { Thumbs, Viewer } from './components'

const title = 'Catalog Viewer'

function App() {
  const catalogsList = [
    {
      thumb: image1,
      image: image1
    },
    {
      thumb: image2,
      image: image2
    },
    {
      thumb: image3,
      image: image3
    },
    {
      thumb: image4,
      image: image4
    }
  ]

  const [ catalogs ] = useState([...catalogsList])
  const [ activeIndex, setActiveIndex ] = useState(0)
  const [ slideTimer, setSlideTimer ] = useState(null)
  const [ slideDuration ] = useState(3000)

  const onNext = useCallback(() => {
    setActiveIndex((prev) => {
      let nextIndex = prev + 1;
      if (nextIndex >= catalogs.length) {
        nextIndex = 0;
      }
      return nextIndex;
    });
  }, [catalogs]);

  const onPrev = useCallback(() => {
    setActiveIndex((prev) => {
      if (prev === 0) return catalogs.length - 1;
      return prev - 1;
    });
  }, [catalogs]);

  const onToggleStartSlideShow = useCallback((e) => {
    const isChecked = e.target.checked;
    if (!isChecked) {
      clearInterval(slideTimer);
      setSlideTimer(null);
    } else {
      const timer = setInterval(() => {
        onNext();
      }, slideDuration);
      setSlideTimer(timer);
    }
  }, [slideTimer, slideDuration, onNext]);

  return (
    <Fragment>
      <h8k-navbar header={ title }></h8k-navbar>
      <div className='layout-column justify-content-center mt-75'>
        <div className='layout-row justify-content-center'>
          <div className='card pt-25'>
            <Viewer catalogImage={ catalogs[activeIndex].image } />
            <div className='layout-row justify-content-center align-items-center mt-20'>
            <button 
              className="icon-only outlined"
              data-testid="prev-slide-btn"
              onClick={onPrev}
            >
              <i className="material-icons">arrow_back</i>
            </button>
              <Thumbs 
                items={ catalogs } 
                currentIndex={ activeIndex } 
              />
            <button 
              className="icon-only outlined"
              data-testid="next-slide-btn"
              onClick={onNext}
            >
              <i className="material-icons">arrow_forward</i>
            </button>
            </div>
          </div>
        </div>
        <div className='layout-row justify-content-center mt-25'>
          <input 
            type='checkbox'
            data-testid='toggle-slide-show-button'
            onChange={onToggleStartSlideShow}
          /> 
          <label className='ml-6'>Start Slide Show</label>
        </div>
      </div>
    </Fragment>
  )
}

export default App

