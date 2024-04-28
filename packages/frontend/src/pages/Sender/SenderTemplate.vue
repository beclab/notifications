<template>
  <div class="q-pa-md column">
    <div class="row q-py-sm justify-start">
      <q-btn label="Back" class="col-1" flat color="primary" @click="() => {
        this.$router.push('/sender');
      }
        " />
    </div>
    <q-table flat bordered title="Sender" :rows="senderTemplates" :columns="columns" row-key="id"
      :pagination="initialPagination">
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn label="Add" class="col-1" flat color="primary" @click="addSender(props.row)" />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script lang="ts">
import { useApplicationStore } from '../../stores/application';
import { ref, onMounted, watch } from 'vue';
import { useQuasar } from 'quasar';
import { Router, useRouter } from 'vue-router';
import { senderTemplates, TerminusNotificationSenderTemplate } from '@notifications/database';
import CreateSender from './CreateSender.vue';

const columns = [
  { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: false },
  { name: 'type', align: 'left', label: 'Type', field: 'type', sortable: false },
  {
    name: 'description',
    align: 'left',
    label: 'description',
    field: 'description',
    sortable: false
  },

  { name: 'action', align: 'right', label: 'Action', sortable: false }
];

export default {
  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const applicationStore = useApplicationStore();

    const category = ref('All');
    const list = ref([]);

    function addSender(template: TerminusNotificationSenderTemplate) {
      $q.dialog({
        component: CreateSender,
        persistent: true,
        componentProps: {
          sender: template.name
        }
      })
        .onOk(async () => {
          await applicationStore.refreshSenders();
          router.push('/sender');
        })
        .onCancel(() => {
          // console.log('>>>> Cancel')
        })
        .onDismiss(() => {
          // console.log('I am triggered on both OK and Cancel')
        });
    }

    // watch(
    //   () => category.value,
    //   (newVal, oldVal) => {
    //     if (newVal == oldVal) {
    //       return;
    //     }
    //     updateList();
    //   }
    // );

    // async function onDelete(row) {
    //   // let index = list.value.findIndex((t) => t.id == row.id);
    //   // if (index < 0 || index > list.value.length - 1) {
    //   //   return;
    //   // }
    //   // list.value.splice(index, 1);
    // }

    return {
      initialPagination: {
        sortBy: 'desc',
        descending: false,
        page: 1,
        rowsPerPage: 1000
      },
      columns,
      category,
      list,
      applicationStore,
      senderTemplates,
      addSender
      //  onDelete
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
