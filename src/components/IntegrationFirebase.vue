<template>
  <v-container>
    <v-layout text-center wrap>
      <v-app>
        <v-content style="padding: 0px 0px 12px 12px;">
          <v-container>
            <template>
              <v-layout column align-center>
                <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                  <v-text-field v-model="firstName" :rules="nameRules" label="First Name" required></v-text-field>

                  <v-text-field v-model="lastName" :rules="nameRules" label="Last Name" required></v-text-field>

                  <v-text-field v-model="gender" :rules="nameRules" label="Gender" required></v-text-field>

                  <v-text-field
                    v-model="dateOfBirth"
                    :rules="nameRules"
                    label="Date of Birth"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="residence"
                    :rules="residenceRules"
                    label="Residence"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="idNumber"
                    :rules="nameRules"
                    label="Identification Number"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="documentNumber"
                    :rules="nameRules"
                    label="Document Number"
                    required
                  ></v-text-field>           
                  <v-btn
                    :disabled="!valid"
                    color="success"
                    class="mr-4"
                    @click="validateAndSave"
                  >Save</v-btn>

                  <v-btn color="error" class="mr-4" @click="reset">Reset Form</v-btn>

                  <v-btn color="warning" @click="resetValidation">Reset Validation</v-btn>
                  <div v-if="!image">
                    <h2>Select an image</h2>
                    <input type="file" @change="onFileChange" />
                  </div>
                  <div v-else>
                    <img :src="image" />
                    <v-btn @click="removeImage">Remove image</v-btn>
                  </div>
                </v-form>
              </v-layout>
            </template>
          </v-container>
        </v-content>
      </v-app>
    </v-layout>
  </v-container>
</template>
  

    <script>
import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";
export default {
  data: () => ({
    firebaseDb: null,
    firstName: "",
    lastName: "",
    gender: "",
    dateOfBirth: "",
    residence: "",
    idNumber: "",
    documentNumber: "",
    state: {
      accessToken: null,
      refresh_token: null,
      loggingIn: false,
      loginError: null
    },
    image: "",
    imageName: "",
    imageUrl: "",

    valid: true,
    name: "",
    nameRules: [
      v => !!v || "Filed is required",
      v => (v && v.length <= 20) || "Filed must be less than 20 characters"
    ],
    residenceRules: [
      v => !!v || "Filed is required",
      v => (v && v.length <= 50) || "Filed must be less than 50 characters"
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
  mounted() {
    // Your web app's Firebase configuration
    var firebaseConfig = {
      apiKey: "AIzaSyB5A0fY-8gA0t46xqj1h23XNKQZV8zObEE",
      authDomain: "mblink-85140.firebaseapp.com",
      databaseURL: "https://mblink-85140.firebaseio.com",
      projectId: "mblink-85140",
      storageBucket: "mblink-85140.appspot.com",
      messagingSenderId: "114328496908",
      appId: "1:114328496908:web:377fe6f23624af5b"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    this.firebaseDb = firebase.firestore();
  },
  methods: {
    saveFormToFirebase() {
      this.uploadImageToFirebase();
    },
    uploadImageToFirebase() {
      debugger;
      var self = this;
      var storageRef = firebase.storage().ref("/idCards/" + this.imageName);
      storageRef.putString(this.image, "data_url").then(function(snapshot) {
        debugger;
        //var a = this.$parent.this;
        var storage = firebase.storage();
        var pathReference = storage.ref("/idCards/" + snapshot.metadata.name);
        pathReference.getDownloadURL().then(function(url) {
          debugger;
          self.imageUrl = url;
          self.uploadFormToFirebase();
        });
      });
    },
    uploadFormToFirebase() {
      console.log("upload form start: gotovo ");
      this.firebaseDb
        .collection("users")
        .add({
          firstName: this.firstName,
          lastName: this.lastName,
          gender: this.gender,
          dateOfBirth: this.dateOfBirth,
          residence: this.dateOfBirth,
          idNumber: this.idNumber,
          documentNumber: this.documentNumber,
          imageUrl: this.imageUrl
          //imageBase64: vm.image
        })
        .then(function(docRef) {
          console.log("Document written with ID: ", docRef.id);
          alert("Document written with ID: " + docRef.id);
        })
        .catch(function(error) {
          console.error("Error adding document: ", error);
          alert("Error adding document: " + error);
        });
    },
    onFileChange(e) {
      var files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      this.createImage(files[0]);
    },
    createImage(file) {
      var image = new Image();
      var reader = new FileReader();
      var vm = this;

      reader.onload = e => {
        vm.image = e.target.result;
        //console.log(vm.image);
        debugger;
        this.callMicroblinkOcr();
      };
      var a = reader.readAsDataURL(file);
      //console.log(a);
      //console.log(file);
      vm.imageName = file.name;
    },
    removeImage: function(e) {
      this.image = "";
    },

    callMicroblinkOcr() {
      //let token = localStorage.getItem('accessToken')
      let token =
        "NDUyZGJjYWJhNmRkNDNkN2FjOWFmYjFkNDAxOWUyM2I6MDQxMWNiYjctN2U3MC00MTJkLTkwNTctNDg5OTU3MjA2NDJj";
      let reqData = {
        recognizerType: "CRO_ID_BACK",
        detectGlare: false,
        exportImages: false,
        exportMrzImage: false,
        exportFullDocumentImage: false,
        // "imageURL": "https://storage.googleapis.com/microblink-data-public/microblink-api/test-set/blinkid/MRTD/MRTD_specimen_croatia.jpg",
        imageBase64: this.image,
        DEBUG: true
      };
      axios
        .request({
          url: "/recognize/execute",
          method: "post",
          data: JSON.stringify(reqData),
          baseURL: "https://api.microblink.com/",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        })
        .then(response => {
          debugger;
          console.log(response.data);
          this.firstName = response.data.data.result.primaryID;
          this.lastName = response.data.data.result.secondaryID;
          this.gender = response.data.data.result.sex;
          this.dateOfBirth =
            response.data.data.result.dateOfBirth.day +
            "." +
            response.data.data.result.dateOfBirth.month +
            "." +
            response.data.data.result.dateOfBirth.year;
          this.residence = response.data.data.result.residence;
          this.idNumber = response.data.data.result.opt1;
          this.documentNumber = response.data.data.result.documentNumber;
          // vm.uploadFormToFirebase();
        })
        .catch(error => {
          console.log(error);
          alert("Something went wrong!");
        });
    },
    validateAndSave() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.saveFormToFirebase();
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    }
  }
  // })
};
</script>

