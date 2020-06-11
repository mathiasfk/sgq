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
import {checkResponseStatus, parseJSON} from "utils/fetchUtils.js";
import CustomSnackbar from "components/CustomSnackbar/CustomSnackbar.js";
import {insumos} from "variables/NonConformities.js";

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
export default function NonConformitiesPage() {
  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [failureMessage, setFailureMessage] = React.useState("");

  const showFailure = msg => {setFailureMessage(msg); setFailure(true)};
  const showSuccess = msg => {setSuccessMessage(msg); setSuccess(true)};

  const tabsRef = React.createRef();
  let [editionMode, setEditionMode] = useState(false);
  let [tabName, setTabName] = useState('Cadastrar');
  let [selectedInsumo, setSelectedInsumo] = useState('');
  let [nonConformityName, setNonConformityName] = useState('');
  let [consequenciasOperacionais, setConsequenciasOperacionais] = useState('');
  let [description, setDescription] = useState('');
  let [nonConformities, setNonConformities] = useState([]);
  let [currentNonConformityId, setCurrentNonConformityId] = useState('');

  async function fetchData(){
    const urls = [
        "http://127.0.0.1:3000/non_conformity",
    ];

    Promise.all(urls.map(url =>
      fetch(url)
        .then(checkResponseStatus)                 
        .then(parseJSON)
        .catch(error => console.log('Alguma api teve problemas!', error))
    )).
    then(results => {
        setNonConformities(results[0]);
    });
  }
  
  const onChangeDescription = (value) => {
    setDescription(value);
  }

  const onChangeConsequenciasOperacionais = (value) => {
    setConsequenciasOperacionais(value);
  }

  const onChangeNonConformityName = (value) => {
    setNonConformityName(value);
  }

  const doNonConformityFetch = (url, requestOpt, msgResponse) => {
    return fetch(url, requestOpt)
    .then((response => {
      if(msgResponse.length > 0){
        showSuccess(msgResponse);
      }

      //recarrega a lista de não conformidades
      fetch("http://127.0.0.1:3000/non_conformity")
        .then(checkResponseStatus)                 
        .then(parseJSON)
        .then(non_conformities => setNonConformities(non_conformities));
    }));
  }

  const limpaCampos = () =>{
    setNonConformityName("");
    setSelectedInsumo(null);
    setConsequenciasOperacionais('');
    setDescription('');
  };

  const onEditNonConformity = (value) => {
    const nonConformityTab = document.getElementsByClassName("MuiTab-wrapper")[0];
    //seta o foco para a tab de infos de nao conformidades
    nonConformityTab.click();

    //altera o nome da tab
    setTabName("Atualizar");

    const requestOptions = {
        method: 'GET',
        mode: "cors",
         headers: { 
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }; 

    setCurrentNonConformityId(value[0]);

    setNonConformityName(value[1]);
    setDescription(value[3]);
    setSelectedInsumo(value[4]);

    //esconde painel de consequencias, pois não sera possivel edita-la
    setEditionMode(true);
  
    fetch("http://127.0.0.1:3000/non_conformity_consequences/" + value[0], requestOptions)
    .then(checkResponseStatus)                 
    .then(parseJSON)
    .then((results) => {
        setConsequenciasOperacionais(results.map(item => item.consequence_description).join("\n"));
    });
  }

  const onDeleteNonConformity = (value) => {
    const nonConformityId = value[0];

    const requestOptions = {
      method: 'DELETE',
      mode: "cors",
       headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
    }; 

    fetch("http://127.0.0.1:3000/non_conformity_consequences/" + nonConformityId, requestOptions);
    doNonConformityFetch("http://127.0.0.1:3000/non_conformity/" + nonConformityId, requestOptions, "Não conformidade removida com sucesso!");
  }

  function updateNonConformity(){
    let requestOption = (body) => {
        return {
            method: 'PUT',
            mode: "cors",
            headers: { 
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(body)
          }; 
    }

    fetch("http://127.0.0.1:3000/non_conformity_consequences/" + currentNonConformityId, 
    requestOption({ 
      consequences: consequenciasOperacionais.trim().split("\n")
    }));
    doNonConformityFetch("http://127.0.0.1:3000/non_conformity/" + currentNonConformityId, 
    requestOption({ 
      non_conformity_name: nonConformityName,
      resource: selectedInsumo,
      description: description,
    }), "Não conformidade atualizada com sucesso!")
    .then(() => {
        setTabName("Cadastrar");
        setEditionMode(false);
        limpaCampos();
      });
  }

  function saveNonConformity (){
    let consequences = consequenciasOperacionais.trim().split("\n");
    const requestOptions = {
      method: 'POST',
      mode: "cors",
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
      { 
        non_conformity_name: nonConformityName,
        resource: selectedInsumo,
        description: description,
        consequences: consequences
      })
    }; 

    doNonConformityFetch("http://127.0.0.1:3000/non_conformity", 
    requestOptions, "Não conformidade cadastrada com sucesso!")
    .then(() => limpaCampos());
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GridContainer>
    <GridItem xs={12} sm={12} md={12}>
      <CustomSnackbar severity="success" message={successMessage} open={success} setOpen={setSuccess} />
      <CustomSnackbar severity="error" message={failureMessage} open={failure} setOpen={setSuccess}/>
      <CustomTabs
          ref={tabsRef}
          headerColor="primary"
          tabs={[
            {
              tabName: tabName,
              tabIcon: "",
              tabContent: (
                <Card>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <GridContainer>
                          <GridItem xs={12} sm={12} md={12}>
                            <CustomInput 
                            labelText="Nome da não conformidade"
                            id="non-conformity-name"
                            formControlProps={{
                              fullWidth: true
                            }}
                            onChange={onChangeNonConformityName}
                            value={nonConformityName}/>
                            
                            <CustomSelect 
                              labelText="Insumo"
                              id="non-conformity-resource"
                              formControlProps={{
                                fullWidth: true
                              }}
                              options={insumos}
                              selectedValue={selectedInsumo}
                              setSelectedValue={setSelectedInsumo}
                            />
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <CustomInput
                                labelText="Consequencias operacionais"
                                id="non-conformity-consequences"
                                formControlProps={{
                                fullWidth: true
                                }}
                                inputProps={{
                                multiline: true,
                                rows: 5
                                }}
                                onChange={onChangeConsequenciasOperacionais}
                                value={consequenciasOperacionais}
                            />
                            </GridItem>
                        </GridContainer>
                      </GridItem>
                    <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                            labelText="Descrição"
                            id="non-conformity-description"
                            formControlProps={{
                                fullWidth: true
                            }}
                            inputProps={{
                            multiline: true,
                            rows: 5
                            }}
                            onChange={onChangeDescription}
                            value={description}
                        />
                    </GridItem>
                    </GridContainer>
                  </CardBody>
                  <CardFooter>
                    {editionMode ? 
                      <Button onClick={updateNonConformity} color="primary">Atualizar</Button>
                      :
                      <Button onClick={saveNonConformity} color="primary">Cadastrar</Button>
                    } 
                  </CardFooter>
                </Card>
              )
            },
            {
              tabName: "Cadastrados",
              tabIcon: "",
              tabContent: (
                <Card>
                  <CardBody>
                    <CustomTable columns={{
                      "id": "ID",
                      "non_conformity_name": "Nome",
                      "resource": "Recurso",
                      "non_conformity_time": "Data", 
                      "comments": "Comentários",
                      }}
                      content={nonConformities} 
                      onDelete={onDeleteNonConformity}
                      onEdit={onEditNonConformity}
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
