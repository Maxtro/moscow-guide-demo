import React from 'react';
import SuspenseComponent from './hoc/SuspenseComponent'
import HeaderContainer from './Components/HeaderContainer'
import ResultContainer from './Components/ResultContainer'
import DetailPlaceContainer from './Components/DetailPlaceContainer'
import { Route, Switch } from 'react-router-dom';
import cogoToast from 'cogo-toast'

const FavoriteContainer = React.lazy(() => import('./Components/FavoriteContainer'));

class App extends React.Component  {

   catchAllErrors = (reason, promise) => {
    cogoToast.error('Что-то пошло не так!', { position: 'bottom-center' })
  }

  componentDidMount(){
    window.addEventListener('unhandledrejection', this.catchAllErrors)
  }

  componentWillUnmount(){
    window.removeEventListener('unhandledrejection', this.catchAllErrors)
  }

  render(){
  return ( 
    <div>
      <HeaderContainer />
      <Switch>
      <Route exact path='/' render={() => <ResultContainer />} />
      <Route path='/place/:placeId' render={ SuspenseComponent(DetailPlaceContainer) } />
      <Route path='/favorites' render={ SuspenseComponent(FavoriteContainer) }/>
      <Route path='*' render={() => <div style={ {paddingTop: 75, textAlign: "center"} }>404 NOT FOUND</div>} />
      </Switch>
    </div>
  );
  }
}

export default App;
