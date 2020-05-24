/* Mock variables to test front without back-end */
var incidentTypes = [
    {
        "id": 1,
        "name": "Parada agendada"
    },
    {
        "id": 2,
        "name": "Falha de maquinário"
    },
    {
        "id": 3,
        "name": "Erro humano"
    }
];
  
var incidents = [
    {
        "id": 1,
        "incident_type": 2,
        "incident_time": "2020-05-24T17:43:06.000Z",
        "comments": "Rompeu a correia"
    },
    {
        "id": 2,
        "incident_type": 1,
        "incident_time": "2020-05-24T17:45:20.000Z",
        "comments": "Molhou tudo!"
    },
    {
        "id": 3,
        "incident_type": 2,
        "incident_time": "2020-05-24T17:45:22.000Z",
        "comments": "Molhou tudo!"
    }
];

var operationalConsequenceTypes = [
    {
        "id": 1,
        "name": "Produção parada"
    },
    {
        "id": 2,
        "name": "Mudança nos turnos"
    },
    {
        "id": 3,
        "name": "Perda de insumos"
    }
];

var operationalConsequences = [
    {
        "id": 1,
        "incident_id": 1,
        "consequence_type": 1
    }
];

module.exports = {
    incidentTypes,
    incidents,
    operationalConsequenceTypes,
    operationalConsequences
};