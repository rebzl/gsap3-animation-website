import React from "react";

const Header = () => {
  return (
    <div className="header">
      {/* Custom styles without boottstrap */}
      <div className="container">
        <div className="row v-center space-between">
          <div className="logo">
            <a href="/">AGENCY.</a>
          </div>
          <div className="nav">
            {/* Hambuger Menu  */}
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
