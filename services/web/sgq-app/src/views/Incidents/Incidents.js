import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import CustomSelect from "components/CustomSelect/CustomSelect.js";
import Button from "components/CustomButtons/Button.js";
import CardFooter from "components/Card/CardFooter.js";
import Tasks from "components/Tasks/Tasks.js";

var operationalConsequences = [
  "Produção parada",
  "Mudança nos turnos",
  "Perda de insumos"
];


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
                            formControlProps={{
                              fullWidth: true
                            }}
                            options={[
                              {id:0, incident_type:"Parada agendada"},
                              {id:1, incident_type:"Falha de maquinário"},
                              {id:2, incident_type:"Erro humano"}
                            ]}
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
                        />
                      </GridItem>
                      </GridContainer>
                    </GridItem>
                      <GridItem xs={12} sm={12} md={4}>
                      <Tasks
                        checkedIndexes={[]}
                        tasksIndexes={[0, 1, 2]}
                        tasks={operationalConsequences}
                      />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  <CardFooter>
                    <Button color="primary">Enviar</Button>
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
                    <Table
                      tableHeaderColor="primary"
                      tableHead={["Tipo", "Data", "Comentários", "Consequências Operacionais"]}
                      tableData={[
                        ["Parada agendada", "2020-04-28 17:00", "Tudo certo.", ""],
                        ["Falha em equipamento", "2020-05-02 13:42", "Falha hidráulica na prensa", "Perda de insumos"],
                        ["Falha em equipamento", "2020-05-03 12:23", "Falha hidráulica na prensa de novo", "Perda de insumos"],
                        ["Parada agendada", "2020-05-04 10:05", "Manutenção da prensa hidráulica", ""],
                      ]}
                    />
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
