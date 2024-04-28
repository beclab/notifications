<template>
  <div class="q-pa-md column" v-if="job">
    <div class="row q-py-sm justify-start">
      <q-btn
        label="Back"
        class="col-1"
        flat
        color="primary"
        @click="
          () => {
            this.$router.push('/job');
          }
        "
      />
    </div>
    <div class="column">
      <div class="row justify-start">
        <div class="q-pa-sm text-bold">ID</div>
        <div class="q-pa-sm">{{ job.id }}</div>
      </div>
      <div class="row justify-start">
        <div class="q-pa-sm text-bold">Language</div>
        <div class="q-pa-sm">
          {{ job.language }}
        </div>
      </div>
      <div class="row justify-start">
        <div class="q-pa-sm text-bold">messageNum</div>
        <div class="q-pa-sm">
          {{ job.messageNum }}
        </div>
      </div>
      <div class="row justify-start">
        <div class="q-pa-sm text-bold">sentNum</div>
        <div class="q-pa-sm">
          {{ job.sentNum }}
        </div>
      </div>
      <div class="row justify-start">
        <div class="q-pa-sm text-bold">successNum</div>
        <div class="q-pa-sm">
          {{ job.successNum }}
        </div>
      </div>

      <div class="row justify-start">
        <div class="q-pa-sm text-bold">CreatedAt</div>
        <div class="q-pa-sm">
          {{ job.createdAt }}
        </div>
      </div>
      <div class="row justify-start">
        <div class="q-pa-sm text-bold">UpdatedAt</div>
        <div class="q-pa-sm">
          {{ job.updatedAt }}
        </div>
      </div>
    </div>
    <q-table
      flat
      bordered
      title="Message"
      :rows="messages"
      :columns="columns"
      row-key="id"
      :pagination="initialPagination"
    >
      <template v-slot:body-cell-edit="props">
        <q-td :props="props"> </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useApplicationStore } from '../../stores/application';
import { useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';

const columns = [
  { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: false },
  { name: 'message', align: 'left', label: 'Message', field: 'message', sortable: false },
  {
    name: 'recipientType',
    align: 'left',
    label: 'recipientType',
    field: 'recipientType',
    sortable: false
  },
  {
    name: 'recipient',
    align: 'left',
    label: 'Recipient',
    field: 'recipient',
    sortable: false,
    style: 'width: 150px'
  },
  { name: 'senderType', align: 'left', label: 'senderType', field: 'senderType', sortable: false },
  {
    name: 'sender',
    align: 'left',
    label: 'sender',
    field: 'sender',
    sortable: false,
    style: 'width: 200px'
  },
  { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: false },
  {
    name: 'createdAt',
    align: 'left',
    label: 'createdAt',
    field: 'createdAt',
    sortable: false
  },
  {
    name: 'updatedAt',
    align: 'left',
    label: 'updatedAt',
    field: 'updatedAt',
    sortable: false
  },
  { name: 'action', align: 'right', label: 'Action', sortable: false }
];

export default {
  setup() {
    // const $q = useQuasar();
    const applicationStore = useApplicationStore();
    const Route = useRoute();
    //const Router = useRouter();
    let id = ref();

    let job = ref();
    let messages = ref([]);

    onMounted(async () => {
      id.value = Route.params.id;
      console.log(id.value);
      job.value = applicationStore.jobs.find((t) => t.id == id.value);
      console.log(job.value);
      messages.value = await applicationStore.getMessageByJob(id.value);
    });

    return {
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 1000
      },
      columns,
      applicationStore,
      messages,
      job
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
