import '../styles/globals.css'
import Navbar from "../components/navbar";
import SectionForTracks from "../components/SectionForTracks";
import {NextUIProvider} from "@nextui-org/react";
import store from "../store/store";
import {Provider} from "react-redux";
import Navbarmobile from "../components/Navbarmobile";

export default function App({ Component, pageProps }) {
  return (
      <Provider store={store}>
      <NextUIProvider>
  <div className="grid grid-cols-12">
    <div className="col-start-1 col-end-3 h-screen bg-[#000] hidden md:flex"><Navbar/></div>

    <div className="col-start-1 md:col-start-3 col-end-13 bg-[#121212]"><Component {...pageProps} /></div>

      <SectionForTracks />

  </div>
      </NextUIProvider>
      </Provider>
        )

}
