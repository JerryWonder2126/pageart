import { createContext, useContext, useReducer } from 'react';
import Home from '../components/Home/Home';
import About from '../components/About/About';
import Contact from '../components/Contact/Contact';
import Offers from '../components/Offers/Offers';
import OrderOffer from '../components/OrderOffer/OrderOffer';
import DashboardMain from '../components/Dashboard/DashboardMain';
import ArtSession from './Session/AppSession';

const MainContext = createContext();

const UpdateMainContext = createContext();

const viewReducer = (state, action) => {
  let newView = <Home />;
  if (action.view === 'about') {
    newView = <About />
  } else if (action.view === 'contact') {
    newView = <Contact />
  } else if (action.view === 'dashboard') {
    newView = <DashboardMain />
  } else if (action.view === 'offer') {
    newView = <Offers title={action.title} sectionHash={action.uhash} />
  } else if (action.view === 'order') {
    newView = <OrderOffer offer={action.offer} />
  }


  return newView;
}

const previousView = () => {
  const action = ArtSession.getCurrView('history')
  return viewReducer(null, action)
}

export const AppContextProvider = (props) => {
  const {children} = props;

  const [activeView, setActiveView] = useReducer(viewReducer, previousView());
  
  const changeView = (view) => {
    let action = {view}
    ArtSession.updateHistory(action, 'history')
    setActiveView(action)
  }

  const openOffersView = (title, uhash) => {
    let action = {view: 'offer', title, uhash}
    ArtSession.updateHistory(action, 'history')
    setActiveView(action)
  }

  const openOrderView = (offer) => {
    let action = {view: 'order', offer}
    ArtSession.updateHistory(action, 'history')
    setActiveView(action)
  }
  

  const mainContext = {activeView}

  const updateMainContext = {changeView, openOffersView, openOrderView}

  return (
    <MainContext.Provider value={mainContext}>
      <UpdateMainContext.Provider value={updateMainContext}>
        { children }
      </UpdateMainContext.Provider>
    </MainContext.Provider>
  )
}

export const useUpdateMainContext = () => {
  return useContext(UpdateMainContext);
}

export const useMainContext = () => {
  return useContext(MainContext);
}
