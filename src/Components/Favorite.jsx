import React, { useRef, useEffect } from 'react'
import style from './../css/Favorite.module.css'
import styleResult from '../css/Result.module.css'
import { TweenMax } from "gsap"
import { Redirect } from 'react-router-dom'
import Result from './Result'
import ResultCard from './ResultCard'

const Favorite = (props) => {

    let favotiteElements = useRef([]);

    useEffect(() => {
        if (!props.isRedirect && props.favoritePlace.length !== 0) TweenMax.staggerTo(favotiteElements.current, 0.6, { y: -20, autoAlpha: 1 }, 0.05)
    }, [props.favoritePlace.length, props.isRedirect]);

    if (props.isRedirect) return <Redirect to={'/'} />

    return <div>
        <div className={style.favoriteHeader}><h4>ИЗБРАННОЕ</h4></div>
        <div className={style.favorite}>
            {props.favoritePlace.map((places, index) => {
                return <div ref={div => favotiteElements.current[index] = div} className={styleResult.card} key={places.id}>
                    <ResultCard places={places} deleteFavorite={props.deleteFavorite} task={'DELETE'} placeIndex={index} />
                </div>
            })}
        </div>
        {props.placesTips.length !== 0 && props.favoritePlace.length !== 0 ?
            <Result popularPlaces={props.placesTips} isLoading={props.isLoading}
                textHeader={'ВАМ МОЖЕТ ПОНРАВИТЬСЯ'} saveFavorite={props.saveFavorite} /> :
            null}
    </div>
}

export default Favorite