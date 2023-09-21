
// Denbot Admin layouts
import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Preview from "layouts/preview";
import Nodes from "layouts/nodes";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Profile from "layouts/profile";
import Builder from "layouts/builder";
import Test from "layouts/test";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";

import Princing from "layouts/billing/Pages/Princing";
import Stripe from "layouts/billing/Pages/Stripe";

// @mui icons
import Icon from "@mui/material/Icon";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  {
    type: "collapse",
    name: "Dashboard",
    key: "Nodes",
    icon: <Icon fontSize="small">preview</Icon>,
    route: "/nodes",
    component: <Nodes />,
  },
  {
    type: "collapse",
    name: "Bot Flow Design",
    key: "builder",
    icon: <Icon fontSize="small">account_tree</Icon>,
    route: "/builder",
    component: <Builder />,
  },
  {
    type: "collapse",
    name: "Preview",
    key: "Preview",
    icon: <Icon fontSize="small">preview</Icon>,
    route: "/preview/:id",
    component: <Preview />,
  },
  {
    type: "collapse",
    name: "Tables",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/tables",
    component: <Tables />,
  },
  {
    type: "collapse",
    name: "Princing",
    key: "billing",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/billing",
    component: <Billing />,
  },
  {
    type: "collapse",
    name: "Notifications",
    key: "notifications",
    icon: <Icon fontSize="small">notifications</Icon>,
    route: "/notifications",
    component: <Notifications />,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "collapse",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
  {
    type: "collapse",
    name: "Billing-Princing",
    key: "billing-princing",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/billing/princing",
    component: <Princing />,
  },
  {
    type: "collapse",
    name: "Billing-Stripe",
    key: "billing-stripe",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/billing/stripe",
    component: <Stripe />,
  },
  {
    type: "collapse",
    name: "Test",
    key: "test",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/test/:id",
    component: <Test />,
  },
];

export default routes;
