import * as React from "react";
import "./App.css";
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
  Link,
} from "react-router-dom";
import Users from "./containers/Users";
import Create from "./components/Create";
import EditUser from "./components/Edit";

class App extends React.Component<RouteComponentProps<any>> {
  public render() {
    return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to={"/"}> Home </Link>
            </li>

            <li>
              <Link to={"/create"}> Create User </Link>
            </li>
          </ul>
        </nav>

        <Switch>
          <Route path={"/"} exact component={Users} />
          <Route path={"/create"} exact component={Create} />
          <Route path={"/edit/:id"} exact component={EditUser} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
