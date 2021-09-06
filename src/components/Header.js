import React, { useState, useEffect } from "react";
import { NavLink, withRouter } from "react-router-dom";
import { ReactComponent as UpArrow } from "../assets/up-arrow-circle.svg";
import gsap from "gsap";

let tl = gsap.timeline();

{
  /* Pass dimensions as props to set up the height of the menu  
    This comes from App.js*/
}
const Header = ({ history, dimensions }) => {
  // Verfify if the menu is open or not
  const [menuState, setMenuState] = useState({ menuOpened: false });

  useEffect(() => {
    // Cuando pasa a otra pagina, el menu no se cierra solo.
    // Este codigo arregla eso.
    history.listen(() => {
      setMenuState({ menuOpened: false });
    });

    if (menuState.menuOpened === true) {
      // Run open menu animation
      tl.to("body", 0.1, { css: { overflow: "hidden" } }) // Disable scroll on the body
        // Mover el .App a cierto height para que se vea el menu. Recuerde que el menu esta abajo del App
        .to(".App", 1, {
          y: dimensions.width <= 654 ? "70vh" : dimensions.height / 2,
          ease: "expo.inOut",
        })
        // Ocultar el icono del menu de hamburguezas
        .to(".hamburger-menu span", 0.6, {
          delay: -1,
          scaleX: 0, // Reducir su tama;o a 0, hace que no se muestre
          transformOrigin: "50% 0",
          ease: "expo.inOut",
        })
        // #Path_1 = id del svg
        // Mostrar el svg
        .to("#Path_1", 0.4, {
          delay: -0.6,
          css: {
            strokeDashoffset: 10,
            strokeDasharray: 5,
          },
        })
        // Mostrar el svg
        .to("#Path_2", 0.4, {
          delay: -0.6,
          css: {
            strokeDashoffset: 10,
            strokeDasharray: 20,
          },
        })
        // Mostrar el svg
        .to("#Line_1", 0.4, {
          delay: -0.6,
          css: {
            strokeDashoffset: 40,
            strokeDasharray: 18,
          },
        })
        // Mostrar el svg
        .to("#circle", 0.6, {
          delay: -0.8,
          css: {
            strokeDashoffset: 0,
          },
        })
        // Mostrar el svg
        .to(".hamburger-menu-close", 0.6, {
          delay: -0.8,
          css: {
            display: "block",
          },
        });
    } else {
      // Run close menu animation
      // Close menu
      // Hacer que el body vuelva a la posicion normal ocultando el menu
      tl.to(".App", 1, {
        y: 0,
        ease: "expo.inOut",
      })
        // Hacer una animacion bonita en el circulo del svg
        .to("#circle", 0.6, {
          delay: -0.6,
          css: {
            strokeDashoffset: -193,
            strokeDasharray: 227,
          },
        })
        .to("#Path_1", 0.4, {
          delay: -0.6,
          css: {
            strokeDashoffset: 10,
            strokeDasharray: 10,
          },
        })
        .to("#Path_2", 0.4, {
          delay: -0.6,
          css: {
            strokeDashoffset: 10,
            strokeDasharray: 10,
          },
        })
        .to("#Line_1", 0.4, {
          delay: -0.6,
          css: {
            strokeDashoffset: 40,
            strokeDasharray: 40,
          },
        })
        // Traer de vuelta el hamburger-menu
        .to(".hamburger-menu span", 0.6, {
          delay: -0.6,
          scaleX: 1,
          transformOrigin: "50% 0",
          ease: "expo.inOut",
        })
        // Ocultar el hamburger-menu-close
        .to(".hamburger-menu-close", 0, {
          css: {
            display: "none",
          },
        })
        // Hacer que todo vuelva a ser scrolleable
        .to("body", {
          css: {
            overflow: "auto",
          },
        });
    }
  }, [menuState.menuOpened]);

  return (
    <div className="header">
      {/* Custom styles without boottstrap */}
      <div className="container">
        <div className="row v-center space-between">
          <div className="logo">
            <NavLink to="/" exact>
              AGENCY.
            </NavLink>
          </div>
          {/* Hamburger menu  */}
          <div className="nav-toggle">
            <div
              onClick={() => setMenuState({ menuOpened: true })}
              className="hamburger-menu"
            >
              <span></span>
              <span></span>
            </div>
            <div
              onClick={() => setMenuState({ menuOpened: false })}
              className="hamburger-menu-close"
            >
              <UpArrow />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default withRouter(Header);
