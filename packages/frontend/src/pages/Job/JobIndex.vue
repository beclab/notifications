<template>
  <div class="q-pa-md column">
    <q-table
      flat
      bordered
      title="Jobs"
      :rows="applicationStore.jobs"
      :columns="columns"
      row-key="id"
      :pagination="initialPagination"
    >
      <template v-slot:top-right>
        <!-- <q-btn label="Save" class="col-1" flat color="primary" @click="onSave()" /> -->
        <q-btn label="Create" class="col-1" flat color="primary" @click="addJob()" />
      </template>

      <template v-slot:body-cell-notifyPolicyId="props">
        <q-td :props="props">
          {{
            applicationStore.notifyPolicy.find(
              (notifyPolicy) => notifyPolicy.id == props.row.notifyPolicyId
            ).name
          }}
        </q-td>
      </template>

      <template v-slot:body-cell-templateId="props">
        <q-td :props="props">
          {{
            applicationStore.templates.find((template) => template.id == props.row.templateId)
              .name +
            '(' +
            applicationStore.templates.find((template) => template.id == props.row.templateId)
              .appName +
            ')'
          }}
        </q-td>
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
                this.$router.push('/job/' + props.row.id);
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
import { ref, onMounted, watch } from 'vue';
import { useQuasar } from 'quasar';
import CreateJob from './CreateJob.vue';

const columns = [
  { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: false },
  { name: 'templateId', align: 'left', label: 'templateId', field: 'templateId', sortable: false },
  { name: 'language', align: 'left', label: 'Language', field: 'language', sortable: false },
  {
    name: 'notifyPolicyId',
    align: 'left',
    label: 'notifyPolicyId',
    field: 'notifyPolicyId',
    sortable: false
  },

  { name: 'messageNum', align: 'left', label: 'Message', field: 'messageNum', sortable: false },
  { name: 'sentNum', align: 'left', label: 'Sent', field: 'sentNum', sortable: false },
  { name: 'successNum', align: 'left', label: 'Success', field: 'successNum', sortable: false },
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
    const $q = useQuasar();

    const applicationStore = useApplicationStore();

    const category = ref('All');
    const list = ref([]);
    let isNew = false;

    function updateList() {
      let result = applicationStore.topicList.find((t) => t.category == category.value);
      if (!result) {
        isNew = true;
        list.value = [];
        return;
      }
      isNew = false;

      let l = JSON.parse(result.content);
      let r = [];
      for (const t of l) {
        let tt = applicationStore.topics.find((to) => to.id == t);
        r.push(tt);
      }

      list.value = r;
    }

    // function remainList() {
    //   return applicationStore.topics.filter((to) => !list.value.find((t) => t.id == to.id));
    // }

    function addJob() {
      $q.dialog({
        component: CreateJob,
        persistent: true,
        componentProps: {}
      })
        .onOk(async () => {
          await applicationStore.refreshJobs();
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

    onMounted(() => {
      // updateList();
    });

    async function onSave() {
      $q.loading.show();
      try {
        let obj = {
          category: category.value,
          content: JSON.stringify(list.value.map((t) => t.id))
        };
        console.log(obj);

        if (isNew) {
          await applicationStore.createTopicList(obj);
        } else {
          await applicationStore.updateTopicList(obj);
        }

        updateList();

        // router.push({ path: '/topicsRepo' });
      } catch (e) {
        console.log(e);
        $q.notify({
          type: 'negative',
          message: e.message || 'Something Wrong. Please try again!'
        });
      } finally {
        $q.loading.hide();
      }
    }

    async function onDelete(row) {
      let index = list.value.findIndex((t) => t.id == row.id);

      if (index < 0 || index > list.value.length - 1) {
        return;
      }
      list.value.splice(index, 1);
    }

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
      addJob
      // addTopic,
      // onSave,
      // onDelete
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
