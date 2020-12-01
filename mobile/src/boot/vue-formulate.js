import Vue from 'vue';
import VueFormulate from '@braid/vue-formulate';
import FQButton from '@/components/formulate/FQButton';
import FQText from '@/components/formulate/FQText';
import FQSelect from '@/components/formulate/FQSelect';
import FQRange from '@/components/formulate/FQRange';
// import FQPhoneInput from '@/components/formulate/FQPhoneInput';
// import FQPasswordInput from '@/components/formulate/FQPasswordInput';
// import FQEmailInput from '@/components/formulate/FQEmailInput';
// import FQRadioInput from '@/components/formulate/FQRadioInput';
// import FQOptionsGroup from '@/components/formulate/FQOptionsGroup';

const NoOp = {
  template: '<div class="hidden"></div>',
};

Vue.use(VueFormulate, {
  library: {
    button: {
      classification: 'button',
      component: FQButton,
      slotComponents: {
        label: NoOp,
        help: NoOp,
        errors: NoOp,
      },
    },
    submit: {
      classification: 'button',
      component: FQButton,
      slotComponents: {
        label: NoOp,
        help: NoOp,
        errors: NoOp,
      },
    },
    text: {
      classification: 'text',
      component: FQText,
      slotComponents: {
        label: NoOp,
        help: NoOp,
        errors: NoOp,
      },
    },
    email: {
      classification: 'text',
      component: FQText,
      slotComponents: {
        label: NoOp,
        help: NoOp,
        errors: NoOp,
      },
    },
    password: {
      classification: 'text',
      component: FQText,
      slotComponents: {
        label: NoOp,
        help: NoOp,
        errors: NoOp,
      },
    },
    search: {
      classification: 'text',
      component: FQText,
      slotComponents: {
        label: NoOp,
        help: NoOp,
        errors: NoOp,
      },
    },
    number: {
      classification: 'text',
      component: FQText,
      slotComponents: {
        label: NoOp,
        help: NoOp,
        errors: NoOp,
      },
    },
    tel: {
      classification: 'text',
      component: FQText,
      slotComponents: {
        label: NoOp,
        help: NoOp,
        errors: NoOp,
      },
    },
    url: {
      classification: 'text',
      component: FQText,
      slotComponents: {
        label: NoOp,
        help: NoOp,
        errors: NoOp,
      },
    },
    time: {
      classification: 'text',
      component: FQText,
      slotComponents: {
        label: NoOp,
        help: NoOp,
        errors: NoOp,
      },
    },
    date: {
      classification: 'text',
      component: FQText,
      slotComponents: {
        label: NoOp,
        help: NoOp,
        errors: NoOp,
      },
    },
    week: {
      classification: 'text',
      component: FQText,
      slotComponents: {
        label: NoOp,
        help: NoOp,
        errors: NoOp,
      },
    },
    month: {
      classification: 'text',
      component: FQText,
      slotComponents: {
        label: NoOp,
        help: NoOp,
        errors: NoOp,
      },
    },
    'datetime-local': {
      classification: 'text',
      component: FQText,
      slotComponents: {
        label: NoOp,
        help: NoOp,
        errors: NoOp,
      },
    },
    textarea: {
      classification: 'textarea',
      component: FQText,
      slotComponents: {
        label: NoOp,
        help: NoOp,
        errors: NoOp,
      },
    },
    select: {
      classification: 'select',
      component: FQSelect,
      slotComponents: {
        label: NoOp,
        help: NoOp,
        errors: NoOp,
      },
    },
    range: {
      classification: 'slider',
      component: FQRange,
      slotComponents: {
        label: NoOp,
        help: NoOp,
      },
    },
    // phone: {
    //   classification: 'text',
    // },
    // radio: {
    //   classification: 'radio',
    //   component: FQRadioInput,
    // },
    // option: {
    //   classification: 'box',
    //   component: FQOptionsGroup,
    // },
  },
});
