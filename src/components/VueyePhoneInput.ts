import { defineComponent, h, PropType } from "vue";
import './style.scss'
import countries from './countries'
import asYoutType, { getCountries, PhoneNumber } from 'libphonenumber-js'

/*** interfaces */

let _countries = getCountries();
interface ICountry {
    name: string
    nativeName: string
    callCode: number | null
    flag: string
    code: string
}

interface IPhoneNumber extends PhoneNumber {
    // nationalNumber: number | string,
    // number: number | string,

}
/****** constants */
const dropdownClasses = ["vpi-absolute vpi-bg-white vpi-shadow-lg z-20 vpi-max-h-64 vpi-p-2  vpi-top-full vpi-mt-2 vpi-left-0 vpi-w-full vpi-overflow-y-auto"]
let shapes = ['vpi-rounded-none', 'vpi-rounded', 'vpi-rounded-full']
export default defineComponent({
    name: 'vueye-phone-input',
    props: {
        modelValue: {
            type: Object as PropType<IPhoneNumber>
        },
        shape: {
            type: String as PropType<'rounded-none' | 'rounded' | 'rounded-full'>,
            default: 'rounded'
        },
        outlined: {
            type: Boolean,
            default: false

        },
        raised: {
            type: Boolean,
            default: false

        },
        status: {
            type: String as PropType<'success' | 'error' | ''>,
            default: '',


        },
        placeholder: {
            type: String,
            default: ''

        }
    },
    emits: ['update:modelValue', 'blur', 'focus', 'click-dropdown', 'change-country'],
    data() {
        return {
            countries,
            selectedCountry: {} as ICountry | undefined,
            showDropdown: false,
            focused: false,

        }
    },
    watch: {
        status(val) {
            if (!this.outlined) {
                throw new Error("The status works only when the outlined prop is provided");

            }
        }
    },
    computed: {
        wrapperClasses(): Array<string> {
            let borderColor = 'vpi-border-gray-300'




            if (this.status === 'success') {
                borderColor = 'vpi-border-green-500'
            } else if (this.status === 'error') {
                borderColor = 'vpi-border-red-500'
            }

            let outline = this.outlined ? 'vpi-border-2 ' + borderColor : 'vpi-bg-white'
            return [` vpi-flex ${this.raised ? 'vpi-shadow-md' : ''} vpi-${this.shape} ${outline} vpi-relative vpi- vpi-space-x-2 vpi-max-h-max vpi- vpi- vpi-items-center vpi-max-w-md vpi- vpi-min-w-sm vpi-py-2`]

        }
    },

    methods: {

        renderDropdown() {
            return h('div', {
                class: 'vpi-flex vpi-p-2 vpi-flex vpi-items-center vpi-justify-center vpi-w-16',

                onClick: (e: Event) => {
                    this.showDropdown = !this.showDropdown
                    this.$emit('click-dropdown', e, this.showDropdown)
                }
            }, [h('div', { class: ' ' }, [h('img',
                { class: 'vpi-h-4 vpi-w-6 vpi-mr-2', src: this.selectedCountry?.flag }), this.showDropdown ? this.renderItems() : '']), this.renderCaret()])
        },


        renderItems() {
            return h('ul', { class: dropdownClasses }, countries.map((country: ICountry) => this.renderItem(country)))
        },



        renderItem(country: ICountry) {
            return h('li', {
                class: ' vpi-p-1  vpi-flex vpi-space-x-2 vpi-items-center vpi-w-full vpi-text-blue-600 vpi-cursor-pointer hover:vpi-bg-blue-200',
                onClick: (e: Event) => {

                    this.selectedCountry = country;
                    this.showDropdown = false
                    this.$emit('change-country', e, this.selectedCountry)

                    const phoneNumber = asYoutType(`+${this.selectedCountry?.callCode}${this.modelValue?.nationalNumber}`)
                    this.onInput(phoneNumber)
                }

            }, [h('img',
                { class: 'vpi-h-4 vpi-w-6 vpi-mr-2', src: country.flag }),
            h('span', { class: 'vpi-px-2 vpi-mr-2 vpi-text-gray-600' }, `${country.name} (${country.nativeName}) `), `+${country.callCode}`])
        },


        renderInput() {
            return h('input', {
                id: this.$attrs.id,
                class: 'vpi-p-1 vpi-w-full vpi-min-w-md vpi-bg-transparent vpi-outline-none',
                placeholder: this.placeholder,
                onClick: (e: Event) => {
                    e.stopPropagation()

                },

                onFocus: (e: Event) => {
                    this.focused = true;
                    this.$emit('focus', e)
                },
                onBlur: (e: Event) => {
                    this.focused = false;
                    this.$emit('blur', e)

                },
                onInput: (e: any) => {


                    const phoneNumber = asYoutType(`+${this.selectedCountry?.callCode}${e.target.value}`)??{
                        number: `+${this.selectedCountry?.callCode}${e.target.value}`,
                        nationalNumber: e.target.value,
                        callingCode:this.selectedCountry?.callCode,
                        isValid:()=> false,
                       
                    }

                   if(phoneNumber){
                       //@ts-ignore
                    this.onInput(phoneNumber)
                   }


                },

                value: this.modelValue?.nationalNumber,
            })
        },
        onInput(phoneNumber: IPhoneNumber | undefined) {
            this.$emit('update:modelValue', {
                number: phoneNumber?.number,
                nationalNumber: phoneNumber?.nationalNumber,
                callingCode: phoneNumber?.countryCallingCode,
                isValid: phoneNumber?.isValid(),
                isEqual: phoneNumber?.isEqual
            })
        },
        renderCaret() {
            return h('svg', { height: 20, width: 20, viewBox: "0 0 32 32", class: "vpi-fill-current" }, h('path', { d: "M24 12L16 22 8 12z" }))
        }
    },
    render() {
        return h('div', { class: [...this.wrapperClasses, this.showDropdown || this.focused ? ' vpi-border-2 vpi-border-blue-500' : ''] }, [this.renderDropdown(), this.renderInput()])
    },
    created() {
        document.addEventListener('click', (e) => {
            this.showDropdown = this.$el.contains(e.target)

        })
        fetch("https://ip2c.org/s").then(res => {
            return res.text()
        }).then(data => {


            this.selectedCountry = this.countries.find((country) => {
                return data.split(';')[1] === country.code;
            })
        }).catch((e)=>{

        })
    },
    mounted() {

    },
    beforeDestroy() {
        document.removeEventListener('click', () => { })
    }
})