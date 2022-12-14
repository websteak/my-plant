import React, { useState } from 'react';
import classes from './PlantItem.module.css';
import ModalPortal from '../modal/modalPortal';
import PlantInfoModal from '../modal/PlantInfoModal/PlantInfoModal';
import { dbService as db } from '../../service/fbase';
import { addDoc, collection } from 'firebase/firestore';

// 김동현 2022.10.06 - 클릭하면 식물정보 모달창이 보이도록 작업
// 김수영 2022.10.07 - 모달창에서 정원에 추가 클릭 시 정원으로 추가
const PlantItem = ({ plant, userId }) => {
  const [openModal, setOpenModal] = useState(false);
  const [adding, setAdding] = useState(false);

  const onClick = () => {
    setOpenModal(!openModal);
  };
  const onAddToGarden = async () => {
    setAdding(true);
    await addDoc(collection(db, 'garden'), {
      plant: plant,
      creatorId: userId,
      nickName: plant.name,
      wateringDate: null,
      nextWateringDate: null,
      thumbImg: plant.picture[0],
    });
    setAdding(false);
    window.alert('식물을 정원에 담았습니다!');
  };
  return (
    <>
      <li className={classes.plantList} onClick={onClick}>
        <div className={classes.plantImgWrap}>
          <img
            className={classes.plantImg}
            src={plant.picture[0]}
            alt='plantImg'
          />
        </div>
        <p className={classes.plantName}>{plant.name}</p>
      </li>
      {openModal ? (
        <ModalPortal>
          <PlantInfoModal
            openModal={openModal}
            setOpenModal={setOpenModal}
            plant={plant}
            onAddToGarden={onAddToGarden}
            adding={adding}
          />
        </ModalPortal>
      ) : null}
    </>
  );
};

export default PlantItem;
