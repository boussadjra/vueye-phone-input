import { flushPromises, shallowMount } from "@vue/test-utils";
import VueyePhoneInput from "@/components/VueyePhoneInput";
function factory(props: any) {
  return shallowMount(VueyePhoneInput, {
    props
  });
}
describe("VueyePhoneInput", () => {
  it("renders placeholder", () => {

    const placeholder = "Insert phone number";
    const wrapper = factory({ placeholder })
    expect(wrapper.html()).toContain(placeholder);
  });

  it("renders with outline", () => {


    const wrapper = factory({ outlined: true })
    expect(wrapper.html()).toContain('vpi-border-2');
  });

  it("renders with green outline when the status is success", () => {


    const wrapper = factory({ outlined: true, status: 'success' })
    expect(wrapper.html()).toContain('vpi-border-2 vpi-border-green');
  });
  it("renders with red outline when the status is error", () => {


    const wrapper = factory({ outlined: true, status: 'error' })
    expect(wrapper.html()).toContain('vpi-border-2 vpi-border-red');
  });

  it("renders with shadow", () => {


    const wrapper = factory({ raised: true })
    expect(wrapper.html()).toContain('shadow-md');
  });

  it("renders with countries dropdown", () => {


    const wrapper = factory({ raised: true })

   let drop= wrapper.findAll('div')
   console.log('--------------------')
   console.log(drop)
   console.log('--------------------')
  //  expect(wrapper.html()).toContain('shadow-md');
  });
});
