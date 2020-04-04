import React, { useRef, useEffect } from 'react'
import style from '../css/Header.module.css'
import { NavLink } from 'react-router-dom'
import homeImg from '../img/home.png'
import homeSmall from '../img/home_small.png'
import { Field } from 'redux-form'
import { TweenMax } from "gsap"

const Header = React.memo(props => {

    let favorite = useRef()  
    const isMount = useRef(true);
    const oldProps = useRef(0)

    useEffect(() => {
        if(!isMount.current) TweenMax.to(favorite.current, .09, {scale: 1.1, yoyo: 1, repeat: 1})
        if (oldProps.current === props.favorite) oldProps.current = props.favorite
        if (oldProps.current !== props.favorite) isMount.current = false  
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

    })

export default Header