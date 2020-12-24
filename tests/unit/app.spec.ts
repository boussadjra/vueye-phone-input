import { shallowMount } from "@vue/test-utils";
import VueyePhoneInput from "@/components/VueyePhoneInput";

describe("HelloWorld.vue", () => {
  it("renders props.msg when passed", () => {
    const msg = "salam";
    const wrapper = shallowMount(VueyePhoneInput, {
     
    });
    expect(wrapper.text()).toMatch(msg);
  });
});
