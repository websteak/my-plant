// 김동현 2022.10.04
import React from "react";
import { useState } from "react";
import classes from "./GardenItem.module.css";
import { dbService as db } from "../../service/fbase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import Button from "../UI/Button/Button";

const GardenItem = ({ plant }) => {
  const [editMode, setEditMode] = useState(false);
  const [wateringMode, setWateringMode] = useState(false);
  const [nickName, setNickName] = useState(plant.nickName);
  const toggleEditMode = () => setEditMode((prev) => !prev);
  const onChangeNickName = (e) => {
    setNickName(e.target.value);
  };
  const onEditNickName = (e) => {
    e.preventDefault();
    updateDoc(doc(db, "garden", plant.did), {
      nickName: nickName,
    });
    const ok = window.confirm("수정하시겠습니까?");
    if (ok) {
      toggleEditMode();
    }
  };
  const onCancle = () => {
    setNickName(plant.nickName);
    toggleEditMode();
  };

  const onDelete = () => {
    const ok = window.confirm("정원에서 제외하겠습니까?");
    if (ok) {
      deleteDoc(doc(db, "garden", plant.did));
    }
  };

  const toggleWateringMode = () => setWateringMode((prev) => !prev);
  return (
    <>
      <li className={classes.item}>
        <div className={classes.plantImgWrap}>
          <img
            className={classes.plantImg}
            src={plant.picture[0]}
            alt="plant"
          />
        </div>
        <div className={classes.rightSide}>
          {editMode ? (
            <form
              className={classes.editNickNameForm}
              onSubmit={onEditNickName}
            >
              <input type="text" value={nickName} onChange={onChangeNickName} />
              <button type="submit" className={classes.editButton}>
                <i className="fa-solid fa-check"></i>
              </button>
              <button onClick={onCancle} className={classes.cancleButton}>
                x
              </button>
            </form>
          ) : (
            <div className={classes.nickNameArea}>
              <h3 className={classes.plantNickName}>{nickName}</h3>
              <button onClick={toggleEditMode}>
                <i className="fa-solid fa-pen"></i>
              </button>
            </div>
          )}
          <button className={classes.plantName}>
            <span>{plant.name}</span>
            <span>?</span>
          </button>
          {!wateringMode ? (
            <Button
              className={classes.warteringBtn}
              onClick={toggleWateringMode}
            >
              <span>관리하기</span>
              <i className="fa-solid fa-droplet"></i>
            </Button>
          ) : (
            <>
              <p>가장 최근 물 준 날</p>
              <input type="date" defaultValue="2022-10-05" />
              <p>다음 물 줄 날</p>
              <input type="date" />
              <Button
                className={classes.deleteBtn}
                onClick={toggleWateringMode}
              >
                그만 돌보기
              </Button>
            </>
          )}
          <Button className={classes.deleteBtn} onClick={onDelete}>
            정원에서 제외
          </Button>
        </div>
      </li>
    </>
  );
};

export default GardenItem;
