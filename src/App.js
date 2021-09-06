import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import gsap from "gsap";
import "./styles/App.scss";

// Components
import Header from "./components/Header";
import Navigation from "./components/Navigation";

// Pages
import Home from "./pages/Home";
import CaseStudies from "./pages/CaseStudies";
import Approach from "./pages/Approach";
import Services from "./pages/Services";
import About from "./pages/About";

const routes = [
  { path: "/", name: "Home", Component: Home },
  { path: "/case-studies", name: "Case Studies", Component: CaseStudies },
  { path: "/approach", name: "Approach", Component: Approach },
  { path: "/services", name: "Services", Component: Services },
  { path: "/about-us", name: "About Us", Component: About },
];

// Al calcular el vh usando js, cuando se esta programando desde la compu y cambiamos de phone a website, todo se deforma, y hay que hacerle refresh para que todo salga bien.
// El siguiente codigo resuelve ese problema. Cada vez que cambia la dimension de la pantalla, se ejecuta el js sin tener que refrescar
// HandleResize
function debounce(fn, ms) {
  let timer;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      fn.apply(this, arguments);
    }, ms);
  };
}
// HandleResize

function App() {
  // Al calcular el vh usando js, cuando se esta programando y desde la compu cambiamos de phone a website, todo se deforma, y hay que hacerle refresh para que todo salga bien.
  // El siguiente codigo resuelve ese problema.
  const [dimensions, setDimensions] = useState({
    height: window.innerHeight,
    width: window.innerWidth,
  });

  useEffect(() => {
    // Prevent flashing
    gsap.to("body", 0, { css: { visibility: "visible" } });

    // Use js in scss to define the innerHeight
    // innerHeight to adapt any screen
    // --vh = variable
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    // Al calcular el vh usando js, cuando se esta programando y desde la compu cambiamos de phone a website, todo se deforma, y hay que hacerle refresh para que todo salga bien.
    // El siguiente codigo resuelve ese problema. Cada vez que cambia la dimension de la pantalla, se ejecuta el js sin tener que refrescar
    // HandleResize

    const debounceHandleResize = debounce(function handleResize() {
      setDimensions({
        height: window.innerHeight,
        width: window.innerWidth,
      });
    }, 1000);

    window.addEventListener("resize", debounceHandleResize);

    return () => {
      window.removeEventListener("resize", debounceHandleResize);
    };
    // HandleResize
  });
  return (
    <Router>
      {/* Pass dimensions as props to set up the height of the menu  */}
      <Header dimensions={dimensions} />
      {console.log(dimensions)}
      <div className="App">
        {routes.map(({ path, Component }) => (
          <Route key={path} exact path={path}>
            <Component />
          </Route>
        ))}
      </div>
      <Navigation />
    </Router>
  );
}

export default App;
