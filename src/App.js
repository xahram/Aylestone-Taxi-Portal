import React, { Component } from 'react';
import Layout from './components/UI/Layout';
import { Route, Switch, Redirect } from 'react-router-dom';
import DriverPortal from './components/DriverPortal/DriverPortal';
import EditVehicle from './containers/Cbeckout/ContactData/ContactData';
import Logout from './containers/Auth/Logout/Logout'
import PaymentForm from './containers/Payment/PaymentForm/PaymentForm';
import VehicleInfo from './components/VehicleInfo/VehicleInfo';
import ContactInfo from './components/ContactInfo/ContactInfo';
import Query from './containers/Query/Query';
import News from './containers/NewsUpdates/NewsUpdates';
import TradeNews from './containers/TradeNews/TradeNews';
import FileUpload from './containers/FileUpload/EmailDoc';
import { Elements, StripeProvider } from 'react-stripe-elements';
import TransactionHistory from './components/TransactionHistory/TransactionHistory';

function App() {

  return (

    <div className="App">
      <Layout>
        <Switch>
          <Route path="/" exact component={DriverPortal} />
          <Route path="/vehicle-info" component={VehicleInfo} />
          <Route path="/edit-vehicle" component={EditVehicle} />
          <Route path="/contact-team" component={ContactInfo} />
          <Route path="/news" component={News} />
          <Route path="/trade" component={TradeNews} />
          <Route path="/file-upload" component={FileUpload} />
          <Route path="/query" component={Query} />
          <Route path="/transaction-history" component={TransactionHistory} />
          <Route path="/sign-out" component={Logout} />

          <Route path="/payment" render={() => {
            return (
              <StripeProvider apiKey="">
                <Elements><PaymentForm /></Elements>
              </StripeProvider>
            );
          }} />

          <Redirect to="/" />
        </Switch>
      </Layout>
    </div>

  );
}

export default App;
