import React from "react";
import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Switch, Redirect } from "react-router-dom";

import Home from "./pages/HomePage/Home";
import LoginPage from "./pages/Login/Login";
import BottomTabs from "./components/BottomTabs/BottomTabs";
import SignupPage from "./pages/SignUp/SignUp";

// Importing CSS files
import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
// import "./theme/variables.css";
import ForgotPasswordPage from "./pages/Login/ForgetPasswordPage";

setupIonicReact();

const App = () => (
  <IonApp>
    <IonReactRouter>
      <IonRouterOutlet>
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <Route path="/bottomtabs" component={BottomTabs} />
          <Route exact path="/forgot-password" component={ForgotPasswordPage} />
          <Redirect to="/login" />
        </Switch>
      </IonRouterOutlet>
    </IonReactRouter>
  </IonApp>
);

export default App;
