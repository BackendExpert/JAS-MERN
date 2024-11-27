import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./Pages/HomePage";
import Nav from "./components/Nav/Nav";
import Footer from "./components/Footer/Footer";


export default function App() {
  const [showNavBar, setShowNavBar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleScroll = () => {
    const currentScrollY = window.scrollY;

    if (currentScrollY > lastScrollY && currentScrollY > 50) {

      setShowNavBar(false);
    } else {

      setShowNavBar(true);
    }

    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);


    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  const shouldShowNavBar = !location.pathname.startsWith("/Dashboard");
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
      <BrowserRouter>
        {shouldShowNavBar && (
          <div
            className={`fixed top-0 w-full z-50 transition-transform duration-300 ${
              showNavBar ? "translate-y-0" : "-translate-y-full"
            }`}
          >
            <NavBar />
          </div>
        )}
        <Routes>
          <Route path="/" element={<HomePage /> } />
        </Routes>
        {shouldShowNavBar && (
            <Footer />
        )}

      </BrowserRouter>
  )
}