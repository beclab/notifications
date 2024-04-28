<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-pa-lg" style="min-height: 200px">
      <q-input class="q-pt-sm" filled v-model="sender" label="Sender" readonly />
      <q-input class="q-pt-sm" filled v-model="name" label="Name" />

      <q-input class="q-pt-sm" filled v-model="app" label="App" :readonly="template.type != 'Application'" />
      <!-- <q-select label="Application" class="q-py-sm" v-model="app" :options="appList" />

      <q-select label="Language" class="q-py-sm" v-model="language" :options="languageList" /> -->

      <div class="q-pt-sm">Credentials</div>

      <q-input v-for="item in variablesInput" class="q-pt-sm" :key="item.key" filled v-model="item.value"
        :label="item.title" />
      <!-- <q-separator />
          <q-card>
            <q-card-section>
              <span class="hint"> {{ item.hint }} </span>

              <q-input standout v-model="item.value" :dense="true" />
            </q-card-section>
          </q-card>
        </q-expansion-item> -->

      <!-- buttons example -->
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
import { senderTemplates } from '@notifications/database';

const props = defineProps({
  sender: {
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

const template = ref(senderTemplates.find((se) => se.name == props.sender));
const sender = ref(props.sender);
const name = ref();
const variables = ref({});
const variablesInput = ref([]);
const app = ref();
if (template.value.type != 'Application') {
  app.value = 'Notification';
}

function convertFirstLetterToUpperCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function updateVariables() {
  let arr = [];
  console.log(template.value.credential.params);
  for (let key of template.value.credential.params) {
    arr.push({
      key: key.name,
      value: ref(variables.value[key.name]),
      title: convertFirstLetterToUpperCase(key.name.replaceAll('_', ' '))
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

    const credential = {};
    for (let item in variablesInput.value) {
      //console.log(variablesInput.value[item].key + ' ' + variablesInput.value[item].value);
      credential[variablesInput.value[item].key] = variablesInput.value[item].value;
    }
    console.log(credential);
    await applicationStore.createSender(
      {
        name: name.value,
        type: template.value.type,
        app: app.value,
        recipientType: template.value.recipientType,
        isEditable: true,
        user: '',
        status: 'Active'
      },
      credential
    );
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
