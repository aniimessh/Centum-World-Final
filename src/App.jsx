import { Route, Routes, useLocation } from "react-router-dom";
import {
  About,
  Contact,
  Experience,
  Hero,
  Navbar,
  Works,
  StarsCanvas,
  // ChatApp
} from "./components";
import { Footer } from "./components/Footer";
import Member from "./components/Member";
import TradingViewWidget from "./components/TradingView";
import { useEffect } from "react";
import TradeButton from "./components/TradeButton"; 


const App = () => {

  const location = useLocation();
  const isMemberPage = location.pathname === "/member";
  const isAboutPage = location.hash === "#about";

  useEffect(() => {
      if (location.hash === "#white-paper" && (isMemberPage || isAboutPage)) {
      window.location.href = `/`;
    }
  }, [location, isMemberPage, isAboutPage]);

  return (
    <>
    {/* <ChatApp /> */}
      <Routes>
        <Route path="/member" element={<Member />} />
        <Route
          path="/"
          element={
            isMemberPage ? null : (
              <>
                <div className="relative z-40 bg-primary">
                  <div className="bg-hero-pattern bg-cover bg-center pb-28">
                    <Navbar />
                    <Hero />
                  </div>
                  <About />
                  <TradingViewWidget />
                  <TradeButton />
                  <Experience />
                  <Works />
                  <div className="relative z-0">
                    <Contact />
                    <StarsCanvas />
                  </div>
                  <div>
                    <Footer />
                  </div>
                </div>
              </>
            )
          }
        />
      </Routes>
    </>
  );
};

export default App;