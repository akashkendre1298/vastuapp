import { IonContent, IonHeader, IonPage, IonSearchbar, IonTitle, IonToolbar } from '@ionic/react';
import React from 'react';
import "./SearchBar.css"

const SearchBar = () => {

    return (
        <div className='search-div'>
  <div style={{width:"60%"}}>
      <IonSearchbar className="custom"></IonSearchbar>
      
  </div>

</div>
    );
};

export default SearchBar;