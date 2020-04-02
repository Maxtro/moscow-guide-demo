import React from 'react'
import style from '../css/Header.module.css'
import { NavLink } from 'react-router-dom'
import homeImg from '../img/home.png'
import homeSmall from '../img/home_small.png'
import { Field } from 'redux-form'
import { useEffect } from 'react'
import { TweenMax } from "gsap"
import { useRef } from 'react'

const Header = (props) => {

    let favorite = useRef()

    useEffect(() => {
        if (props.favorite) TweenMax.to(favorite.current, .09, {scale: 1.1, yoyo: 1, repeat: 1})
    }, [props.favorite])

        return <>

            <div className={style.header}>
                <NavLink to={'/'}>
                    <div className={style.home}>
                        <img src={homeImg} alt='' />
                    </div>
                    <div className={style.homeSmall}>
                        <img src={homeSmall} alt='' />
                    </div>
                </NavLink>
                <div>
                    <form onSubmit={props.handleSubmit}>
                    <Field autoFocus={true} placeholder='Найти...' component={'input'} type={'search'} name={'query'} />
                    <button className={style.findButton} type='submit' ></button>
                    </form>
                </div>
                <NavLink to={'/favorites'}>
                    <div className={style.favorites} ref={div => favorite.current = div}>
                        <b><span className={style.favoriteText}>Избранное: {props.favorite}</span> </b>
                        <span className={ style.favoriteIcon }><b>{props.favorite}</b></span>
                    </div>
                </NavLink>
            </div>

        </>

    }

export default Header