<template>
  <div class="q-pa-md column">
    <!-- <div class="row q-pa-md justify-between">
      <q-select
        v-model="category"
        :options="applicationStore.templates"
        label="Category"
        class="col-3"
      />
      <q-btn
        label="Topic Repo"
        class="col-2"
        flat
        color="primary"
        @click="
          () => {
            this.$router.push('/topicsRepo');
          }
        "
      />
    </div> -->
    <q-table
      flat
      bordered
      title="Templates"
      :rows="applicationStore.templates"
      :columns="columns"
      row-key="id"
      :pagination="initialPagination"
    >
      <!-- <template v-slot:top-right>
        <q-btn label="Save" class="col-1" flat color="primary" @click="onSave()" />
        <q-btn label="Add" class="col-1" flat color="primary" @click="addTopic()" />
      </template> -->
      <template v-slot:body-cell-variables="props">
        <q-td :props="props">
          {{ props.row.variables.join() }}
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
                this.$router.push('/template/' + props.row.id);
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

const columns = [
  { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: false },
  { name: 'name', align: 'left', label: 'Name', field: 'name', sortable: false },
  { name: 'appId', align: 'left', label: 'AppId', field: 'appId', sortable: false },
  { name: 'appName', align: 'left', label: 'appName', field: 'appName', sortable: false },
  {
    name: 'appTemplateName',
    align: 'left',
    label: 'appTemplateName',
    field: 'appTemplateName',
    sortable: false
  },
  {
    name: 'defaultLanguage',
    align: 'left',
    label: 'defaultLanguage',
    field: 'defaultLanguage',
    sortable: false
  },
  // {
  //   name: 'variables',
  //   align: 'left',
  //   label: 'variables',
  //   field: 'variables',
  //   sortable: false
  // },
  {
    name: 'notifyGroup',
    align: 'left',
    label: 'notifyGroup',
    field: 'notifyGroup',
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

    function addTopic() {
      let res = remainList();

      let r = [];
      for (const rr of res) {
        r.push({
          label: rr.name,
          value: rr.id
        });
      }

      $q.dialog({
        component: TopicDialog,
        componentProps: {
          list: r
        }
      })
        .onOk((data) => {
          console.log('>>>> OK, received', data);
          let res = applicationStore.topics.find((t) => t.id == data.choose);
          if (res) {
            list.value.push(res);
          }
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
      addTopic,
      onSave,
      onDelete
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
