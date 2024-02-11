import React, { useContext, useEffect, useState } from "react";
import { IWord, UserContext } from "../context";
import { GridText, MainHeader } from "../components";

function Favorites() {
  const { favoritesWords } = useContext(UserContext);

  const [favoritesList, setFavoritesList] = useState<IWord[]>();
  
  useEffect(() => {
    setFavoritesList(favoritesList);
   } ,[favoritesList]);

  return (
    <>
      <MainHeader label="Favorite words" />
      <GridText providedList={favoritesWords} />
    </>
  );
}

export default Favorites;
