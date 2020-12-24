<template>
  <div class="w-full h-full p-16">
    <label for="#phone">
      <div class="py-2 text-gray-600">Your phone number :</div>
      <vueye-phone-input v-model="phone" :outlined="true" id="phone" status="succes" />
    </label>

    <div class="max-w-md py-8">
      <code class="whitespace-pre-line">
        {{ phone }}
      </code>
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
      phone: {
        number: "",
        nationalNumber: "",
      },
    };
  },
  methods: {
   
  },
});
</script>
