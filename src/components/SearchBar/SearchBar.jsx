import { IonContent, IonHeader, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import "./SearchBar.css"


const SearchBar = ({ searchQuery, handleSearch }) => {
  return (
    <div className='search-div'>


   
    <IonSearchbar
      value={searchQuery}
      onIonInput={handleSearch}
      placeholder="Search"
      className='custom'
    />
     </div>
  );
};

export default SearchBar;

  