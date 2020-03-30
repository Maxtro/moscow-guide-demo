import React, { useRef, useEffect } from 'react'
import style from '../css/Result.module.css'
import Loader from './Loader'
import { TweenMax } from "gsap"
import ResultCard from './ResultCard'

const Result = ({ isLoading, popularPlaces, saveFavorite, textHeader }) => {

    let cardElements = useRef([]);
    let text = useRef()

    useEffect(() => {
        if (!isLoading) TweenMax.to(text.current, .7, { opacity: 1, delay: 0.4 })
        if (popularPlaces.length !== 0 && !isLoading) TweenMax.staggerTo(cardElements.current, 0.5, { y: -20, autoAlpha: 1, delay: .5 }, 0.04)
    }, [isLoading, popularPlaces.length]);

    return <>
        {isLoading ? <Loader /> :
            <div>
                <div className={style.resultHeader} ref={div => text.current = div}><h4>{textHeader}</h4></div>
                <div className={style.result}>
                    {popularPlaces.map((places, index) => {
                        return <div ref={div => cardElements.current[index] = div} className={style.card} key={places.id}>
                            <ResultCard places={places} saveFavorite={saveFavorite} task={ 'SAVE' }/>
                        </div>
                    })}
                </div>
            </div>
        }
    </>
}


export default Result