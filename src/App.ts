import { defineComponent, h } from "vue";
import VueyePhoneInput from "./components/VueyePhoneInput";


export default defineComponent({
    name: 'app',
    components: {
        VueyePhoneInput
    },
    data() {
        return {
            phone: ''
        }
    },
    render() {
        return h('div', { class: ' p-16 h-full w-full' }, 
        [h(VueyePhoneInput, { modelValue: this.phone,'onUpdate:modelValue': (value:any) => this.$emit('update:modelValue', value) }), h('div', { class: '' }, this.phone)])
    },
})