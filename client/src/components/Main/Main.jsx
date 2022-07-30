import Nav from "../Nav/Nav";
import Footer from '../Footer/Footer';

import { useMainContext } from "../../contexts/MainContext";

const Main = () => {

  const {activeView} = useMainContext();

  return (
    <>
      <Nav />
      {activeView}
      <Footer />
    </>
      
  )
}

export default Main