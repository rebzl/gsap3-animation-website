import React, { useEffect, useState } from "react";
import gsap from "gsap";
import Banner from "../components/Banner";
import Cases from "../components/Cases";
import IntroOverlay from "../components/IntroOverlay";

// Timeline: las animaciones se ejecuta en orden, se termina uno y comienza el otro
const tl = gsap.timeline();

const homeAnimation = (completeAnimation) => {
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
      // onComplete gsap function
      // Execute a functiona after the animation it is completed
      onComplete: completeAnimation,
    });
};

const Home = () => {
  // State to display or not display the intro overlay
  // It will unmounted when the animation timeline is completed
  const [animationComplete, setAnimationComplete] = useState(false);

  const completeAnimation = () => {
    setAnimationComplete(true);
  };

  useEffect(() => {
    // Load gsap timeline
    homeAnimation(completeAnimation);
  }, []);

  return (
    <>
      {animationComplete === false ? <IntroOverlay /> : ""}
      <Banner />
      <Cases />
    </>
  );
};

export default Home;
