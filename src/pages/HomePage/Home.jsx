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

  const Report = () => {
    // Get the user data from local storage
    const userData = localStorage.getItem("userData");

    if (!userData) {
      // If no user data found, user is not logged in
      alert("You must log in first");
      return;
    }

    // Parse the userData to get the token
    const { token } = JSON.parse(userData);

    if (!token) {
      // If no token found, show login alert
      alert("You must log in first");
      return;
    }

    // If token exists, navigate to the report page
    window.location.href = "http://reports.piyushshivkumarshhri.com/";

    closeModal();
  };

  return (
    <>
      <IonPage
        style={{ backgroundColor: "#f0f0f0" }}
        className="home-page-main"
      >
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
              style={{ paddingRight: "10px" }}
            />{" "}
            {/* Replace with your logo path */}
          </IonToolbar>
        </IonHeader>
        <IonContent style={{ paddingTop: "100px", backgroundColor: "#f0f0f0" }}>
          <IonGrid
            style={{
              height: "84vh",
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
                  <IonCardHeader
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IonCardTitle
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IonIcon
                        icon={cashSharp}
                        style={{
                          fontSize: "35px",
                          marginBottom: "10px",
                        }}
                      />
                      <p style={{ textAlign: "center" }}>Executives</p>
                    </IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>

              <IonCol>
                <IonCard
                  className="card-home"
                  button
                  href="/bottomtabs/viewcases"
                >
                  <IonCardHeader
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IonCardTitle
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IonIcon
                        icon={folderOpen}
                        style={{
                          fontSize: "35px",
                          marginBottom: "10px",
                        }}
                      />
                      <p style={{ textAlign: "center" }}>Cases</p>
                    </IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>

              <IonCol>
                <IonCard
                  className="card-home"
                  button
                  href="/bottomtabs/upcomingmeetings"
                >
                  <IonCardHeader
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IonCardTitle
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IonIcon
                        icon={calendar}
                        style={{
                          fontSize: "35px",
                          marginBottom: "10px",
                        }}
                      />
                      <p style={{ textAlign: "center" }}>Meetings</p>
                    </IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>

              <IonCol>
                <IonCard
                  className="card-home"
                  button
                  href="/bottomtabs/revenue"
                >
                  <IonCardHeader
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IonCardTitle
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IonIcon
                        icon={barChartSharp}
                        style={{
                          fontSize: "35px",
                          marginBottom: "10px",
                        }}
                      />
                      <p style={{ textAlign: "center" }}>Revenue</p>
                    </IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            </IonRow>

            <IonRow className="add-card-row">
              <IonCol>
                <IonCard
                  className="card-home"
                  button
                  href="/bottomtabs/viewclients"
                >
                  <IonCardHeader
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IonCardTitle
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IonIcon
                        icon={personAdd}
                        style={{
                          fontSize: "35px",
                          marginBottom: "10px",
                        }}
                      />
                      <p style={{ textAlign: "center" }}>Clients</p>
                    </IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>

              <IonCol>
                <IonCard className="card-home" button onClick={Report}>
                  <IonCardHeader
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <IonCardTitle
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <IonIcon
                        icon={fileTrayFullSharp}
                        style={{
                          fontSize: "35px",
                          marginBottom: "10px",
                        }}
                      />
                      <p style={{ textAlign: "center" }}>Reports</p>
                    </IonCardTitle>
                  </IonCardHeader>
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
