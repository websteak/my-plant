import { signOut } from "firebase/auth";
import React from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "../../service/fbase";
import Button from "../UI/Button/Button";
import classes from "./Navigation.module.css";
import logo from "../../image/logo.png";
import { useState } from "react";

// 김동현 2022.10.06 navigation 작업
const Navigation = (props) => {
  const navigate = useNavigate();
  const [menuActive, setMenuActive] = useState(false);
  const handlePlantRecommendationButton = () => {
    props.setPlantRecommendation(true); // 식물추천 navigation 으로 변경
    navigate("/my-plant/recommendation"); // 식물추천 page 로 이동
  };
  // 김동현 2022.10.06 - 로그아웃 기능
  const handleLogoutButton = () => {
    signOut(authService);
    props.setIsLogin(false);
    navigate("/my-plant");
  };
  // 김동현 2022.10.06 - 경로 이동 기능
  const handleNavigate = (e) => {
    if (e.target.innerText === "정원 관리하기") {
      navigate("/my-plant/garden");
    } else if (e.target.innerText === "오늘의 식물 PICK") {
      navigate("/my-plant/");
    }
  };
  // 김수영 2022.10.08 - 반응형 메뉴바 보이기 기능
  const toggleMenu = () => setMenuActive(prev => !prev);
  console.log(menuActive);
  const gnbClasses =!menuActive ? `${classes.gnbArea}` : `${classes.gnbArea} ${classes.gnbActive}`
  console.log(gnbClasses);
  return (
    <>
      {/* wrapper area */}
      <div className={classes.wrapper}>
        <div className={classes.container}>
          {/* logo */}
          <div className={classes.logoArea}>
            <img className={classes.logo} src={logo} alt="logo" />
          </div>
          <button className={classes.gnbBtn} onClick={toggleMenu}>
            <i className="fa-solid fa-bars"></i>
          </button>
          <nav className={gnbClasses}>
            {/* user info */}
            <div className={classes.userInfoArea}>
              <p>환영합니다.</p>
              <h2>{props.userInfo.displayName} 님</h2>
            </div>
            {/* search */}
            <div className={classes.searchPlantArea}>
              <form className={classes.searchPlantForm}>
                <input type="search" placeholder="식물 이름" />
                <input type="submit" value="☌" />
              </form>
            </div>
            {/* menu */}
            <div className={classes.menuArea}>
              <Button className={classes.yellow} onClick={handleNavigate}>
                오늘의 식물 PICK
              </Button>
              <Button className={classes.yellow} onClick={handleNavigate}>
                정원 관리하기
              </Button>
              <Button
                className={classes.blue}
                onClick={handlePlantRecommendationButton}
              >
                식물 추천받기
              </Button>
            </div>
            {/* logout */}
            <div className={classes.logoutArea}>
              <button onClick={handleLogoutButton}>로그아웃</button>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
};

export default Navigation;
