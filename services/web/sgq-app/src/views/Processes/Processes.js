import React, {useState, useEffect} from "react";
// @material-ui/core components
import PlaylistAddCheckIcon from '@material-ui/icons/PlaylistAddCheck';
import HistoryIcon from '@material-ui/icons/History';
import DirectionsCarIcon from '@material-ui/icons/DirectionsCar';
import FormatPaintIcon from '@material-ui/icons/FormatPaint';
import AllInboxIcon from '@material-ui/icons/AllInbox';
import WorkOffIcon from '@material-ui/icons/WorkOff';
import Popover from '@material-ui/core/Popover';
import { makeStyles } from '@material-ui/core/styles';
import CheckBoxOutlineBlankIcon from '@material-ui/icons/CheckBoxOutlineBlank';
import CheckBoxIcon from '@material-ui/icons/CheckBox';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomTabs from "components/CustomTabs/CustomTabs.js";
import Tasks from "components/Tasks/Tasks.js";
import Button from "components/CustomButtons/Button.js";
import CardFooter from "components/Card/CardFooter.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import CustomTable from "components/CustomTable/CustomTable.js";
import CustomSnackbar from "components/CustomSnackbar/CustomSnackbar.js";

// helpers
import {checkResponseStatus, parseJSON} from "utils/fetchUtils.js";
import User from "utils/User.js";

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1),
  },
}));

function ChecklistWithHistoric(category){

  const [tiposChecklist, setTiposChecklist] = useState([]);
  const [selectedChecklist, setSelectedChecklist] = useState([]);
  const [previousAnswers, setPreviousAnswers] = useState(null);

  const [success, setSuccess] = React.useState(false);
  const [failure, setFailure] = React.useState(false);
  const [successMessage, setSuccessMessage] = React.useState("");
  const [failureMessage, setFailureMessage] = React.useState("");
  const [popoverContent, setPopoverContent] = React.useState("");

  const showFailure = msg => {setFailureMessage(msg); setFailure(true)}
  const showSuccess = msg => {setSuccessMessage(msg); setSuccess(true)}

  const [anchorEl, setAnchorEl] = React.useState(null);

  const classes = useStyles();

  const handlePopoverOpen = (event, id) => {
    setPopoverContent('loading...');
    fetchAnswer(id);
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  async function fetchChecklist(category){
    const urls = [
      `http://127.0.0.1:3000/checklist_item?category=${category}`,
    ];
    
    Promise.all(urls.map(url =>
      fetch(url)
        .then(checkResponseStatus)
        .then(parseJSON)
        .catch(error => console.log('Alguma api teve problemas!', error))
    )).
    then(results => {
        setTiposChecklist(results[0].map(e => {return {id : e.id, name: e.name};}));
    });
  }

  async function fetchHistory(category){
    const urls = [
      `http://127.0.0.1:3000/checklist_answer?category=${category}`,
    ];
    
    Promise.all(urls.map(url =>
      fetch(url)
        .then(checkResponseStatus)
        .then(parseJSON)
        .catch(error => console.log('Alguma api teve problemas!', error))
    )).
    then(results => {
      setPreviousAnswers(results[0].map(e => {return {id : e.id, username: e.username, answer_time: e.answer_time, checked_items: <Details id={e.id} num={e.checked_items} />, total_items: e.total_items};}));
    });
  }

  async function fetchAnswer(id){
    const urls = [
      `http://127.0.0.1:3000/checklist_answer/${id}`,
    ];

    Promise.all(urls.map(url =>
      fetch(url)
        .then(checkResponseStatus)
        .then(parseJSON)
        .catch(error => console.log('Alguma api teve problemas!', error))
    )).
    then(results => {
      setPopoverContent(results[0].map(e => (
      <GridContainer>
      <GridItem>{e.answer ? <CheckBoxIcon /> : <CheckBoxOutlineBlankIcon /> }</GridItem>
      <GridItem>{e.name}</GridItem>
      </GridContainer>
      )));
    });
  }

  const onChangeChecklist = (value) => {
    setSelectedChecklist(value);
  };

  function saveChecklist (category){

    const requestOptions = {
      method: 'POST',
      mode: "cors",
      headers: { 
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(
        { 
          checklist_answer: tiposChecklist.map(e => {return {id: e.id, answer: selectedChecklist.indexOf(e.id)>=0 };})
        })
    }; 

    fetch(`http://127.0.0.1:3000/checklist_answer?category=${category}&username=${User.getUsername()}`, requestOptions)
    .then((response => {
      fetchHistory(category);
      setSelectedChecklist([]);
      showSuccess("Enviado com sucesso!");
    }));
  }

  useEffect(() => {
    fetchChecklist(category);
    fetchHistory(category);
  }, []);

  function Details(props){
    const { id, num } = props;
    return (
      <div onMouseEnter={(e) => handlePopoverOpen(e,id)} onMouseLeave={handlePopoverClose}>{num}</div>
    )
  }

  return (
        <Card>
          <CardBody>
          <CustomTabs
            title=""
            headerColor="primary"
            plainTabs={true}
            tabs={[
              {
                tabName: "Checklist",
                tabIcon: PlaylistAddCheckIcon,
                tabContent: (
                  <Tasks
                    checked={selectedChecklist}
                    setChecked={setSelectedChecklist}
                    tasks={tiposChecklist}
                    onChange={onChangeChecklist}
                  />
                )
              },
              {
                tabName: "Histórico",
                tabIcon: HistoryIcon,
                tabContent: (
                  <CustomTable columns={{
                    "id": "ID",
                    "username": "Resposável",
                    "answer_time": "Horário",
                    "checked_items": "Itens marcados",
                    "total_items": "Total de itens"
                    }}
                    content={previousAnswers} onDelete={() => {showFailure("Não foi possível deletar!");}}></CustomTable>
                )
              }
            ]}
          />
          <Button onClick={() => saveChecklist(category)}  color="primary">Enviar</Button>
          <Popover
            id="mouse-over-popover"
            className={classes.popover}
            classes={{
              paper: classes.paper,
            }}
            open={open}
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
            onClose={handlePopoverClose}
            disableRestoreFocus
          >
            {popoverContent}
          </Popover>
          <CustomSnackbar severity="success" message={successMessage} open={success} setOpen={setSuccess} />
          <CustomSnackbar severity="error" message={failureMessage} open={failure} setOpen={setFailure}/>
        </CardBody>
        </Card>
      );
}


export default function ProcessesPage() {
  
  return (
    <GridContainer>      
      <GridItem xs={24} sm={24} md={12}>
          <CustomTabs
            title="Controle de qualidade:"
            headerColor="primary"
            tabs={[
              {
                tabName: "Carroceria",
                tabIcon: DirectionsCarIcon,
                tabContent: (
                  ChecklistWithHistoric("Carroceria")
                )
              },
              {
                tabName: "Pintura",
                tabIcon: FormatPaintIcon,
                tabContent: (
                  ChecklistWithHistoric("Pintura")
                )
              },
              {
                tabName: "Motor",
                tabIcon: AllInboxIcon,
                tabContent: (
                  ChecklistWithHistoric("Motor")
                )
              }
            ]}
          />
        </GridItem>
        <CardFooter>
        <Button  color="warning" startIcon={<WorkOffIcon />} href="/admin/incidents">Reportar parada ou problemas</Button>
      </CardFooter>
    </GridContainer>
  );
}
