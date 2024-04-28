<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-pa-lg" style="min-height: 200px">
      <q-select label="Template" class="q-py-sm" v-model="templateId" :options="recipientTemplates"
        :option-value="(opt) => (Object(opt) === opt && 'name' in opt ? opt.name : null)"
        :option-label="(opt) => (Object(opt) === opt && 'name' in opt ? opt.name : '- Null -')" emit-value map-options />
      <q-input class="q-pt-sm" filled v-model="name" label="Name" />

      <q-card-actions align="right" class="q-pt-md">
        <q-btn color="primary" label="OK" @click="onOKClick" />
        <q-btn color="primary" label="Cancel" @click="onDialogCancel" />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { useApplicationStore } from '../../stores/application';
import { useDialogPluginComponent, Loading } from 'quasar';
import { ref } from 'vue';
import { recipientTemplates } from '@notifications/database';

const props = defineProps({
  recipients: {
    type: String,
    required: true
  }
  // ...your custom props
});

defineEmits([
  // REQUIRED; need to specify some events that your
  // component will emit through useDialogPluginComponent()
  ...useDialogPluginComponent.emits
]);

const applicationStore = useApplicationStore();

const name = ref('');
const templateId = ref(recipientTemplates[0].name);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();
// dialogRef      - Vue ref to be applied to QDialog
// onDialogHide   - Function to be used as handler for @hide on QDialog
// onDialogOK     - Function to call to settle dialog with "ok" outcome
//                    example: onDialogOK() - no payload
//                    example: onDialogOK({ /*...*/ }) - with payload
// onDialogCancel - Function to call to settle dialog with "cancel" outcome

// this is part of our example (so not required)
async function onOKClick() {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  Loading.show();

  const template = recipientTemplates.find((f) => f.name == templateId.value);
  try {
    console.log('onOKClick');

    await applicationStore.createRecipients({
      name: name.value,
      type: template.type,
      isEditable: true,
      status: 'Active',
      user: ''
    });
    Loading.hide();
    onDialogOK({});
  } catch (e) {
    console.log(e);
    Loading.hide();
  }
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}
</script>
