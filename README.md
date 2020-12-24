# vueye-phone-input

## Description :

It's a rich component that allows you to type a validate phone number, this component is based on [libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js), this component supports only Vue.js 3.x



## Installation 

    npm install vueye-phone-input --save

## DEMO 


[LIVE DEMO]()


## Usage 

```js
<template>
  <div class="w-full h-full p-16">
    <label for="phone">
      <div class="py-2 text-gray-600">Your phone number :</div>
      <vueye-phone-input v-model="phone" :outlined="true" id="phone" />
    </label>

    <div class="max-w-md py-8">
      <code class="whitespace-pre-line">
        {{ phone }}
      </code>
    </div>
  </div>
</template>

<script >
import { defineComponent } from "vue";
import VueyePhoneInput from "vueye-phone-input";

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
});
</script>

```

## Props:


|Name|default|description|
|---------|-------|------|
|v-model |`null`| the two-way bound value |
|shape | `'rounded'` | define the component shape (`rounded`,`rounded-none`,`rounded-full`)|
|outlined | `false`| show the component with/out an outline |
|raised| `false`| add an elevation to the component|
|status| `''`|Specify the input status (`'error'`, `'success'` or `''`)|


## Events :

|Name|description|params|
|---------|-------|------|
|blur | Triggered on blur event| `(e:Event)=>{}`|
|focus | Triggered on focus event|`(e:Event)=>{}`|
| click-dropdown | Triggered on open dropdown|`(e:Event,showDropdown:Boolean)=>{}`|
| click-dropdown | Emitted on selecting new country|`(e:Event,country:{name: string,nativeName: string, callCode: number | null, flag: string,code: string})=>{}`|


### Credits :

Thanks to the maintainers of :

- [libphonenumber-js](https://www.npmjs.com/package/libphonenumber-js)
- [restcountries](https://restcountries.eu/)
- [ip-api](http://ip-api.com)
-

Coded with  ❤ by Boussadjra Brahim