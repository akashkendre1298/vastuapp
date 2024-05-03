import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonList,
  IonItem,
  IonLabel,
  IonButton,
  IonRouterLink,
  IonSearchbar,
  IonBackButton,
  IonButtons,
  IonImg,
  IonFooter,
} from "@ionic/react";
import "./ViewExecutive.css";
import logo from "../../Assets/pandit_shivkumar_logo.png";
import BottomTabs from "../../components/BottomTabs/BottomTabs";
import { Link } from "react-router-dom";

const ViewExecutive = () => {
  const [executives, setExecutives] = useState([]);

  useEffect(() => {
    const fetchExecutives = async () => {
      try {
        const response = await fetch("http://localhost:8888/api/executives");
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.status}`);
        }
        const data = await response.json(); // Parse the JSON response
        setExecutives(data);
      } catch (error) {
        console.error("Error fetching executives:", error);
        // Handle errors appropriately (e.g., display an error message to the user)
      }
    };

    fetchExecutives();
  }, []);

  // Function to log executive data when clicked
  const logExecutiveData = (executive) => {
    console.log("Clicked Executive ID:", executive.id);
  };
  

  return (
    <>
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

          <IonToolbar color="primary">
            <IonTitle>Executives</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonContent className="view-executive-page">
          <div className="search-div">
            <div style={{ width: "60%" }}>
              <IonSearchbar className="custom"></IonSearchbar>
            </div>
          </div>
          <div>
            <IonList inset={true}>
              {executives.map((executive, index) => (
                <IonItem
                  key={index}
                  button
                  detail={true}
                  style={{ border: "1px solid black", marginBottom: "25px" }}
                  onClick={() => logExecutiveData(executive)}
                >
                  <IonRouterLink routerLink={`/bottomtabs/individualclients/${executive.id}`}>
                    <IonLabel style={{ padding: "10px" }}>
                      <h2>{executive.firstName}</h2>
                      <p>{executive.phoneNumber}</p>
                    </IonLabel>
                  </IonRouterLink>
                </IonItem>
              ))}
            </IonList>
          </div>
          {/* Add Executive button */}
          
          <Link to="/bottomtabs/addexecutive">
            <IonButton>Add Executive</IonButton>
          </Link>
        </IonContent>
        {/* <IonFooter>
        <IonToolbar>
        <BottomTabs/>
        </IonToolbar>
      </IonFooter> */}
      </IonPage>
    </>
  );
};

export default ViewExecutive;
