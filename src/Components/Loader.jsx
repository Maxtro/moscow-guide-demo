import React from 'react'
import Preloader from './../img/loader.svg'
import style from './../css/Loader.module.css'

const Loader = () => {

    return <div>
                <div className={style.loader}><img src={Preloader} alt={''} /></div>
            </div>
}

export default Loader