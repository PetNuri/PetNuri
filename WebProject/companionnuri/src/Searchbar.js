import { calculateNewValue } from "@testing-library/user-event/dist/utils";
import React, { useState, useEffect } from "react";
// import { FaSearch } from 'react-icons/fa';
import { useNavigate } from "react-router-dom";
import styles from "./css/Floating.module.css";
import SearchContent from "./SearchContent";

const hd_search_box = {
  width: "100%",
  borderRadius: "20px",
  backgroundColor: "#fff",
  height: "40px",
  padding: "0 15px 0 10px",
  display: "flex",
  alignItems: "center",
};

const hd_search_icon = {
  backgroundColor: "transparent",
  border: "none",
  fontSize: "16px",
  marginRight: "5px",
  color: "#494949",
};

const hd_search_input = {
  border: "none",
  fontSize: "16px",
  height: "40px",
  width: "calc(100% - 45px)",
};

function Searchbar(props) {
  const [keyword, setKeyword] = useState(null);
  console.log(keyword);
  const navigate = useNavigate();

  const sendFunction = () => {
    console.log(keyword)

    navigate("/Searchmain", {
      state: {
        keyword,
      },
    });
  }

  const clickButton = (e) => {
    props.setinputValue(e);
    props.setOpen(true);

    if (e.length === 0 || e === null || e === "") {
      console.log("글자가 없쪄용click")
      setKeyword("글자가 없쪄용click");
      sendFunction();
    }
    else {
      setKeyword(e)
      sendFunction();
    }

    
  };

  const inputPress = (e) => {
    setKeyword(e.target.value);
    // console.log(e.target.value)
    clickButton(e.target.value);
    
    if (e.key === "Enter") {
      setKeyword(e.target.value);
      clickButton(e.target.value);
      console.log(keyword)
      sendFunction();
    }
  };

  const inputChange = (e) => {
    console.log(e.target.value)
    if (e.target.value.length === 0 || e.target.value === null || e.target.value === "") {
      console.log("글자가 없쪄용input")
      setKeyword("글자가 없쪄용input");
      sendFunction();
    } else {
      setKeyword(e.target.value)
      console.log(e.target.value)
      sendFunction();
    }
    clickButton(e.target.value)
  };

  // console.log(keyword);
  
  const start = () => {
    if (keyword === null) {
      console.log("처음")
      sendFunction();
    }
    else {
      console.log("start의 else");
      sendFunction();
    }
  }

  useEffect(() => {
    start();
  }, []);

  // if (keyword === "" && cnt === 1) {
  //   cnt = cnt + 1
  //   navigate("/Searchmain", {
  //     state: {
  //       keyword,
  //     },
  //   });
  // }

  

  return (
    <div className="d-flex justify-content-end">
      <div style={hd_search_box}>
        <button style={hd_search_icon}>
          <i class="fa-solid fa-magnifying-glass" onClick={clickButton}></i>
        </button>
        <input
          className={styles.searchInputFloating}
          type="text"
          placeholder="검색어를 입력해주세요"
          style={hd_search_input}
          onKeyPress={inputPress}
          onChange={inputChange}
        ></input>
        {/* <FaSearch size="24" color="red" /> */}
      </div>
    </div>
  );
}

export default Searchbar;
