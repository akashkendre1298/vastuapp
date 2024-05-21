import React from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonIcon,
  IonButton,
  IonImg,
  IonProgressBar,
  IonFooter,
} from "@ionic/react";
import {
  cash,
  folder,
  calendar,
  barChart,
  personAdd,
  cashSharp,
  folderOpen,
  barChartSharp,
  fileTraySharp,
  fileTrayFullSharp,
  personCircle,
  personCircleOutline,
  navigate,
} from "ionicons/icons";
import logo from "../../Assets/pandit_shivkumar_logo.png";
import { useHistory } from "react-router-dom";
import "./Home.css";
import BottomTabs from "../../components/BottomTabs/BottomTabs";

const Home = () => {
  const history = useHistory();

  // const handleButtonClick = (buttonName) => {
  //   switch (buttonName) {
  //     case "executive":
  //       history.push("/bottomtabs/viewexecutive");
  //       break;
  //     case "cases":
  //       history.push("/bottomtabs/cases");
  //       break;
  //     case "meetings":
  //       history.push("/bottomtabs/meetings");
  //       break;
  //     case "revenue":
  //       history.push("/revenue");
  //       break;
  //     case "client":
  //       history.push("/client");
  //       break;
  //     case "reports":
  //       history.push("/reports");
  //       break;
  //     default:
  //       break;
  //   }
  // };

  const handleProfile = () => {
    history.push("/bottomtabs/profile");
  };

  return (
    <>
      <IonPage style={{ backgroundColor: "#f0f0f0" }} className="home-page-main">
        <IonHeader>
          <IonToolbar
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "0 10px 0 10px",
            }}
          >
            {" "}
            {/* Added flex styles */}
            {/* <IonProgressBar type="indeterminate"></IonProgressBar> */}
          
            <IonIcon
              icon={personCircleOutline}
              style={{ fontSize: "35px" }}
              slot="start"
              onClick={handleProfile}
            ></IonIcon>
            <IonImg
              src={logo}
              alt="App Logo"
              slot="end"
              style={{paddingRight:"10px"}}
            />{" "}
            {/* Replace with your logo path */}
          </IonToolbar>
        </IonHeader>
        <IonContent style={{ paddingTop: "100px", backgroundColor: "#f0f0f0" }}>
          <IonGrid
            style={{
              // paddingTop: "50px",
              height:"84vh",
              background: "linear-gradient(135deg, #f5f7fa, #c3cfe2)",
            }}
          >
            <IonRow>
              <IonCol>
                <IonCard
                className="card-home"
                
                  button
                  
                  href="/bottomtabs/viewexecutive"
                >
                  <IonCardHeader>
                    <IonCardTitle
                      style={{
                        display: "block",
                        justifyContent: "center",
                        alignItem: "center",
                      }}
                    >
                      <IonIcon
                        icon={cashSharp}
                        style={{
                          fontSize: "35px",
                          marginBottom: "10px",
                          paddingLeft: "30%",
                          paddingTop: "20%",
                        }}
                      />
                      <p style={{textAlign:"center"}}>

                      Executives
                      </p>
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent></IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol>
                <IonCard 
                className="card-home"
                  
                  button
                  // onClick={() => handleButtonClick("cases")}
                  href="/bottomtabs/viewcases"
                >
                  <IonCardHeader>
                    <IonCardTitle>
                      <IonIcon
                        icon={folderOpen}
                        style={{
                          fontSize: "35px",
                          marginBottom: "10px",
                          paddingLeft: "30%",
                          paddingTop: "20%",
                        }}
                      />
                      <p style={{textAlign:"center"}}> 

                      Cases
                      </p>
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent></IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol>
                <IonCard
                  className="card-home"
                  button
                  // onClick={() => handleButtonClick("meetings")}
                  href="/bottomtabs/upcomingmeetings"
                >
                  <IonCardHeader>
                    <IonCardTitle>
                      <IonIcon
                        icon={calendar}
                        style={{
                          fontSize: "35px",
                          marginBottom: "10px",
                          paddingLeft: "30%",
                          paddingTop: "20%",
                        }}
                      />

                      <p style={{textAlign:"center"}}>

                      Meetings
                      </p>
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent></IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol>
                <IonCard
                  className="card-home"
                  button
                  // onClick={() => handleButtonClick("revenue")}
                  href="/bottomtabs/revenue"
                >
                  <IonCardHeader>
                    <IonCardTitle>
                      <IonIcon
                        icon={barChartSharp}
                        style={{
                          fontSize: "35px",
                          marginBottom: "10px",
                          paddingLeft: "30%",
                          paddingTop: "20%",
                        }}
                      />{" "}
                     <p style={{textAlign:"center"}}>

                      Revenue
                     </p>
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent></IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
            <IonRow className="add-card-row">
              <IonCol>
                <IonCard
                  className="card-home"
                  button
                  // onClick={() => handleButtonClick("client")}
                  href="/bottomtabs/addclient"
                >
                  <IonCardHeader>
                    <IonCardTitle>
                      <IonIcon
                        icon={personAdd}
                        style={{
                          fontSize: "35px",
                          marginBottom: "10px",
                          paddingLeft: "30%",
                          paddingTop: "20%",
                        }}
                      />
                      <p style={{textAlign:"center"}}>

                      Add Client
                      </p>
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent></IonCardContent>
                </IonCard>
              </IonCol>
              <IonCol>
                <IonCard
                   className="card-home"
                  button
                  
                >
                  <IonCardHeader>
                    <IonCardTitle>
                      <IonIcon
                        icon={fileTrayFullSharp}
                        style={{
                          fontSize: "35px",
                          marginBottom: "10px",
                          paddingLeft: "30%",
                          paddingTop: "20%",
                        }}
                      />{" "}
                     <p style={{textAlign:"center"}}>

                      Reports
                     </p>
                    </IonCardTitle>
                  </IonCardHeader>
                  <IonCardContent></IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
        
      </IonPage>
    </>
  );
};

export default Home;
