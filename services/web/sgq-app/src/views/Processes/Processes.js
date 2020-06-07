import React, {useState, useEffect} from "react";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import WorkOffIcon from '@material-ui/icons/WorkOff';
import Tasks from "components/Tasks/Tasks.js";
import Button from "components/CustomButtons/Button.js";
import CardFooter from "components/Card/CardFooter.js";
import {checkResponseStatus, parseJSON} from "utils/fetchUtils.js"
const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};


export default function ProcessesPage() {
  
  const [tiposChecklist, setTiposChecklist] = useState([]);
  const [selectedChecklist, setSelectedChecklist] = useState([]);
  const checkedIndexes = [];
  const [selectedItemChecklist, setSelectedItemChecklist] = useState();
  
  async function fetchData(){
    const urls = [
      "http://127.0.0.1:3000/checklist_item",    
    ];
    
    Promise.all(urls.map(url =>
      fetch(url)
        .then(checkResponseStatus)                 
        .then(parseJSON)
        .catch(error => console.log('Alguma api teve problemas!', error))
    )).
    then(results => {
      setTiposChecklist(results[0]);
    });
  }

  const onChangeChecklist = (value) => {
    setSelectedChecklist(value);
  }

  function saveChecklist (){
    const requestOptions = {
      method: 'POST',
      mode: "cors",
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        { 
          type: selectedChecklist
        })
    }; 

    fetch("http://127.0.0.1:3000/checklist_answer", requestOptions)
    .then((response => {
      alert("Enviou!");
    }));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <GridContainer>      
      <GridItem xs={24} sm={24} md={12}>
          <CustomTabs
            title="Controle de Qualidade:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Checklist",
                tabIcon: PlaylistAddCheckIcon,
                tabContent: (                  
                  <Tasks
                    checkedIndexes={checkedIndexes}                                 
                    tasks={tiposChecklist}
                    onChange={onChangeChecklist}
                  />                                   
                )
              },
                {
                  tabName: "Paradas e Problemas",
                  tabIcon: WorkOffIcon,
                  tabContent: (                  
                    <Tasks
                      checkedIndexes={checkedIndexes}                                 
                      tasks={[]}                      
                    />                                   
                  )
                }
            ]}
          />
        </GridItem>  
        <CardFooter>
        <Button onClick={saveChecklist}  color="primary">Enviar</Button>
        <Button onClick={saveChecklist}  color="warning" href="/admin/incidents">Paradas e problemas</Button>
      </CardFooter>            
    </GridContainer>
  );
}
