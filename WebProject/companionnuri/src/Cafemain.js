import Cafemap from "./Cafemap";
import Top from "./Top";
import styles from "./css/Main.module.css";
import { useLocation } from "react-router-dom";
import React, { useState, useEffect } from "react";

function Cafemain() {
  const location = useLocation();
  const job = location.state.job;

  console.log(job);

  return (
    <div className="d-flex flex-column align-items-center">
      <Top />
      <Cafemap />
    </div>
  );
}

export default Cafemain;
