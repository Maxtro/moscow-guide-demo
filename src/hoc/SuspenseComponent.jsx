import React, { Suspense } from 'react'
import Loader from '../Components/Loader'

const SuspenseComponent = (Component) => {
    return (props) => {
       return <Suspense fallback={ <Loader /> }>
            <Component { ...props }/>
        </Suspense>
    } 
}

export default SuspenseComponent