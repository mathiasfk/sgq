import React, {useState, useEffect} from "react";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import Store from "@material-ui/icons/Store";
import DateRange from "@material-ui/icons/DateRange";
import LocalOffer from "@material-ui/icons/LocalOffer";
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardIcon from "components/Card/CardIcon.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import {checkResponseStatus, parseJSON} from "utils/fetchUtils.js";

import {
  incidentesChart,
} from "variables/charts.js";

import styles from "assets/jss/material-dashboard-react/views/dashboardStyle.js";

const useStyles = makeStyles(styles);

export default function BusinessIntelligence() {
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
      "http://127.0.0.1:3000/last_incident",
      "http://127.0.0.1:3000/incidents_number",
      "http://127.0.0.1:3000/incidents_per_month",
    ];

    Promise.all(urls.map(url =>
      fetch(url)
        .then(checkResponseStatus)
        .then(parseJSON)
        .catch(error => console.log('Alguma api teve problemas!', error))
    )).
    then(results => {
      let jsDateNow = new Date();
      if(results && results[0] && results[0].length > 0){
        let dataUltimoIncidente = new Date(results[0][0].incident_time);
        let difDates = jsDateNow.getTime() - dataUltimoIncidente.getTime(); 
  
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

      setDateNow(jsDateNow.toLocaleDateString() + " " + jsDateNow.getHours().toString().padStart(2,0) + ":" + jsDateNow.getMinutes().toString().padStart(2,0)  + ":" + jsDateNow.getSeconds().toString().padStart(2,0));
    });
  }
  

  useEffect(() => {
    fetchData();
  }, []);



  return (
    <div>
      <GridContainer>
      <GridItem xs={12} sm={6} md={4}>
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
                Última atualização {dateNow}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
        <GridItem xs={12} sm={6} md={4}>
          <Card>
            <CardHeader color="success" stats icon>
              <CardIcon color="success">
                <Store />
              </CardIcon>
              <p className={classes.cardCategory}>Recalls</p>
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
        <GridItem xs={12} sm={6} md={4}>
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
                Última atualização {dateNow}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
      <GridContainer>
        <GridItem xs={12} sm={12} md={6}>
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
              <p className={classes.cardCategory}>Número de incidentes registrados por mês</p>
            </CardBody>
            <CardFooter chart>
              <div className={classes.stats}>
                <AccessTime /> Última atualização {dateNow}
              </div>
            </CardFooter>
          </Card>
        </GridItem>
      </GridContainer>
    </div>
  );
}
