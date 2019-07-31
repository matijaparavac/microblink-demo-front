<template>
  <v-container>
    <!-- <v-layout text-center wrap class="modalBkg" v-if="modalActive == true"> -->
    <v-layout text-center wrap>
      <!-- <div class="modalWrapper"> -->
        <!-- <div @click="closeModal()" class="closeBtn">
          <i aria-hidden="true" class="v-icon notranslate mdi mdi-close theme--light"></i>
        </div> -->
        <v-app>
          <v-content style="padding: 0px 0px 12px 12px;">
            <v-container>
              <template>
                <v-layout column align-center>
             
                  <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                    <v-text-field
                      v-model="firstName"
                      :counter="40"
                      :rules="nameRules"
                      label="First Name"
                      required
                    ></v-text-field>

                    <v-text-field v-model="lastName" :counter="40" :rules="nameRules" label="Last Name" required></v-text-field>

                    <v-text-field v-model="gender" :rules="nameRules" label="Gender" required></v-text-field>

                    <v-text-field v-model="nationality" :rules="nameRules" label="Nationality" required></v-text-field>

                    <v-text-field
                      v-model="dateOfBirth"
                      :rules="nameRules"
                      label="Date of Birth"
                      required
                    ></v-text-field>

                    <v-text-field v-model="residence" :rules="nameRules" label="Residence" required></v-text-field>

                    <v-text-field
                      v-model="idNumber"
                      :rules="oibRules"
                      label="identification Number"
                      required
                    ></v-text-field>

                    <v-text-field
                      v-model="documentNumber"
                      :rules="nameRules"
                      label="Document Number"
                      required
                    ></v-text-field>
                    
                 
                    <v-btn :disabled="!valid" color="success" class="mr-4" @click="validate">Save</v-btn>

                    <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>

                    <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>

             

                    <div class="microblink-ui-component-wrapper">
                      <microblink-ui-web @loadeddata="test()" autoscroll>
                        <template class="localization json"></template>

                        <img
                          slot="loader-image"
                          src="https://microblink.com/bundles/microblinkmicroblink/images/loading-animation-on-blue.gif"
                        />
                        <!-- class="hide-until-component-is-loaded" -->
                        <!-- <span slot="labels.openLinkAtSmartphone" class="hide-until-component-is-loaded"  >Please open <b>exchange link</b> at the smartphone with <b>QR</b> reader.</span> -->
                      </microblink-ui-web>
                    </div>
                  </v-form>
                </v-layout>
              </template>
            </v-container>
          </v-content>
        </v-app>
      <!-- </div> -->
    </v-layout>
  </v-container>
</template>

<script>
export default {
  props: {
    modalActive: Boolean
  },
  data: () => ({
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    residence: "",
    idNumber: "",
    documentNumber: "",
    nationality:"",
    state: {
      accessToken: null,
      refresh_token: null,
      loggingIn: false,
      loginError: null
    },
    image: "",

    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Filed is required",
      v => (v && v.length <= 60) || "Filed must be less than 20 characters"
    ],
      oib: "",
      oibRules: [
      v => !!v || "Filed is required",
      v => (v && v.length === 11) || "Filed must be 11 characters"
    ],
    email: "",
    emailRules: [
      v => !!v || "E-mail is required",
      v => /.+@.+\..+/.test(v) || "E-mail must be valid"
    ],
    select: null,
    items: ["Item 1", "Item 2", "Item 3", "Item 4"],
    checkbox: false,
    lazy: false
  }),
  methods: {
      closeModal() {
      this.$emit("closeModal");
    },
    test(){
            debugger;
    },
        fillForm: function(data){
            let self = this;
            debugger;
            data.filter(item=>item.result != null).forEach(element => {

                switch(element.recognizer){
                    case "CRO_ID_FRONT":
                         self.lastName= element.result.lastName;
                         self.firstName= element.result.firstName;
                         self.nationality=element.result.citizenship;
                         self.dateOfBirth= element.result.dateOfBirth.day + "."+element.result.dateOfBirth.month+ "."+element.result.dateOfBirth.year;
                         self.documentNumber= element.result.documentNumber;
                         self.gender= element.result.sex;
 
                    break;
                    case "CRO_ID_BACK":
                        self.lastName= element.result.primaryID;
                        self.firstName= element.result.secondaryID;
                        self.gender= element.result.sex;
                        self.dateOfBirth= element.result.dateOfBirth.day + "."+element.result.dateOfBirth.month+ "."+element.result.dateOfBirth.year;
                        self.documentNumber= element.result.documentNumber;
                        self.nationality=element.result.nationality;
                        self.residence= element.result.residence;                   
                        self.idNumber= element.result.opt1;
                        break;
                    default:
                        self.lastName= element.result.primaryID;
                        self.firstName= element.result.secondaryID;
                        self.gender= element.result.sex;               
                        self.dateOfBirth= element.result.dateOfBirth.day + "."+element.result.dateOfBirth.month+ "."+element.result.dateOfBirth.year;
                        self.documentNumber= element.result.documentNumber;
                        self.nationality=element.result.nationality;
                }
                
                    
            });
            //fillForm(data){
                debugger;
                    
                },


    saveFormData() {
        var person = {
            firstName: this.firstName,
            lastName: this.lastName,
            gender: this.gender,
            residence: this.residence,
            documentNumber:this.documentNumber,
            idNumber:this.idNumber,
            nationality:this.nationality,
            dateOfBirth: this.dateOfBirth
        };
        // let API_URL = "http://localhost:8088",
        let API_URL = "https://microblink-demo-app.herokuapp.com";     
        const url = `${API_URL}/api/v1/people/`;
        axios.post(url,person).then(response => {
            console.log(response.data);
            this.reset();
            }).catch(error => {
          console.log(error);
          alert(error);
        });;
    },

    validate() {
      if (this.$refs.form.validate()) {
        this.saveFormData();
      }
    },
    reset() {
      debugger;
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  },

  mounted: function() {
    var a = this;
      
    document
      .querySelector("microblink-ui-web")
      .addEventListener("resultReady", function(event) {
        debugger;
        var result = event.detail.result;
        console.log("rezultat-skeniranja", result);
       a.fillForm(result.data);
      });
  }
};
</script>
<style>
.modalBkg {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 100;
}

.closeBtn {
  position: absolute;
  top: 20px;
  right: 20px;
  cursor: pointer;
}

::-webkit-scrollbar {
  display: none;
}

.modalWrapper {
  background-color: #fafafa;
  padding: 5%;
  border-radius: 10px;
  position: fixed;
  height: 80%;
  width: 60%;
  min-width: 320px;
  margin: 5% 20%;
  border: 1px lightgray solid;
  overflow: scroll;
  box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.2);
}
.v-dialog__container {
  margin-left: 15px;
}

.v-dialog:not(.v-dialog--fullscreen) {
  max-height: initial;
}

body {
  margin: 0;
  padding: 0;
  font-size: 20px;
}

.microblink-ui-component-wrapper {
  max-width: 100vw;
  height: 50vh;
  position: relative;
  margin: 20px 0;
  box-sizing: border-box;
  overflow: hidden;
}

microblink-ui-web {
  --mb-hem: 20px;
  --mb-widget-border-width: 1px;
  --mb-alt-font-color: #575757;
  --mb-default-font-color: #48b2e8;
  --mb-btn-font-color: white;
  --mb-btn-background-color: #48b2e8;
  --mb-btn-background-color-hover: #26a4e4;
  --mb-btn-border-radius: 0;
  --mb-btn-flip-image-color: #48b2e8;
  --mb-dropzone-hover-color: rgba(72, 178, 232, 0.25);
  --mb-loader-font-color: black;
  --mb-loader-background-color: #48b2e8;
  --mb-counter-background-color: rgba(72, 178, 232, 0.7);
  --mb-counter-font-color: black;
  --mb-tabs-hover-color: #26a4e4;
  --mb-tabs-active-color: #48b2e8;
  --mb-json-color-key: black;
  --mb-json-color-string: #48b2e8;
  --mb-json-color-boolean: #26a4e4;
  --mb-json-color-number: black;
  --mb-json-color-null: #26a4e4;
  --mb-dialog-font-color: white;
  --mb-dialog-background-color: black;
}

microblink-ui-web .hide-until-component-is-loaded {
  visibility: hidden;
}
</style>

