<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-pa-lg" style="min-height: 200px">
      <q-input class="q-pt-sm" filled v-model="name" label="Name" />
      <q-select label="Application" class="q-py-sm" v-model="app" :options="appList" />
      <q-select
        label="Template"
        class="q-py-sm"
        v-model="templateId"
        :options="templateList"
        :option-value="(opt) => (Object(opt) === opt && 'id' in opt ? opt.id : null)"
        :option-label="(opt) => (Object(opt) === opt && 'name' in opt ? opt.name : '- Null -')"
        emit-value
        map-options
      />

      <q-select
        label="Policy"
        class="q-py-sm"
        v-model="policyId"
        :options="applicationStore.notifyPolicy"
        :option-value="(opt) => (Object(opt) === opt && 'id' in opt ? opt.id : null)"
        :option-label="(opt) => (Object(opt) === opt && 'name' in opt ? opt.name : '- Null -')"
        emit-value
        map-options
      />

      <q-select label="Language" class="q-py-sm" v-model="language" :options="languageList" />

      <div class="q-pt-sm">Variables</div>

      <q-input
        v-for="item in variablesInput"
        class="q-pt-sm"
        :key="item.key"
        filled
        v-model="item.value"
        :label="item.title"
      />
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

const props = defineProps({
  list: {
    type: Array,
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

const apps = new Set();
applicationStore.templates.forEach((item) => {
  apps.add(item.appName);
});

const name = ref('');
const appList = [...apps];
const app = ref(appList[0]);
const templateList = ref(applicationStore.templates.filter((item) => item.appName === app.value));
const templateId = ref(templateList.value.length > 0 ? templateList.value[0].id : null);
const language = ref(null);
const languageList = ref([]);
const variables = ref({});
const variablesInput = ref([]);
const policyId = ref(applicationStore.notifyPolicy[0].id);

function convertFirstLetterToUpperCase(str) {
  return str
    .toLowerCase()
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function updateVariables() {
  const t = applicationStore.templates.find((item) => item.id === templateId.value);
  let arr = [];
  for (let key of t.variables) {
    arr.push({
      key: key,
      value: ref(variables.value[key]),
      title: convertFirstLetterToUpperCase(key.replaceAll('_', ' '))
    });
  }

  variablesInput.value = arr;
}
updateVariables();

function updateLanguage() {
  applicationStore.templateContent
    .filter((tc) => tc.templateId == templateId.value)
    .forEach((tc) => {
      languageList.value.push(tc.language);
    });
  console.log(languageList.value);
  language.value = languageList.value[0];
}
updateLanguage();

watch(
  () => app.value,
  () => {
    templateList.value = applicationStore.templates.filter((item) => item.appName === app.value);
    templateId.value = templateList.value.length > 0 ? templateList.value[0].id : null;
  }
);

watch(
  () => templateId.value,
  () => {
    updateVariables();
    updateLanguage();
  }
);

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

  try {
    console.log('onOKClick');
    console.log(variablesInput.value);

    const variables = {};
    for (let item in variablesInput.value) {
      console.log(variablesInput.value[item].key + ' ' + variablesInput.value[item].value);
      variables[variablesInput.value[item].key] = variablesInput.value[item].value;
    }
    await applicationStore.createJob({
      templateId: templateId.value,
      notifyPolicyId: policyId.value,
      name: name.value,
      language: language.value,
      rawMessage: { vars: variables }
    });
    Loading.hide();
    onDialogOK({});
  } catch (e) {
    Loading.hide();
  }
  // or with payload: onDialogOK({ ... })
  // ...and it will also hide the dialog automatically
}
</script>
