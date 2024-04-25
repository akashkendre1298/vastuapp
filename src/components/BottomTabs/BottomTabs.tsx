import React from 'react';
import { IonReactRouter } from '@ionic/react-router';

import { Route, Redirect } from 'react-router';

import { playCircle, radio, library, search } from 'ionicons/icons';
import Home from '../../pages/HomePage/Home';
import { IonIcon, IonLabel, IonRouterOutlet, IonTabBar, IonTabButton, IonTabs } from '@ionic/react';
import AddCasePage from '../../pages/Cases/AddCases';
import "./BottomTabs.css"


function BottomTabs() {
  return (
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Redirect exact path="/home" to="/home" />
          <Redirect exact path="/cases" to="/cases" />
          {/*
          Use the render method to reduce the number of renders your component will have due to a route change.

          Use the component prop when your component depends on the RouterComponentProps passed in automatically.
        */}
          <Route path="/home" render={() => <Home />} exact={true} />
          <Route path="/cases" render={() => <AddCasePage />} />
          {/* <Route path="/cases" render={() =><AddCasePage/>} exact={true} /> */}
          {/* <Route path="/library" render={() => <LibraryPage />} exact={true} />
          <Route path="/search" render={() => <SearchPage />} exact={true} /> */}
        </IonRouterOutlet>

        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon icon={playCircle} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>

          <IonTabButton tab="metting" href="/upcomingmeeting">
            <IonIcon icon={radio} />
            <IonLabel>Meeting</IonLabel>
          </IonTabButton>

          <IonTabButton tab="product" href="/viewproduct">
            <IonIcon icon={library} />
            <IonLabel>Product</IonLabel>
          </IonTabButton>

          <IonTabButton tab="profile" href="/profile">
            <IonIcon icon={search} />
            <IonLabel>Profile</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  );
}
export default BottomTabs;