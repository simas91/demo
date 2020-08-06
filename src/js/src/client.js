import fetch from 'unfetch';

const checkStatus = response => {
    if(response.ok) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        response.json().then(e => {
            error.error = e;
        });
        return Promise.reject(error);
    }
}

export const getAllVehicles = () => fetch('/vehicles').then(checkStatus);



export const addNewVehicle = vehicle =>
 fetch('/vehicles', {
    headers: {
        'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(vehicle)
}).then(checkStatus);