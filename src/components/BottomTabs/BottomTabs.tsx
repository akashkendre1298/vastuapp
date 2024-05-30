import React from "react";
import { IonReactRouter } from "@ionic/react-router";

import { Route, Redirect } from "react-router";

import {
  playCircle,
  radio,
  library,
  search,
  albumsOutline,
  homeOutline,
  phonePortrait,
  settingsSharp,
} from "ionicons/icons";
import Home from "../../pages/HomePage/Home";
import {
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from "@ionic/react";
import AddCasePage from "../../pages/Cases/AddCases";
import "./BottomTabs.css";
import UpComingMeetings from "../../pages/Meetings/UpComingMeetings";
import ProfilePage from "../../pages/Profile/Profile";
import ViewProduct from "../../pages/AddProduct/ViewProduct";
import ViewCasesPage from "../../pages/Cases/ViewCases";

import ViewExecutive from "../../pages/Executive/ViewExecutive";
import Revenue from "./../../pages/Revenue/Revenue";
import Client from "./../../pages/Client/Client";
import AddExecutive from "../../pages/Executive/AddExecutive";
import IndividualMeeting from './../../pages/Meetings/IndividualMeeting';
import AddProduct from './../../pages/AddProduct/AddProduct';
import AddMeeting from './../../pages/Meetings/AddMeeting';
import IndividualClients from "../../pages/Executive/IndividualClients";
import viewClients from "../../pages/Executive/ViewClients";
import ParticularCase from "../../pages/Cases/ParticularCase";
import ReportPage from "../../pages/Reports/Reports";
import ViewClientPage from "../../pages/Client/ViewClient";

function BottomTabs() {
  return (
    // <IonReactRouter>
    //   <IonTabs>
    //     <IonRouterOutlet
    //       onPointerOverCapture={undefined}
    //       onPointerMoveCapture={undefined}
    //     >
    //       <Redirect exact from="/bottomtab" to="/home" />
    //       {/* <Redirect exact path="/cases" to="/cases" /> */}
    //       {/*
    //       Use the render method to reduce the number of renders your component will have due to a route change.
    //       Use the component prop when your component depends on the RouterComponentProps passed in automatically.
    //     */}
    //       {/* <Route path="/home" render={() => <Home />} exact={true} /> */}

    //       <Route path="/home" component={Home} exact={true} />
    //       <Route path="/cases" component={AddCasePage} />
    //       <Route path="/upcomingmeeting" component={UpComingMeetings} />

    //       {/* <Route path="/cases" render={() => <AddCasePage />} /> */}
    //       {/* <Route path="/cases" render={() => <AddCasePage/>} exact={true} /> */}
    //       {/* <Route path="/library" render={() => <LibraryPage />} exact={true} />
    //       <Route path="/search" render={() => <SearchPage />} exact={true} /> */}
    //     </IonRouterOutlet>

    //     <IonTabBar slot="bottom">
    //       <IonTabButton tab="home" href="/home">
    //         <IonIcon icon={playCircle} />
    //         <IonLabel>Home</IonLabel>
    //       </IonTabButton>

    //       <IonTabButton tab="metting" href="/upcomingmeeting">
    //         <IonIcon icon={radio} />
    //         <IonLabel>Meeting</IonLabel>
    //       </IonTabButton>

    //       <IonTabButton tab="product" href="/viewproduct">
    //         <IonIcon icon={library} />
    //         <IonLabel>Product</IonLabel>
    //       </IonTabButton>

    //       <IonTabButton tab="profile" href="/profile">
    //         <IonIcon icon={search} />
    //         <IonLabel>Profile</IonLabel>
    //       </IonTabButton>
    //     </IonTabBar>
    //   </IonTabs>
    // </IonReactRouter>

    <>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact from="/bottomtabs" to="/bottomtabs/home" />
          {/* Routes for tablist */}
          <Route path="/bottomtabs/home" component={Home} />
          <Route
            path="/bottomtabs/upcomingmeetings"
            component={UpComingMeetings}
          />
          <Route path="/bottomtabs/viewproduct" component={ViewProduct} />
          <Route path="/bottomtabs/profile" component={ProfilePage} />

          {/* Another Pages routes */}
          <Route path="/bottomtabs/viewcases" component={ViewCasesPage} />
          <Route path="/bottomtabs/addcases" component={AddCasePage} />
          <Route path="/bottomtabs/viewexecutive" component={ViewExecutive} />
          
          <Route path="/bottomtabs/revenue" component={Revenue} />
          <Route path="/bottomtabs/addclient" component={Client} />
          <Route path="/bottomtabs/addexecutive" component={AddExecutive} />
          <Route path="/bottomtabs/addmeetings" component={AddMeeting} />
          <Route path="/bottomtabs/addproduct" component={AddProduct} />
          <Route path="/bottomtabs/individualclients/:executiveId" component={IndividualClients}/>
          <Route path="/bottomtabs/client/:executiveId" component={viewClients} />
          <Route path="/bottomtabs/particularCase/:caseId" component={ParticularCase}/>
          <Route path="/bottomtabs/individualmeeting/:meetingId" component={IndividualMeeting} />
          <Route path="/bottomtabs/reports" component={ReportPage} />
          <Route path="/bottomtabs/viewclients" component={ViewClientPage} />
      
    

        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/bottomtabs/home">
            <IonIcon icon={homeOutline} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton
            tab="upcomingmeeting"
            href="/bottomtabs/upcomingmeetings"
          >
            <IonIcon icon={albumsOutline} />
            <IonLabel>Upcoming Meetings</IonLabel>
          </IonTabButton>
          <IonTabButton tab="viewproduct" href="/bottomtabs/viewproduct">
            <IonIcon icon={settingsSharp} />
            <IonLabel>View Product</IonLabel>
          </IonTabButton>{" "}
          <IonTabButton tab="profile" href="/bottomtabs/profile">
            <IonIcon icon={phonePortrait} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </>
  );
}
export default BottomTabs;
