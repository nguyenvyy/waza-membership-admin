import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import 'antd/dist/antd.css';

import './App.css';
import { routes } from './config/route-config'
import { RouteWithSubRoutes } from './components/CustomRoute/RouteWithSubRoutes/RouteWithSubRoutes';
import { PageLoading } from './components/PageLoading/PageLoading';

function App() {
  // const [fakeAuthen, setFakeAuthen] = React.useState(false);
  return (
    <div className="App">
      <Router>
        <Suspense fallback={<PageLoading />}>
          <Switch>
            {routes.map((route, index) => (
              <RouteWithSubRoutes key={index} {...route} />
            ))}
          </Switch>
        </Suspense>
      </Router>
    </div>
  );
}

export default App;
