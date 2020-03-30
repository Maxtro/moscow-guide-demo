import React from 'react'
import style from '../css/Result.module.css'
import { NavLink } from 'react-router-dom'
import cogoToast from 'cogo-toast'

const ResultCard = ({ places, saveFavorite, deleteFavorite, task, placeIndex }) => {

    const buttonControl = (taskButton, places, placeIndex) => {
        if (taskButton === 'SAVE') {
            return <button onClick={() => {
                let fvaoriteObj = {
                    id: places.id,
                    name: places.name,
                    categories: places.categories[0] ? places.categories[0].shortName : null,
                    categoriesIcon: places.categories[0] ? places.categories[0].icon.prefix + 'bg_64' + places.categories[0].icon.suffix : null,
                    address: places.location.formattedAddress[0]
                }
                onSaveInFavorite(fvaoriteObj)
            }} className={style.button}>Сохранить</button>
        }
        if (taskButton === 'DELETE') {
            return <button onClick={() => { onDeleteFavorite(placeIndex) }} className={style.button}>Удалить</button>
        }
    }

    const dataPlaces = (taskButton) => {
        if (taskButton === 'SAVE') {
            return ({
                scr: places.categories[0] ? places.categories[0].icon.prefix + 'bg_64' + places.categories[0].icon.suffix : null,
                adress: places.location.formattedAddress[0],
                categorie: places.categories[0] ? places.categories[0].shortName : null
            })
        }
        if (taskButton === 'DELETE') {
            return ({
                scr: places.categoriesIcon,
                adress: places.address,
                categorie: places.categories
            })
        }
    }

    const onDeleteFavorite = (idPlace) => {
        deleteFavorite(idPlace)
        cogoToast.warn('Удалено', { position: 'bottom-center' });
    }

    const onSaveInFavorite = (favorite) => {
        saveFavorite(favorite)
        cogoToast.success('Добавлено в избранное', { position: 'bottom-center' });
    }

    return <div className={style.resultCard} >
        <div>
            <img
                src={dataPlaces(task).scr} alt={''} />
            <p className={style.categoriText}>{dataPlaces(task).categorie}</p>
        </div>

        <div className={style.box}><b>{places.name}</b><br /> <p className={style.adressText}>{dataPlaces(task).adress}</p></div>

        <div></div>

        <div className={style.buttonBox}>
            <NavLink to={`/place/${places.id}`}>
                <button className={style.button}>Подробно</button>
            </NavLink>
                            &nbsp;&nbsp;&nbsp;&nbsp;
            {buttonControl(task, places, placeIndex)}
        </div>
        <div></div>
    </div>
}

export default ResultCard