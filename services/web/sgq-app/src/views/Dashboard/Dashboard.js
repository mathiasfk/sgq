import React, {useState, useEffect} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import Warning from "@material-ui/icons/Warning";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import Update from "@material-ui/icons/Update";
import ArrowUpward from "@material-ui/icons/ArrowUpward";
import AccessTime from "@material-ui/icons/AccessTime";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Cloud from "@material-ui/icons/Cloud";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Tasks from "components/Tasks/Tasks.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import {checkResponseStatus, parseJSON} from "utils/fetchUtils.js"

import { bugs, website, server } from "variables/general.js";

import {
  incidentesChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function Dashboard() {
  const classes = useStyles();

  const [diasSemIncidentes, setDiasSemIncidentes] = useState(10);
  const [numeroIncidentes, setNumeroIncidentes] = useState(0);
  const [dataChartIncidentes, setDataChartIncidentes] = useState({
    labels: [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "Mai",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ],
  series: [[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]});
  const [dateNow, setDateNow] = useState("");

  async function fetchData(){
    const urls = [
      "http://127.0.0.1:3004/last_incident",
      "http://127.0.0.1:3004/incidents_number",
      "http://127.0.0.1:3004/incidents_per_month",
    ];

    Promise.all(urls.map(url =>
      fetch(url)
        .then(checkResponseStatus)                 
        .then(parseJSON)
        .catch(error => console.log('Alguma api teve problemas!', error))
    )).
    then(results => {
      let dateNow = new Date();
      if(results && results[0].length > 0){
        let dataUltimoIncidente = new Date(results[0][0].incident_time);
        let difDates = dateNow.getTime() - dataUltimoIncidente.getTime(); 
  
        setDiasSemIncidentes(Math.floor(difDates / (1000 * 3600 * 24)));
      }

      if(results[1]){
        setNumeroIncidentes(results[1][0].total);
      }

      if(results[2]){
        let incidentsCount = results[2];
        for(let i=0; i < incidentsCount.length; i++){
          dataChartIncidentes.series[0][incidentsCount[i].mes-1] = incidentsCount[i].total;
        }
        setDataChartIncidentes(dataChartIncidentes);
      }

      setDateNow(dateNow.toLocaleDateString() + " " + dateNow.getHours().toString().padStart(2,0) + ":" + dateNow.getMinutes().toString().padStart(2,0)  + ":" + dateNow.getSeconds().toString().padStart(2,0));
    });
  }
  

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <div>
      <GridContainer>
      <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Dias sem incidentes</p>
              <h3 className={classes.cardTitle}>{diasSemIncidentes}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Ultima atualização {dateNow}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Quantidade de Recalls</p>
              <h3 className={classes.cardTitle}>2</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <DateRange />
                Ano de 2020
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="danger" stats icon>
              <CardIcon color="danger">
                <Icon>info_outline</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Incidentes em aberto</p>
              <h3 className={classes.cardTitle}>{numeroIncidentes}</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <LocalOffer />
                Ultima atualização {dateNow}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
       {/*<GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="warning" stats icon>
              <CardIcon color="warning">
                <Icon>content_copy</Icon>
              </CardIcon>
              <p className={classes.cardCategory}>Used Space</p>
              <h3 className={classes.cardTitle}>
                49/50 <small>GB</small>
              </h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Danger>
                  <Warning />
                </Danger>
                <a href="#pablo" onClick={e => e.preventDefault()}>
                  Get more space
                </a>
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={3}>
          <Card>
            <CardHeader color="info" stats icon>
              <CardIcon color="info">
                <Accessibility />
              </CardIcon>
              <p className={classes.cardCategory}>Followers</p>
              <h3 className={classes.cardTitle}>+245</h3>
            </CardHeader>
            <CardFooter stats>
              <div className={classes.stats}>
                <Update />
                Just Updated
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      */}
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={4}>
          <Card chart>
            <CardHeader color="danger">
              <ChartistGraph
                className="ct-chart"
                data={dataChartIncidentes}
                type="Bar"
                options={incidentesChart.options}
                responsiveOptions={incidentesChart.responsiveOptions}
                listener={incidentesChart.animation}
              />
            </CardHeader>
            <CardBody>
              <h4 className={classes.cardTitle}>Incidentes</h4>
              <p className={classes.cardCategory}>Numero de incidentes registrados por mes</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Ultima atualização {dateNow}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
          <CustomTabs
            title="Tasks:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Bugs",
                tabIcon: BugReport,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0, 3]}
                    tasksIndexes={[0, 1, 2, 3]}
                    tasks={bugs}
                  />
                )
              },
              {
                tabName: "Website",
                tabIcon: Code,
                tabContent: (
                  <Tasks
                    checkedIndexes={[0]}
                    tasksIndexes={[0, 1]}
                    tasks={website}
                  />
                )
              },
              {
                tabName: "Server",
                tabIcon: Cloud,
                tabContent: (
                  <Tasks
                    checkedIndexes={[1]}
                    tasksIndexes={[0, 1, 2]}
                    tasks={server}
                  />
                )
              }
            ]}
          />
        </GridItem>
        <GridItem xs={12} sm={12} md={6}>
          <Card>
            <CardHeader color="warning">
              <h4 className={classes.cardTitleWhite}>Employees Stats</h4>
              <p className={classes.cardCategoryWhite}>
                New employees on 15th September, 2016
              </p>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="warning"
                tableHead={["ID", "Name", "Salary", "Country"]}
                tableData={[
                  ["1", "Dakota Rice", "$36,738", "Niger"],
                  ["2", "Minerva Hooper", "$23,789", "Curaçao"],
                  ["3", "Sage Rodriguez", "$56,142", "Netherlands"],
                  ["4", "Philip Chaney", "$38,735", "Korea, South"]
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
