import React from 'react';
import classes from './SearchWindow.module.css';

const SearchWindow = (props) => {
  return (
    <div className={classes.wrap}>
      <ul className={classes.searchList}>
        {props.searchPlant.map((plant) => (
          <li onClick={() => props.setSearch(plant.name)}>{plant.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default SearchWindow;
