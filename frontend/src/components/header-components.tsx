import React from "react";
import NavbarComponents from "./navbar-components";

function HeaderComponents() {
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h1 className="text-4xl font-bold">MerkStore</h1>
        <NavbarComponents />
      </div>
    </div>
  );
}

export default HeaderComponents;
