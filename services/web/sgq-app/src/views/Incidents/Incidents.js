import React from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import BugReport from "@material-ui/icons/BugReport";
import Code from "@material-ui/icons/Code";
import Tasks from "components/Tasks/Tasks.js";
import Cloud from "@material-ui/icons/Cloud";
import CustomInput from "components/CustomInput/CustomInput.js";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "components/CustomButtons/Button.js";
import CardFooter from "components/Card/CardFooter.js";
import { bugs, website, server } from "variables/general.js";


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
  }
};

const useStyles = makeStyles(styles);

export default function IncidentsPage() {
  const classes = useStyles();
  return (
   <GridItem xs={12} sm={12} md={8}>
    <Card>
      <CardHeader color="primary">
        <h4 className={classes.cardTitleWhite}>Que caralho que aconteceu?</h4>
        <p className={classes.cardCategoryWhite}>DESCREVA ESSA PORRA COM LETRAS MAIUSCULAS</p>
      </CardHeader>
      <CardBody>
        <GridContainer>         
          <GridItem xs={12} sm={12} md={3}>
            <CustomInput
              labelText="A culpa é de quem?"
              id="username"
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText="Descreva o meliante que estragou tudo"
              id="email-address"
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Nome do X9"
              id="first-name"
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={6}>
            <CustomInput
              labelText="Sobrenome do X9"
              id="last-name"
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText="Setor"
              id="city"
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText="Gerente"
              id="country"
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
          <GridItem xs={12} sm={12} md={4}>
            <CustomInput
              labelText="Onde almoça?"
              id="postal-code"
              formControlProps={{
                fullWidth: true
              }}
            />
          </GridItem>
        </GridContainer>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <InputLabel style={{ color: "#AAAAAA" }}>RELATO DE UM DEDO DURO</InputLabel>
            <CustomInput
              labelText="Descreva exatamente o que aconteceu!!!"
              id="Descreva exatamente o que aconteceu!!!"
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
      </CardBody>
      <CardFooter>
        <Button color="primary">Enviar para o RH</Button>
      </CardFooter>
    </Card>
  </GridItem>
  );
}
