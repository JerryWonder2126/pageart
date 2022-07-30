import Main from './components/Main/Main';
import { AppContextProvider } from "./contexts/MainContext";
import { QueryClient, QueryClientProvider } from 'react-query'

import './App.css';
import 'bootstrap/dist/css/bootstrap.css';

const queryClient = new QueryClient()

function App() {
  return (
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
        <Main className="App"/>
      </QueryClientProvider>
    </AppContextProvider>
  )
}

export default App;
