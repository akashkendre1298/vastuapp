import {
  IonContent,
  IonHeader,
  IonItem,
  IonLabel,
  IonPage,
  IonSelect,
  IonSelectOption,
  IonTitle,
  IonToolbar,
  IonInput,
  IonCheckbox,
  IonButtons,
  IonBackButton,
  IonImg,
  IonFooter,
} from "@ionic/react";
import React from "react";
import BottomTabs from "../../components/BottomTabs/BottomTabs";
import logo from "../../Assets/pandit_shivkumar_logo.png";
import ToolBar from "../../components/ToolBar/ToolBar";

const AddProduct = () => {
  return (
    <IonPage>
      <IonHeader>
        
<div style={{
  backgroundColor:"#00004D"
}}>
  <ToolBar/>
</div>
        <IonToolbar>
          <IonTitle>Add Product</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">

      <div style={{paddingBottom:"10px"}}>
      <IonLabel position="floating">Choose Case</IonLabel>

</div>
        <IonItem className="add-executive-item">
          <IonLabel position="floating"></IonLabel>
          <IonSelect interface="popover" placeholder="Choose Case">
            <IonSelectOption value="1">Option 1</IonSelectOption>
            <IonSelectOption value="2">Option 2</IonSelectOption>
            <IonSelectOption value="3">Option 3</IonSelectOption>
            <IonSelectOption value="4">Option 4</IonSelectOption>
            <IonSelectOption value="5">Option 5</IonSelectOption>
          </IonSelect>
        </IonItem>


        <div style={{paddingBottom:"10px"}}>

          <IonLabel position="stacked">Product Name</IonLabel>
</div>

<IonItem className="add-executive-item">
                    <IonInput placeholder='Product Name' 
                      className="add-executive-input" 
                      name="ProductName"
                     
                    />
                  </IonItem>

        
        <div style={{paddingBottom:"10px"}}>

<IonLabel position="stacked">Category Name</IonLabel>
</div>


        <IonItem className="add-executive-item">
                    <IonInput placeholder='Category Name' 
                      className="add-executive-input" 
                      name="Category Name"
                    
                    />
                  </IonItem>

        <IonItem>
          <IonCheckbox justify="space-between">Prority</IonCheckbox>
        </IonItem>

        <div className="btn-div">
          <button className="signUp-button">Save Product</button>
        </div>
      </IonContent>
      <IonFooter>
        <IonToolbar>
          <BottomTabs />
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default AddProduct;
