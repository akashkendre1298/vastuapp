import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonSearchbar,
  IonSelect,
  IonSelectOption,
  IonLabel,
  IonItem,
  IonButton,
  IonIcon,
  IonList,
  IonButtons,
  IonBackButton,
  IonImg,
  IonFooter,
} from "@ionic/react";
import React from "react";
import { trash, checkmark } from 'ionicons/icons';
import logo from "../../Assets/pandit_shivkumar_logo.png"

import "./ViewProduct.css"
import BottomTabs from "../../components/BottomTabs/BottomTabs";
import SearchBar from "../../components/SearchBar/SearchBar";

const ViewProduct = () => {

    const data = [
        {  product: 'Laptop', category: 'Electronics', priority: 'High', purchased: true, paymentStatus: 'Paid' },
        {  product: 'Headphones', category: 'Electronics', priority: 'Medium', purchased: false, paymentStatus: 'Pending' },
        {  product: 'Book', category: 'Books', priority: 'Low', purchased: true, paymentStatus: 'Paid' },
        // Add more data as needed
      ];
    
  return (
    <IonPage>
      <IonHeader>
    <IonToolbar style={{ color: "#00004D" }}>
      <IonButtons slot="start">
        <IonBackButton defaultHref="#" />
      </IonButtons>

      {/* <IonTitle>Executives</IonTitle> */}

      <IonButtons slot="end">
        <IonImg src={logo} alt="App Logo" />
      </IonButtons>
    </IonToolbar>

    <IonToolbar style={{ color: "#00004D" }} >
      <IonTitle>Products</IonTitle>
    </IonToolbar>
  </IonHeader>
      <IonContent className="ion-padding">
       <div>
        <SearchBar/>
       </div>

       <div style={{paddingBottom:"10px"}}>
       <IonLabel position="floating">Choose Case</IonLabel>

</div>
        <IonItem style={{border:"1px solid black",marginBottom:"25px"}}>
       <IonLabel position="floating"></IonLabel>

          <IonSelect interface="popover" placeholder="Choose Case" > 
            <IonSelectOption value="1">Option 1</IonSelectOption>
            <IonSelectOption value="2">Option 2</IonSelectOption>
            <IonSelectOption value="3">Option 3</IonSelectOption>
            <IonSelectOption value="4">Option 4</IonSelectOption>
            <IonSelectOption value="5">Option 5</IonSelectOption>
          </IonSelect>
        </IonItem>

        <div  style={{ width: '100%', overflowX: 'auto', marginTop:"40px" }}>

        <table className="custom-table">
  <thead>
    <tr>
      <th>Product</th>
      <th>Category</th>
      <th>Priority</th>
      <th>Purchased</th>
      <th>Payment Status</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    {data.map(item => (
      <tr key={item.id}>
        <td>{item.product}</td>
        <td>{item.category}</td>
        <td>{item.priority}</td>
        <td>{item.purchased ? 'Yes' : 'No'}</td>
        <td>{item.paymentStatus}</td>
        <td>
          <button>Delete</button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

      </div>


<div className="btn-div">
{/* 
      <button className="signUp-button" >
            Add Product
            </button> */}
              <IonButton routerLink="/product">Add Product</IonButton>
</div>
      
      </IonContent>
      <IonFooter>
        <IonToolbar>
        <BottomTabs/>
        </IonToolbar>
      </IonFooter>
    </IonPage>
  );
};

export default ViewProduct;
