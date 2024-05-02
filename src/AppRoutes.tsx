// // import { Redirect, Route } from "react-router-dom";
// import { IonApp, IonRouterOutlet, setupIonicReact } from "@ionic/react";
// import { IonReactRouter } from "@ionic/react-router";
// // import Home from "./pages/HomePage/Home";

// /* Core CSS required for Ionic components to work properly */
// import "@ionic/react/css/core.css";

// /* Basic CSS for apps built with Ionic */
// import "@ionic/react/css/normalize.css";
// import "@ionic/react/css/structure.css";
// import "@ionic/react/css/typography.css";

// /* Optional CSS utils that can be commented out */
// import "@ionic/react/css/padding.css";
// import "@ionic/react/css/float-elements.css";
// import "@ionic/react/css/text-alignment.css";
// import "@ionic/react/css/text-transformation.css";
// import "@ionic/react/css/flex-utils.css";
// import "@ionic/react/css/display.css";

// /* Theme variables */
// import "./theme/variables.css";
// // import LoginPage from "./pages/Login/Login";
// // import SignupPage from "./pages/SignUp/SignUp";
// // import AddExecutive from "./pages/Executive/AddExecutive";
// // import Client from "./pages/Client/Client";
// // import ViewExecutive from "./pages/Executive/ViewExecutive";
// // import ExecutiveDetails from "./pages/Executive/ExecutiveDetails";
// // import AddCasePage from "./pages/Cases/AddCases";
// // import AddMeeting from "./pages/Meetings/AddMeeting";
// // import UpComingMeetings from "./pages/Meetings/UpComingMeetings";
// // import IndividualMeeting from "./pages/Meetings/IndividualMeeting";
// // import ViewProduct from "./pages/AddProduct/ViewProduct";
// // import AddProduct from "./pages/AddProduct/AddProduct";
// // import ProfilePage from "./pages/Profile/Profile";
// // import Revenue from "./pages/Revenue/Revenue";
// // import ExecutiveProfile from "./pages/Executive/ExecutiveProfile";
// // import IndividualClients from "./pages/Executive/IndividualClients";
// // import ViewCasesPage from "./pages/Cases/ViewCases";

// // setupIonicReact();

// // const AppRoutes: React.FC = () => (
// //   <IonApp>
// //     <IonReactRouter>
// //       <IonRouterOutlet>
// //         <Route exact path="/">
// //           <LoginPage />
// //         </Route>
// //         <Route exact path="/signup">
// //           <SignupPage />
// //         </Route>
// //         <Route exact path="/home">
// //           <Home />
// //         </Route>
// //         <Route exact path="/executive">
// //           <AddExecutive />
// //         </Route>
// //         <Route exact path="/viewexecutive">
// //           <ViewExecutive />
// //         </Route>
// //         {/* <Route
// //           exact
// //           path="/executive/:id" 
// //           component={ExecutiveDetails}
// //         >
// //           </Route> */}

// //         <Route exact path="/client">
// //           <Client />
// //         </Route>

// //         <Route exact path="/cases">
// //           <AddCasePage />
// //         </Route>
// //         <Route exact path="/viewcases">
// //           < ViewCasesPage/>
// //         </Route>

// //         <Route exact path="/upcomingmeeting">
// //           <UpComingMeetings />
// //         </Route>
// //         <Route exact path="/meeting">
// //           <AddMeeting />
// //         </Route>

// //         <Route exact path ="/individualmeeting">
// //        <IndividualMeeting/>
// //         </Route>

// //         <Route exact path="/viewproduct">
// //           <ViewProduct />
// //         </Route>
// //         <Route exact path="/product">
// //           <AddProduct />
// //         </Route>

// //         <Route exact path="/profile">
// //           <ProfilePage />
// //         </Route>
// //         <Route exact path="/executiveprofile">
// //           <ExecutiveProfile/>
// //         </Route>

// //         <Route exact path="/individualclients">
// //          <IndividualClients/>
// //         </Route>


// //         <Route exact path="/revenue">
// //           <Revenue />
// //         </Route>
// //         {/* <Route path="/">
// //         {isLoggedIn ? <Home /> : <Redirect to="/login" />} 
// //       </Route> */}
// //       </IonRouterOutlet>
// //     </IonReactRouter>
// //   </IonApp>
// // );

// // export default AppRoutes;



// import React from "react";
// import { Route } from "react-router-dom";
// import Home from "./pages/HomePage/Home";
// import AddCasePage from "./pages/Cases/AddCases";
// import UpComingMeetings from "./pages/Meetings/UpComingMeetings";
// import ViewProduct from "./pages/AddProduct/ViewProduct";
// import ProfilePage from "./pages/Profile/Profile";
// import Revenue from "./pages/Revenue/Revenue";
// import SignupPage from "./pages/SignUp/SignUp";
// import AddExecutive from "./pages/Executive/AddExecutive";
// import Client from "./pages/Client/Client";
// import ViewExecutive from "./pages/Executive/ViewExecutive";
// import ExecutiveDetails from "./pages/Executive/ExecutiveDetails";
// import AddMeeting from "./pages/Meetings/AddMeeting";
// import IndividualMeeting from "./pages/Meetings/IndividualMeeting";
// import ExecutiveProfile from "./pages/Executive/ExecutiveProfile";
// import IndividualClients from "./pages/Executive/IndividualClients";
// import ViewCasesPage from "./pages/Cases/ViewCases";
// import AddProduct from "./pages/AddProduct/AddProduct";

// const AppRoutes: React.FC = () => (
//   <>
//     <Route exact path="/app/signup" component={SignupPage} />
//     <Route exact path="/app/executive" component={AddExecutive} />
//     <Route exact path="/app/viewexecutive" component={ViewExecutive} />
//     <Route exact path="/app/executive/:id" component={ExecutiveDetails} />
//     <Route exact path="/app/client" component={Client} />
//     <Route exact path="/app/cases" component={AddCasePage} />
//     <Route exact path="/app/viewcases" component={ViewCasesPage} />
//     <Route exact path="/app/upcomingmeeting" component={UpComingMeetings} />
//     <Route exact path="/app/meeting" component={AddMeeting} />
//     <Route exact path="/app/individualmeeting" component={IndividualMeeting} />
//     <Route exact path="/app/viewproduct" component={ViewProduct} />
//     <Route exact path="/app/product" component={AddProduct} />
//     <Route exact path="/app/profile" component={ProfilePage} />
//     <Route exact path="/app/executiveprofile" component={ExecutiveProfile} />
//     <Route exact path="/app/individualclients" component={IndividualClients} />
//     <Route exact path="/app/revenue" component={Revenue} />
//     <Route exact path="/app/home" component={Home} /> {/* Added route for Home */}

//   </>
// );

// export default AppRoutes;
