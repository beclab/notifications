<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-pa-lg" style="min-height: 200px">
      <q-input class="q-pt-sm" filled v-model="recipients.name" label="recipients" readonly />
      <q-input class="q-pt-sm" filled v-model="name" label="Name" />

      <!-- <q-select label="Application" class="q-py-sm" v-model="app" :options="appList" />

      <q-select label="Language" class="q-py-sm" v-model="language" :options="languageList" /> -->

      <div class="q-pt-sm">Data</div>

      <q-input v-for="item in variablesInput" class="q-pt-sm" :key="item.key" filled v-model="item.value"
        :label="item.title" />

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
import { computed, reactive, ref, watch } from 'vue';
import { recipientTemplates } from '@notifications/database';

const props = defineProps({
  id: {
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

const recipients = ref(applicationStore.recipients.find((re) => re.id == props.id));
const template = ref(recipientTemplates.find((se) => se.type == recipients.value.type));
const name = ref();
const variables = ref({});
const variablesInput = ref([]);
const app = ref();

function convertFirstLetterToUpperCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function updateVariables() {
  let arr = [];
  console.log(template.value.validator.params);
  for (let key of template.value.validator.params) {
    arr.push({
      key: key,
      value: ref(variables.value[key]),
      title: convertFirstLetterToUpperCase(key.replaceAll('_', ' '))
    });
  }

  variablesInput.value = arr;
}
updateVariables();

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();

async function onOKClick() {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  Loading.show();

  try {
    console.log('onOKClick');
    // console.log(variablesInput.value);

    const data = {};
    for (let item in variablesInput.value) {
      //console.log(variablesInput.value[item].key + ' ' + variablesInput.value[item].value);
      data[variablesInput.value[item].key] = variablesInput.value[item].value;
    }
    console.log(data);
    await applicationStore.createRecipientsAddress(props.id, name.value, data);
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
