import React, {useState, useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomSelect from "components/CustomSelect/CustomSelect.js";
import CustomTable from "components/CustomTable/CustomTable.js";
import Button from "components/CustomButtons/Button.js";
import CardFooter from "components/Card/CardFooter.js";
import Tasks from "components/Tasks/Tasks.js";
import {checkResponseStatus, parseJSON} from "utils/fetchUtils.js"
const styles = {
  typo: {
    paddingLeft: "25%",
    marginBottom: "40px",
    position: "relative"
  },
  note: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    bottom: "10px",
    color: "#c0c1c2",
    display: "block",
    fontWeight: "400",
    fontSize: "13px",
    lineHeight: "13px",
    left: "0",
    marginLeft: "20px",
    position: "absolute",
    width: "260px"
  },
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  },
};

const useStyles = makeStyles(styles);
export default function IncidentsPage() {
  const classes = useStyles();
  const [tiposIncidentes, setTiposIncidentes] = useState([]);
  const [operationalConsequences, setOperationalConsequences] = useState([]);
  const [indicents, setIndicents] = useState(null);

  const [selectedTipoIncidente, setSelectedTipoIncidente] = useState();
  const checkedIndexes = [];
  const [comments, setComments] = useState();
  const [selectedOperationalConsequences, setSelectedOperationalConsequences] = useState([]);

  async function fetchData(){
    const urls = [
      "http://127.0.0.1:3004/incident_type",
      "http://127.0.0.1:3004/incident_conseq_type",
      "http://127.0.0.1:3004/incident",
    ];

    Promise.all(urls.map(url =>
      fetch(url)
        .then(checkResponseStatus)                 
        .then(parseJSON)
        .catch(error => console.log('Alguma api teve problemas!', error))
    )).
    then(results => {
      setTiposIncidentes(results[0]);
      setOperationalConsequences(results[1]);
      if(results[2].length > 0){
        setIndicents(results[2]);
      }
    });
  }

  const onChangeComments = (value) => {
    setComments(value);
  }

  const onChangeIncidentType = (value) => {
    setSelectedTipoIncidente(value);
  }

  const onChangeOperationalConsequences = (value) => {
    setSelectedOperationalConsequences(value);
  }

  function saveIncident (){
    const requestOptions = {
      method: 'POST',
      mode: "cors",
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        { 
          type: selectedTipoIncidente,
          comments: comments,
          consequence_type: selectedOperationalConsequences,
        })
    }; 

    fetch("http://127.0.0.1:3004/incident", requestOptions)
    .then((response => {
      alert("Enviou!");
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GridContainer>
    <GridItem xs={12} sm={12} md={12}>
      <CustomTabs
          headerColor="primary"
          tabs={[
            {
              tabName: "Reportar incidente",
              tabIcon: "",
              tabContent: (
                <Card>
                  <CardBody>
                    <GridContainer>
                    <GridItem xs={12} sm={12} md={6}>
                      <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                          <CustomSelect 
                            labelText="Tipo de incidente"
                            id="incident-type"
                            onChange={onChangeIncidentType}
                            formControlProps={{
                              fullWidth: true
                            }}
                            options={tiposIncidentes}
                          />
                        </GridItem>
                        <GridItem xs={12} sm={12} md={12}>
                        <CustomInput
                          labelText="Descreva detalhes adicionais do incidente se necessário."
                          id="indicent-comments"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            multiline: true,
                            rows: 5
                          }}
                          onChange={onChangeComments}
                        />
                      </GridItem>
                      </GridContainer>
                    </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                      <InputLabel style={{ color: "#AAAAAA" }}>Consequências Operacionais</InputLabel>
                      <Tasks
                        tasks={operationalConsequences}
                        onChange={onChangeOperationalConsequences}
                        checkedIndexes = {checkedIndexes}
                      />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  <CardFooter>
                    <Button onClick={saveIncident} color="primary">Enviar</Button>
                  </CardFooter>
                </Card>
              )
            },
            {
              tabName: "Histórico",
              tabIcon: "",
              tabContent: (
                <Card>
                  <CardBody>
                    <CustomTable columns={{
                      "id": "ID",
                      "incident_type": "Tipo",
                      "incident_time": "Data", 
                      "comments": "Comentários",
                      }}
                      content={indicents}></CustomTable>
                  </CardBody>
                </Card>
              )
            }
          ]}
        />
    </GridItem>
    <GridItem xs={12} sm={12} md={12}>
    
  </GridItem>
   <GridItem xs={12} sm={12} md={8}>
    
  </GridItem>
  </GridContainer>
  );
}
