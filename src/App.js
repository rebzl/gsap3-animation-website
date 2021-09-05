import { useEffect } from "react";
import gsap from "gsap";
import "./styles/App.scss";
import Header from "./components/Header";
import Banner from "./components/Banner";
import Cases from "./components/Cases";
import IntroOverlay from "./components/IntroOverlay";

function App() {
  useEffect(() => {
    // Use js in scss to define the innerHeight
    // innerHeight to adapt any screen
    // --vh = variable
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);

    // Prevent flashing
    gsap.to("body", 0, { css: { visibility: "visible" } });

    // Timeline: las animaciones se ejecuta en orden, se termina uno y comienza el otro
    const tl = gsap.timeline();
    // animate the title
    // (classname, duration, animation)
    tl.from(".line span", 1.8, {
      y: 100,
      ease: "power4.out",
      delay: 1,
      skewY: 7,
      // stagger = Animate with the same animation one child and then the other
      stagger: {
        amount: 0.3,
      },
    })
      // Animate the overlay top of intro overlay
      .to(".overlay-top", 1.6, {
        height: 0,
        ease: "expo.inOut",
        stagger: 0.4,
      })
      // Animate the overlay bottom of intro overlay
      .to(".overlay-bottom", 1.6, {
        width: 0,
        ease: "expoOut",
        delay: -0.8,
        stagger: {
          amount: 0.4,
        },
      })
      // Remove the intro overlay, once it is animated
      .to(".intro-overlay", 0, {
        css: {
          display: "none",
        },
      })
      // Animate images
      .from(".case-image img", 1.6, {
        scale: 1.4,
        ease: "expo.inOut",
        delay: -2,
        stagger: {
          amount: 0.4,
        },
      });
  }, []);

  return (
    <div className="App">
      <IntroOverlay />
      <Header />
      <Banner />
      <Cases />
    </div>
  );
}

export default App;
