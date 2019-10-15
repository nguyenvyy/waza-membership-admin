import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import 'antd/dist/antd.css';

import './App.scss';
import { routes } from './config/route-config'
import { PageLoading } from './components/common/PageLoading/PageLoading';
import { configStore } from './redux/store/store';
import { RouteWithSubRoutes } from './routes/RouteWithSubRoutes';

const store = configStore()

function App() {
  // const [fakeAuthen, setFakeAuthen] = React.useState(false);
  return (
    <div className="App">
      <Provider store={store}>
        <Router>
          <Suspense fallback={<PageLoading />}>
            <Switch>
              {routes.map((route, index) => (
                <RouteWithSubRoutes key={index} {...route} />
              ))}
            </Switch>
          </Suspense>
        </Router>
      </Provider>
    </div>
  );
}

export default App;
