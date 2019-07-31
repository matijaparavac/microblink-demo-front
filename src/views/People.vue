<template>
  <v-card>
    <v-card-title>
      People from DB
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
    <v-data-table
      :headers="headers"
      :items="peopleList"
      :search="search"
    ></v-data-table>
  </v-card>
</template>
<script>
// import ApiService from '../libs/ApiService';
//   const apiService = new ApiService();


  export default {
    data () {
      return {
        search: '',
        headers: [
          {
            text: 'First name',
            align: 'left',
            sortable: false,
            value: 'firstName',
          },
          { text: 'Last name', value: 'lastName' },
          { text: 'DOB', value: 'dateOfBirth' },
          { text: 'Gender', value: 'gender' },
          { text: 'Document num', value: 'documentNumber' },
          { text: 'OIB', value: 'idNumber' },
          { text: 'Nationality', value: 'nationality' },
          { text: 'Residence', value: 'residence' },
        ],
        peopleList: [],
      }
    },
    methods:{

      getPeople(){
        const url = `https://microblink-demo-app.herokuapp.com/api/v1/people`;
        return axios.get(url).then(response => {
        console.log("Lista: ", response.data);
        this.peopleList = response.data;
       
    }).catch(e=>{debugger;});
      }
    },
    mounted:function(){
      this.getPeople();
     
    },

  }
</script>