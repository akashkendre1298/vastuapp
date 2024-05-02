// import { Redirect, Route } from "react-router-dom";
import {
  // IonApp,
  IonContent,
  // IonRouterOutlet,
  // setupIonicReact,
} from "@ionic/react";
// import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/HomePage/Home";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
// import LoginPage from "./pages/Login/Login";
// import AppRoutes from "./AppRoutes";
// import "./App.css";
// import SignupPage from "./pages/SignUp/SignUp";
// import BottomTabs from "./components/BottomTabs/BottomTabs";
// setupIonicReact();

// const App: React.FC = () => (
//   //   <IonApp>
//   //   <IonReactRouter>
//   //     <IonRouterOutlet>
//   //       {/* <Route exact path="/">
//   //         <LoginPage />
//   //       </Route> */}
//   //       <Route path="/">
//   //       <AppRoutes/>
//   //       </Route>
//   //       {/* <Route path="/">
//   //         {isLoggedIn ? <Home /> : <Redirect to="/login" />}
//   //       </Route> */}
//   //     </IonRouterOutlet>
//   //   </IonReactRouter>
//   // </IonApp>
//   <IonApp>
//     {/* <IonHeader>
//         <IonToolbar>
//           <IonTitle>Mackj</IonTitle>
//         </IonToolbar>
//       </IonHeader> */}

//     <IonReactRouter>
//       <IonRouterOutlet onPointerOverCapture={undefined}>
//         <Route exact path="/login" component={LoginPage} />
//         <Route path="/signup" component={SignupPage} />
//         <Route path="/bottmtab" component={BottomTabs} />
//         <Redirect exact from="/" to="/login" />

//         {/* <Route path="/" component={AppRoutes} /> */}
//       </IonRouterOutlet>
//     </IonReactRouter>
//   </IonApp>
// );

// export default App;

import React from "react";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import AppRoutes from "./AppRoutes";
import BottomTabs from "./components/BottomTabs/BottomTabs";
import SignupPage from './pages/SignUp/SignUp';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/signup" component={SignupPage} />
        <Route path="/bottomtabs" component={BottomTabs} />
        <Redirect exact from="/" to="/login" />
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
