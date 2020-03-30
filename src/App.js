import React from 'react';
import SuspenseComponent from './hoc/SuspenseComponent'
import HeaderContainer from './Components/HeaderContainer'
import ResultContainer from './Components/ResultContainer'
import DetailPlaceContainer from './Components/DetailPlaceContainer'
import { Route } from 'react-router-dom';

const FavoriteContainer = React.lazy(() => import('./Components/FavoriteContainer'));

const App = () => {
  return ( 
    <div>
      <HeaderContainer />
      <Route path='/place/:placeId' render={ SuspenseComponent(DetailPlaceContainer) } />
      <Route exact path='/' render={() => <ResultContainer />} />
      <Route path='/favorites' render={ SuspenseComponent(FavoriteContainer) }/>
    </div>
  );
}

export default App;
