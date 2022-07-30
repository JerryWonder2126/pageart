import { createContext, useContext, useReducer, useState } from 'react';
import Services from '../components/Dashboard/Services/Services';
import Offers from '../components/Dashboard/Offers/Offers';

import ServiceForm from '../components/Dashboard/Services/ServiceForm/ServiceForm';
import OfferForm from '../components/Dashboard/Offers/OfferForm/OfferForm';
import PreviewItem from '../components/Dashboard/PreviewItem/PreviewItem';
import ArtSession from './Session/AppSession';
import EditItemImage from '../components/Dashboard/EditItemImage/EditItemImage';

const DashboardContext = createContext();

const UpdateDashBoardContext = createContext();

const viewReducer = (state, action) => {
  let currView
  if (action.view === 'admin:offers') {
    currView = <Offers />
  } else if (action.view === 'admin:services') {
    currView = <Services />
  } else if (action.view === 'admin:addService') {
    // activeView = <ServiceForm type={action.type} service={action.item}/>
  } else if (action.view === 'admin:addOffer') {
    // activeView = <OfferForm type={action.type} offer={action.item}/>
  } else if (action.type === 'preview') { // Preview takes precendence over creation or updating component
    currView = <PreviewItem item={action.item} isOffer={action.isOffer}/>
  } else if (action.view === 'admin:processService') {
    currView = <ServiceForm type={action.type} service={action.item}/>
  } else if (action.view === 'admin:processOffer') {
    currView = <OfferForm type={action.type} offer={action.item}/>
  } else if (action.view === 'admin:processImage') {
    currView = <EditItemImage type={action.type} item={action.item}/>
  }
  return currView
}

const dashboardState = () => {
  let action = ArtSession.getCurrView('dashHistory')
  return viewReducer(null, action)
}

export const DashboardContextProvider = (props) => {
  const {children} = props;

  const [view, setView] = useReducer(viewReducer, dashboardState())

  const [serviceHash, setServiceHash] = useState('')

  const updateView = view => {
    let action = {view}
    ArtSession.updateHistory(action, 'dashHistory')
    setView(action)
  }
  const processService = (type, item, isOffer=false) => {
    let action = {view: 'admin:processService', type, item, isOffer}
    ArtSession.updateHistory(action, 'dashHistory')
    setView(action)
  }
  const processOffer = (type, item, isOffer) => {
    let action = {view: 'admin:processOffer', type, item, isOffer}
    ArtSession.updateHistory(action, 'dashHistory')
    setView(action)
  }
  const processItemImage = (type, item) => {
    let action = {view: 'admin:processImage', type, item}
    ArtSession.updateHistory(action, 'dashHistory')
    setView(action)
  }
  const previousView = () => {
    let prevAction = ArtSession.goBack('dashHistory')
    if (prevAction) setView(prevAction)
  }

  const dashboardContext = {
    serviceHash, view
  }

  const updateDashboardContext = {
    setServiceHash, updateView, processService, 
    processOffer, previousView, processItemImage
  }

  return (
    <DashboardContext.Provider value={dashboardContext}>
      <UpdateDashBoardContext.Provider value={updateDashboardContext}>
        { children }
      </UpdateDashBoardContext.Provider>
    </DashboardContext.Provider>
  )
}

export const useUpdateDashboardContext = () => {
  return useContext(UpdateDashBoardContext);
}

export const useDashboardContext = () => {
  return useContext(DashboardContext);
}