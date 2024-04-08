import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/HomePage/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import LoginPage from './pages/Login/Login';
import SignupPage from './pages/SignUp/SignUp';
import AddExecutive from './pages/Executive/AddExecutive';
import Client from './pages/Client/Client';
import ViewExecutive from './pages/Executive/ViewExecutive';
import ExecutiveDetails from './pages/Executive/ExecutiveDetails';

setupIonicReact();

const AppRoutes: React.FC = () => (
  <IonApp>
  <IonReactRouter>
    <IonRouterOutlet>
      <Route exact path="/"> 
        <LoginPage />
      </Route>
      <Route exact path="/signup"> 
        <SignupPage/>
      </Route>
      <Route exact path="/home"> 
      <Home/>
      </Route>
      <Route exact path="/executive">
        <AddExecutive/>
      </Route>
      <Route exact path="/viewexecutive">
        <ViewExecutive/>
      </Route>
      {/* <Route
          exact
          path="/executive/:id" 
          component={ExecutiveDetails}
        >
          </Route> */}

      <Route exact path="/client">
        <Client/>
      </Route>
      {/* <Route path="/">
        {isLoggedIn ? <Home /> : <Redirect to="/login" />} 
      </Route> */}
    </IonRouterOutlet>
  </IonReactRouter>
</IonApp>
);

export default AppRoutes;
