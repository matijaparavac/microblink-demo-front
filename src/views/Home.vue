<template>
  <div>
    <Integration ref="foo" />
    <!-- <Integration ref="foo" v-bind:modalActive="modalActive" @closeModal="closeModal" /> -->
    <!-- <v-btn color="error" class="mr-4" @click="openModal()">OPEN MODAL</v-btn> -->
  </div>
</template>

<script>
import Integration from "../components/Integration";
export default {
  components: {
    Integration
  },
  data: function() {
    return {
      modalActive: false
    };
  },
  methods: {
    closeModal() {
      this.modalActive = false;
 
    },
    // openModal(){
    //   debugger;
    //   var a = this;
    //   this.modalActive = true;
    //   document
    //   .querySelector("microblink-ui-web")
    //   .addEventListener("resultReady", function(event) {
    //     debugger;
    //     var result = event.detail.result;
    //     console.log("rezultat-skeniranja", result);
    //     a.$refs.foo.fillForm(result.data);
    //   });
    // }
    // ,
  },
};
</script>
