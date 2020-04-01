import React from 'react'
import style from '../css/Header.module.css'
import { NavLink } from 'react-router-dom'
import homeImg from '../img/home.png'
import homeSmall from '../img/home_small.png'
import { Field } from 'redux-form'

const Header = (props) => {

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
                    <div className={style.favorites} ><b><span className={style.favoriteText}>Избранное:</span> <span className={style.favoriteNuber}>{props.favorite}</span></b></div>
                </NavLink>
            </div>

        </>

    }

export default Header