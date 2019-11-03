import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import Loadable from "react-loadable";

import Loader from "components/LayoutComponents/Loader";
import IndexLayout from "layouts";
import NotFoundPage from "pages/404";

const loadable = loader =>
  Loadable({
    loader,
    delay: false,
    loading: () => <Loader />
  });

const routes = [
  // 404
  {
    path: "/404",
    component: loadable(() => import("pages/404.js"))
  },
  // System Pages
  {
    path: "/user/register",
    component: loadable(() => import("pages/user/createUser")),
    exact: true
  },
  {
    path: "/user/login",
    component: loadable(() => import("pages/user/login")),
    exact: true
  },
  {
    path: "/logout",
    component: loadable(() => import("pages/user/logout")),
    exact: true
  },
  {
    path: "/user/forgot",
    component: loadable(() => import("pages/user/forgot")),
    exact: true
  },
  {
    path: "/globals/resetPassword",
    component: loadable(() => import("pages/globalPages/resetPassword"))
  },

  // SUPERADMIN PAGES
  {
    path: "/superAdmin/companies",
    component: loadable(() =>
      import("pages/superAdminPages/companies/dashboard")
    )
  },
  {
    path: "/superAdmin/formCompanies/:id",
    component: loadable(() =>
      import("pages/superAdminPages/companies/cardsForm")
    )
  },

  // COMPANY PAGES
  {
    path: "/company/dashboard",
    component: loadable(() => import("pages/companyPages/dashboard"))
  },
  {
    path: "/company/list",
    component: loadable(() => import("pages/companyPages/companyCrud/list"))
  },
  {
    path: "/company/form/:id",
    component: loadable(() => import("pages/companyPages/companyCrud/Form"))
  },

  // WORKSHOP PAGES
  {
    path: "/workshopPages/dashboard",
    component: loadable(() => import("pages/workshopPages/dashboard"))
  },
  {
    path: "/workshopPages/listMechanics",
    component: loadable(() => import("pages/workshopPages/mechanicCrud/list"))
  },
  {
    path: "/workshopPages/formMechanics/:id",
    component: loadable(() => import("pages/workshopPages/mechanicCrud/Form"))
  },

  // MECHANIC PAGES
  {
    path: "/mechanicPages/dashboard",
    component: loadable(() => import("pages/mechanicPages/dashboard"))
  },

  // CLIENT PAGES
  {
    path: "/clientsPages/dashboard",
    component: loadable(() => import("pages/clientsPages/dashboard"))
  },
  {
    path: "/clientsPages/workshpsList",
    component: loadable(() => import("pages/clientsPages/workshpsList"))
  }
];

class Router extends React.Component {
  render() {
    const { history } = this.props;
    return (
      <ConnectedRouter history={history}>
        <IndexLayout>
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/404" />} />
            {routes.map(route => (
              <Route
                path={route.path}
                component={route.component}
                key={route.path}
                exact={route.exact}
              />
            ))}
            <Route component={NotFoundPage} />
          </Switch>
        </IndexLayout>
      </ConnectedRouter>
    );
  }
}

export default Router;
