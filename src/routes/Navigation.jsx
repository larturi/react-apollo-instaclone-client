import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import routes from './routes';
import { map } from 'lodash';

const Navigation = () => {
   return (
      <Router>
         <Switch>
            {map(routes, (route, key) => (
               <Route
                  key={key}
                  path={route.path}
                  exact={route.exact}
                  render={(props) => (
                     <route.layout>
                        <route.component {...props} />
                     </route.layout>
                  )}
               />
            ))}
         </Switch>
      </Router>
   );
};

export default Navigation;
