
import { DashboardContextProvider } from '../../contexts/DashboardContext'
import Dashboard from './Dashboard'


const DashboardMain = () => {
    
  return (
    <DashboardContextProvider>
        <Dashboard />
    </DashboardContextProvider>
  )
}

export default DashboardMain