<template>
  <div class="vpi-w-full vpi-h-full vpi-p-16">
   <div class="vpi-p-4 vpi-shadow-md vpi-max-w-md">
    <label for="#phone">
      <div class="vpi-py-2 vpi-text-gray-600">Your phone number :</div>
      <vueye-phone-input placeholder="Insert phone number" v-model="phone" raised  id="phone"  />
    </label>

    <div class="vpi-max-w-md vpi-py-8">
      <code class="vpi-whitespace-pre-line">
        {{ phone }}
      </code>
    </div>
   </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import VueyePhoneInput from "./components/VueyePhoneInput";

export default defineComponent({
  name: "app",
  components: {
    VueyePhoneInput,
  },
  data() {
    return {
      status:'',
      phone: {
        number: "",
        nationalNumber: "",
        isValid:false
      },
    };
  },

  methods: {
   
  },
});
</script>
