<template>
  <div class="q-pa-md column">
    <!-- <div class="row q-pa-md">
      <div class="col-3">
        <q-select v-model="category" :options="applicationStore.categories" label="Category" />
      </div>
    </div> -->
    <q-table
      flat
      bordered
      title="Recipients"
      :rows="applicationStore.recipients"
      :columns="columns"
      row-key="appid"
      :pagination="initialPagination"
    >
      <template v-slot:top-right>
        <!-- <q-btn label="Save" class="col-1" flat color="primary" @click="onSave()" /> -->
        <q-btn
          label="Create"
          class="col-1"
          flat
          color="primary"
          @click="addRecipientCollection()"
        />
      </template>

      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn
            label="View"
            class="col-1"
            flat
            color="primary"
            @click="
              () => {
                this.$router.push('/recipients/' + props.row.id);
              }
            "
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { useApplicationStore } from '../../stores/application';
import { ref, computed } from 'vue';
import { useQuasar } from 'quasar';
import AddRecipientsCollection from './AddRecipientsCollection';

const columns = [
  { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: false },
  { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: false },
  {
    name: 'type',
    align: 'left',
    label: 'Type',
    field: 'type',
    sortable: false
  },
  {
    name: 'status',
    align: 'left',
    label: 'status',
    field: 'status',
    sortable: false
  },
  {
    name: 'updatedAt',
    align: 'right',
    label: 'updatedAt',
    field: 'updatedAt',
    sortable: false
  },

  { name: 'action', align: 'right', label: 'Action', sortable: false }
];

export default {
  setup() {
    const $q = useQuasar();
    const applicationStore = useApplicationStore();

    function addRecipientCollection() {
      $q.dialog({
        component: AddRecipientsCollection,
        persistent: true,
        componentProps: {}
      })
        .onOk(async () => {
          await applicationStore.refreshRecipients();
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
      applicationStore,
      addRecipientCollection
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
