import { defineComponent, h, PropType } from "vue";
import './style.scss'
import countries from './countries'
import parsePhoneNumber, { getCountries } from 'libphonenumber-js'

/*** interfaces */

let _countries = getCountries();
interface ICountry {
    name: string
    nativeName: string
    callCode: number | null
    flag: string
    code: string
}

interface IPhoneNumber {
    nationalNumber: number | string,
    number: number | string,

}
/****** constants */
const dropdownClasses = ["absolute bg-white shadow-lg z-20 max-h-64 p-2  top-full mt-2 left-0 w-full overflow-y-auto"]

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
            default: ''

        }
    },
    emits: ['update:modelValue','blur','focus','click-dropdown','change-country'],
    data() {
        return {
            countries,
            selectedCountry: {} as ICountry | undefined,
            showDropdown: false,
            focused: false,

        }
    },

    computed: {
        wrapperClasses(): Array<string> {
        let borderColor='border-gray-300'




if(this.status==='success'){
borderColor='border-green-500'
}else if (this.status==='error'){
    borderColor='border-red-500'
}

let outline=this.outlined ? 'border-2 '+borderColor : 'bg-white'
            return [`flex ${this.raised ? 'shadow-md' : ''} ${this.shape} ${outline} relative  space-x-2 max-h-max   items-center max-w-md  min-w-sm py-2`]

        }
    },

    methods: {

        renderDropdown() {
            return h('div', {
                class: 'flex p-2 flex items-center justify-center w-16',

                onClick: (e:Event) => {
                    this.showDropdown = !this.showDropdown
                    this.$emit('click-dropdown',e,this.showDropdown)
                }
            }, [h('div', { class: ' ' }, [h('img',
                { class: 'h-4 w-6 mr-2', src: this.selectedCountry?.flag }), this.showDropdown ? this.renderItems() : '']), this.renderCaret()])
        },


        renderItems() {
            return h('ul', { class: dropdownClasses }, countries.slice(0, 20).map((country: ICountry) => this.renderItem(country)))
        },



        renderItem(country: ICountry) {
            return h('li', {
                class: 'p-1  flex space-x-2 items-center w-full text-blue-600 cursor-pointer hover:bg-blue-200',
                onClick: (e: Event) => {

                    this.selectedCountry = country;
                    this.showDropdown = false
                    this.$emit('change-country',e,this.selectedCountry)

                }

            }, [h('img',
                { class: 'h-4 w-6 mr-2', src: country.flag }),
            h('span', { class: 'px-2 mr-2 text-gray-600' }, `${country.name} (${country.nativeName}) `), `+${country.callCode}`])
        },


        renderInput() {
            return h('input', {
                id: this.$attrs.id,
                class: 'p-1 w-full min-w-md bg-transparent outline-none',
                onClick: (e: Event) => {
                    e.stopPropagation()

                },

                onFocus: (e:Event) => {
                    this.focused = true;
                    this.$emit('focus',e)
                },
                onBlur: (e:Event) => {
                    this.focused = false;
                    this.$emit('blur',e)
                
                },
                onInput: (e: any) => {


                    const phoneNumber = parsePhoneNumber(`+${this.selectedCountry?.callCode}${e.target.value}`)
                    console.log('-------phoneNumber----------')
                    console.log(phoneNumber)
                    console.log('--------------------')


                    this.$emit('update:modelValue', {
                        number: phoneNumber?.number,
                        nationalNumber: phoneNumber?.nationalNumber,
                        callingCode: phoneNumber?.countryCallingCode,
                        isValid: phoneNumber?.isValid(),
                        isEqual: phoneNumber?.isEqual
                    })


                },
                // value: this.inputValue,
            })
        },
        renderCaret() {
            return h('svg', { height: 20, width: 20, viewBox: "0 0 32 32", class: "fill-current" }, h('path', { d: "M24 12L16 22 8 12z" }))
        }
    },
    render() {
        return h('div', { class: [...this.wrapperClasses, this.showDropdown || this.focused ? 'border-2 border-blue-500' : ''] }, [this.renderDropdown(), this.renderInput()])
    },
    created() {
        document.addEventListener('click', (e) => {
            this.showDropdown = this.$el.contains(e.target)

        })
        fetch("http://ip-api.com/json").then(res => {
            return res.json()
        }).then(data => {


            this.selectedCountry = this.countries.find((country) => {
                return data.countryCode === country.code;
            })
        })
    },
    mounted() {

    },
    beforeDestroy() {
        document.removeEventListener('click', () => { })
    }
})