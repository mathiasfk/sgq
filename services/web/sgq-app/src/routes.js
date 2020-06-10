/*!

=========================================================
* Material Dashboard React - v1.8.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/material-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
// core components/views for Admin layout
import BusinessIntelligencePage from "views/BusinessIntelligence/BusinessIntelligence.js";
import ProcessesPage from "views/Processes/Processes.js";
import IncidentsPage from "views/Incidents/Incidents";
import NonConformitiesPage from "views/NonConformities/NonConformities";
import DivulgationPage from "views/Divulgation/Divulgation";
import CompliancePage from "views/Compliance/Compliance";

const dashboardRoutes = [
  {
    path: "/bi",
    name: "Business Intelligence",
    icon: Dashboard,
    component: BusinessIntelligencePage,
    layout: "/admin",
    group: "all",
  },
  {
    path: "/processes",
    name: "Processos Automotivos",    
    icon: "content_paste",
    component: ProcessesPage,
    layout: "/admin",
    group: "all",
  },
  {
    path: "/incidents",
    name: "Incidentes e Problemas",    
    icon: LibraryBooks,
    component: IncidentsPage,
    layout: "/admin",
    group: "all",
  },
  {
    path: "/non-conformities",
    name: "Não Conformidades",    
    icon: LibraryBooks,
    component: NonConformitiesPage,
    layout: "/admin",
    group: "all",
  },
  {
    path: "/divulgation",
    name: "Divulgação e Transparência",    
    icon: LibraryBooks,
    component: DivulgationPage,
    layout: "/admin",
    group: "all",
  },
  {
    path: "/compliance",
    name: "Compliance",    
    icon: LibraryBooks,
    component: CompliancePage,
    layout: "/admin",
    group: "admin",
  },
];

export default dashboardRoutes;
