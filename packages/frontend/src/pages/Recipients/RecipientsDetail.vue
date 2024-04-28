<template>
  <div class="q-pa-md column" v-if="recipients">
    <div class="row q-py-sm justify-start">
      <q-btn
        label="Back"
        class="col-1"
        flat
        color="primary"
        @click="
          () => {
            this.$router.push('/recipients');
          }
        "
      />
    </div>
    <div class="column">
      <div class="row justify-start">
        <div class="q-pa-sm text-bold">Name</div>
        <div class="q-pa-sm">{{ recipients.name }}</div>
      </div>

      <div class="row justify-start">
        <div class="q-pa-sm text-bold">Type</div>
        <div class="q-pa-sm">{{ recipients.type }}</div>
      </div>

      <div class="row justify-start">
        <div class="q-pa-sm text-bold">CreatedAt</div>
        <div class="q-pa-sm">
          {{ recipients.createdAt }}
        </div>
      </div>
      <div class="row justify-start">
        <div class="q-pa-sm text-bold">UpdatedAt</div>
        <div class="q-pa-sm">
          {{ recipients.updatedAt }}
        </div>
      </div>
    </div>
    <q-table
      flat
      bordered
      title="Recipients Address"
      :rows="recipientAddress"
      :columns="columns"
      row-key="id"
      :pagination="initialPagination"
    >
      <template v-slot:top-right>
        <q-btn label="Add" class="col-1" flat color="primary" @click="addRecipientsAddress()" />
      </template>

      <template v-slot:body-cell-data="props">
        <q-td :props="props">
          {{ JSON.stringify(props.row.data) }}
        </q-td>
      </template>

      <template v-slot:body-cell-edit="props">
        <q-td :props="props">
          <q-btn
            label="Edit"
            class="col-1"
            flat
            color="primary"
            @click="
              () => {
                this.$router.push('/topic/' + props.row.id);
              }
            "
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useApplicationStore } from '../../stores/application';
import { useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import CreateRecipients from './CreateRecipient';

const columns = [
  { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: false },
  { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: false },
  { name: 'data', align: 'left', label: 'Data', field: 'data', sortable: false },
  { name: 'action', align: 'right', label: 'Action', sortable: false }
];

export default {
  setup() {
    const $q = useQuasar();
    const applicationStore = useApplicationStore();
    const Route = useRoute();
    //const Router = useRouter();
    let id = ref();

    let recipients = ref();
    let recipientAddress = ref([]);

    onMounted(() => {
      id.value = Route.params.id;
      console.log(id.value);
      recipients.value = applicationStore.recipients.find((t) => t.id == id.value);
      console.log(recipients);
      recipientAddress.value = applicationStore.recipientAddress.filter(
        (t) => t.recipientsId == id.value
      );
    });

    function addRecipientsAddress() {
      $q.dialog({
        component: CreateRecipients,
        persistent: true,
        componentProps: {
          id: id.value
        }
      })
        .onOk(async () => {
          await applicationStore.refreshRecipientAddress();
          recipientAddress.value = applicationStore.recipientAddress.filter(
            (t) => t.recipientsId == id.value
          );
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }

    return {
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 1000
      },
      columns,
      addRecipientsAddress,
      applicationStore,
      recipientAddress,
      recipients
    };
  }
};
</script>

<style>
.my-table-details {
  font-size: 0.85em;
  font-style: italic;
  max-width: 200px;
  white-space: normal;
  color: #555;
  margin-top: 4px;
}
</style>
