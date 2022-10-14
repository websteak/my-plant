import React from "react";
import { useLocation } from "react-router-dom";
import PlantItem from "../../components/PlantItem/PlantItem";
import classes from "./SearchResult.module.css";

const SearchResult = (props) => {
  let userId = props.userInfo.uid;
  const location = useLocation();

  const search = location.state.search;

  console.log(search);
  console.log(userId);
  return (
    <>
      <div className={classes.wrapper}>
        <div className={classes.container}>
          <div className={classes.title}>
              <span>검색결과</span>
          </div>
          <ul className={classes.searchResult}>
            {/* 김동현 2022.10.13 - 검색한 식물 정보 mapping */}
            {search.map((item) => {
              return <PlantItem plant={item} key={item.id} userId={userId} />;
            })}
          </ul>
        </div>
      </div>
    </>
  );
};

export default SearchResult;
