import React from 'react'
import style from '../css/DetailPlace.module.css'
import Loader from './Loader'
import { YMaps, Map, Placemark } from 'react-yandex-maps'
import { Redirect } from 'react-router-dom'
import cogoToast from 'cogo-toast'

const DetailPlace = ({ isLoading, detailPlace, isRedirect, saveFavorite }) => {

 let onSaveInFavorite = (favorite) => {
    saveFavorite(favorite)
    cogoToast.success('Добавлено в избранное', {position: 'bottom-center'});
  }

    if (isRedirect) return <Redirect to={'/'} />

    return <>
    {isLoading ? <Loader /> : 
      <div className={style.place}>
        <div className={style.placeCard}>

          <div>
            <img src={ !detailPlace.categories ? null : detailPlace.categories.length === 0 ? null : detailPlace.categories[0].icon.prefix + 'bg_64' + detailPlace.categories[0].icon.suffix} alt={''} /> <br />
            <p className={style.categoriText}> {!detailPlace.categories ? null : detailPlace.categories.length === 0 ? null : detailPlace.categories[0].shortName} </p>
          </div>

          <div>
            <b>{detailPlace.name}</b> <br />
            <p className={style.adressText}>{detailPlace.location ? detailPlace.location.formattedAddress[0] : null}  <br />
              Телефон: {detailPlace.contact ? detailPlace.contact.formattedPhone : 'Нет'} </p>


            <button onClick={() => {
              let fvaoriteObj = {
                id: detailPlace.id,
                name: detailPlace.name,
                categories: !detailPlace.categories ? null : detailPlace.categories.length === 0 ? null : detailPlace.categories[0].shortName,
                categoriesIcon: !detailPlace.categories ? null : detailPlace.categories.length === 0 ? null : detailPlace.categories[0].icon.prefix + 'bg_64' + detailPlace.categories[0].icon.suffix,
                address: detailPlace.location ? detailPlace.location.formattedAddress[0] : null
              }
              onSaveInFavorite(fvaoriteObj)
            }} className={style.button}>Сохранить</button>
          </div>

          <YMaps >
            <Map className={style.ymaps} defaultState={{ center: [detailPlace.location ? detailPlace.location.lat : null, detailPlace.location ? detailPlace.location.lng : null], zoom: 15 }} >
              <Placemark geometry={[detailPlace.location ? detailPlace.location.lat : null, detailPlace.location ? detailPlace.location.lng : null]} />
            </Map>
          </YMaps>

          {/* <div> <img className={style.placeCardImg} src={ detailPlace.likes ? detailPlace.likes.groups[0].items[0].photo.prefix + ''+ detailPlace.likes.groups[0].items[0].id +''+ detailPlace.likes.groups[0].items[0].photo.suffix : null } alt={''} /> </div> */}

        </div>

      </div>
      }
    </>
  }


export default DetailPlace