//TO DO - svi pozivi sa 1 mjesta
import axios from 'axios';
const API_URL = 'https://microblink-demo-app.herokuapp.com';
export class APIService{

constructor(){
}


getPeople() {
    const url = `${API_URL}/api/v1/people/`;
    return axios.get(url).then(response => response.data);
}


getPerson(p) {
    const url = `${API_URL}/api/v1/people/${p}`;
    return axios.get(url).then(response => response.data);
}

createPerson(person){
const url = `${API_URL}/api/v1/people/`;
    return axios.post(url,person);
}

updatePerson(person){

    const url = `${API_URL}/api/v1/people/${person.id}`;
    return axios.put(url,contact);
}


deleteContact(person){
    const url = `${API_URL}/api/v1/people/${person.id}`;
    return axios.delete(url);
}


}


