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
import status from "variables/incidents.js"
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
  const [tiposIncidentes, setTiposIncidentes] = useState([]);
  const [operationalConsequences, setOperationalConsequences] = useState([]);
  const [indicents, setIndicents] = useState(null);

  const [selectedTipoIncidente, setSelectedTipoIncidente] = useState();
  const [selectedStatus, setSelectedStatus] = useState();
  const checkedIndexes = [];
  const [comments, setComments] = useState();
  const [selectedOperationalConsequences, setSelectedOperationalConsequences] = useState([]);
  const status = [
    {id: "Pendente", name: "Pendente"}, 
    {id: "Em Andamento", name: "Em Andamento"},
    {id: "Finalizado", name: "Finalizado"},
  ];
  const tabsRef = React.createRef();
  let [editionMode, setEditionMode] = useState(false);
  let [currentIncidentId, setCUrrentIncidentId] = useState(null);
  let [incidentTabName, setIncidentTabName] = useState("Registrar Incidente");

  async function fetchData(){
    const urls = [
      "http://127.0.0.1:3000/incident_type",
      "http://127.0.0.1:3000/incident_conseq_type",
      "http://127.0.0.1:3000/incident",
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

  const onChangeStatus = (value) => {
    setSelectedStatus(value);
  }

  const onChangeOperationalConsequences = (value) => {
    setSelectedOperationalConsequences(value);
  }

  const doIncidentFetch = (url, requestOpt, msgResponse) => {
    return fetch(url, requestOpt)
    .then((response => {
      if(msgResponse.length > 0){
        alert(msgResponse);
      }

      //recarrega a lista de incidentes
      fetch("http://127.0.0.1:3000/incident")
        .then(checkResponseStatus)                 
        .then(parseJSON)
        .then(incidentes => setIndicents(incidentes))
    }));
  }

  const onEditIncident = (value) => {
    const incidenteTab = document.getElementsByClassName("MuiTab-wrapper")[0];
    //seta o foco para a tab de infos de incidentes
    incidenteTab.click();

    //altera o nome da tab
    setIncidentTabName("Atualizar incidente");

    setCUrrentIncidentId(value[0]);

    setSelectedTipoIncidente(value[1]);
    setSelectedStatus(value[3]);
    setComments(value[4]);

    //esconde painel de consequencias, pois não sera possivel edita-la
    setEditionMode(true);
  }

  const onDeleteIncident = (value) => {
    const incidentId = value[0];

    const requestOptions = {
      method: 'DELETE',
      mode: "cors",
       headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }; 

    var justificativa = prompt("Informe uma justificativa", "");
    if(justificativa != null && justificativa != ""){
      fetch("http://127.0.0.1:3000/incident_conseq/" + incidentId, requestOptions)
        .then(() => console.log("Consequencias de incidentes removidas."));
      doIncidentFetch("http://127.0.0.1:3000/incident/" + incidentId, requestOptions, "Incidente removido com sucesso!");
    }
  }

  function updateIncident(){
    const requestOptions = {
      method: 'PUT',
      mode: "cors",
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
      { 
        type: selectedTipoIncidente,
        comments: comments,
        status: selectedStatus,
      })
    }; 

    doIncidentFetch("http://127.0.0.1:3000/incident/" + currentIncidentId, 
    requestOptions, 
    "Incidente atualizado com sucesso!")
    .then(() => {
      setIncidentTabName("Registrar incidente");
      setEditionMode(false);
    });
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
        status: selectedStatus,
      })
    }; 

    doIncidentFetch("http://127.0.0.1:3000/incident", requestOptions, "Incidente cadastrado com sucesso!");
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GridContainer>
    <GridItem xs={12} sm={12} md={12}>
      <CustomTabs
          ref={tabsRef}
          headerColor="primary"
          tabs={[
            {
              tabName: incidentTabName,
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
                              selectedValue={selectedTipoIncidente}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <CustomSelect 
                              labelText="Status"
                              id="incident-status"
                              onChange={onChangeStatus}
                              formControlProps={{
                                fullWidth: true
                              }}
                              options={status}
                              selectedValue={selectedStatus}
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
                            value={comments}
                          />
                        </GridItem>
                        </GridContainer>
                      </GridItem>
                      {editionMode ? null :
                        <GridItem xs={12} sm={12} md={4}>
                          <InputLabel style={{ color: "#AAAAAA" }}>Consequências Operacionais</InputLabel>
                          <Tasks
                            tasks={operationalConsequences}
                            onChange={onChangeOperationalConsequences}
                            checkedIndexes = {checkedIndexes}
                          />
                        </GridItem>}
                    </GridContainer>
                  </CardBody>
                  <CardFooter>
                    {editionMode ? 
                      <Button onClick={updateIncident} color="primary">Atualizar</Button>
                      :
                      <Button onClick={saveIncident} color="primary">Enviar</Button>
                    } 
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
                      "status": "Status",
                      "incident_time": "Data", 
                      "comments": "Comentários",
                      }}
                      content={indicents} 
                      onDelete={onDeleteIncident}
                      onEdit={onEditIncident}
                      ></CustomTable>
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
