<template>
  <q-dialog ref="dialogRef" @hide="onDialogHide">
    <q-card class="q-dialog-plugin q-pa-lg" style="min-height: 200px">
      <!-- <q-input class="q-pt-sm" filled v-model="name" label="Name" /> -->
      <q-select label="Sender" class="q-py-sm" v-model="senderId" :options="applicationStore.senders"
        :option-value="(opt) => (Object(opt) === opt && 'id' in opt ? opt.id : null)"
        :option-label="(opt) => (Object(opt) === opt && 'name' in opt ? opt.name : '- Null -')" emit-value map-options />
      <q-select label="Recipients" class="q-py-sm" v-model="recipientsId" :options="recipientsList"
        :option-value="(opt) => (Object(opt) === opt && 'id' in opt ? opt.id : null)"
        :option-label="(opt) => (Object(opt) === opt && 'name' in opt ? opt.name : '- Null -')" emit-value map-options />

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
import { ref, watch } from 'vue';
import { recipientTemplates } from '@notifications/database';
import { useQuasar } from 'quasar';

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
const $q = useQuasar();
const name = ref('');
const templateId = ref(recipientTemplates[0].name);
const policy = ref(applicationStore.notifyPolicy.find((t) => t.id == props.id));
const senderId = ref(applicationStore.senders[0].id);
const recipientsList = ref([]);
const recipientsId = ref();

function updateRecipients() {
  const sender = applicationStore.senders.find((f) => f.id == senderId.value);
  recipientsList.value = applicationStore.recipients.filter((f) => f.type == sender.recipientType);
  if (recipientsList.value.length > 0) {
    recipientsId.value = recipientsList.value[0].id;
  } else {
    recipientsId.value = undefined;
  }
}
updateRecipients();

watch(
  () => senderId.value,
  () => {
    updateRecipients();
  }
);

const { dialogRef, onDialogHide, onDialogOK, onDialogCancel } = useDialogPluginComponent();

// this is part of our example (so not required)
async function onOKClick() {
  // on OK, it is REQUIRED to
  // call onDialogOK (with optional payload)
  Loading.show();

  if (!recipientsId.value) {
    $q.notify({
      color: 'negative',
      message: 'Need Recipients'
    });
    Loading.hide();
    return;
  }

  try {
    console.log('onOKClick');

    await applicationStore.createNotifyRule({
      notifyPolicyId: Number(props.id),
      sender: senderId.value,
      recipients: recipientsId.value,
      status: 'Active'
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
