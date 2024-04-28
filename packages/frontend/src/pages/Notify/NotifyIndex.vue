<template>
  <div class="q-pa-md column">
    <!-- <div class="row q-pa-md justify-start">
      <q-select
        v-model="category"
        :options="applicationStore.categories"
        label="Category"
        class="col-3"
      />
    </div> -->
    <q-table
      flat
      bordered
      title="Policies"
      :rows="applicationStore.notifyPolicy"
      :columns="columns"
      row-key="id"
      :pagination="initialPagination"
    >
      <template v-slot:top-right>
        <!-- <q-btn label="Save" class="col-1" flat color="primary" @click="onSave()" /> -->
        <q-btn label="Add" class="col-1" flat color="primary" @click="addPolicy()" />
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
                this.$router.push('/notify/' + props.row.id);
              }
            "
          />
          <!-- <q-btn
            :disable="props.row.id == list[0].id"
            label="Up"
            class="col-1"
            flat
            color="primary"
            @click="onUp(props.row)"
          />
          <q-btn
            :disable="props.row.id == list[list.length - 1].id"
            label="Down"
            class="col-1"
            flat
            color="primary"
            @click="onDown(props.row)"
          />
          <q-btn label="Delete" class="col-1" flat color="primary" @click="onDelete(props.row)" /> -->
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { useApplicationStore } from '../../stores/application';
import { defineComponent, ref, computed, onMounted, watch } from 'vue';
import { useQuasar } from 'quasar';
import AddPolicy from './AddPolicy';

const columns = [
  { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: false },
  { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: false },
  { name: 'isDefault', align: 'left', label: 'isDefault', field: 'isDefault', sortable: false },
  { name: 'status', align: 'left', label: 'status', field: 'status', sortable: false },
  { name: 'updatedAt', align: 'left', label: 'UpdatedAt', field: 'updatedAt', sortable: false },
  { name: 'action', align: 'right', label: 'Action', sortable: false }
];

export default {
  setup() {
    const $q = useQuasar();

    const applicationStore = useApplicationStore();

    function addPolicy() {
      $q.dialog({
        component: AddPolicy,
        persistent: true,
        componentProps: {}
      })
        .onOk(() => {
          applicationStore.refreshNotifyPolicy();
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }

    onMounted(() => {
      // updateList();
    });

    return {
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 1000
        // rowsNumber: xx if getting data from a server
      },
      columns,

      applicationStore,
      addPolicy
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
