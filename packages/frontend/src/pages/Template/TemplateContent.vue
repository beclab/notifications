<template>
  <div class="q-pa-md column" v-if="template">
    <div class="row q-py-sm justify-start">
      <!-- <q-select v-model="category" :options="applicationStore.categories" label="Category" class="col-3"/> -->
      <q-btn
        label="Back"
        class="col-1"
        flat
        color="primary"
        @click="
          () => {
            this.$router.push('/template');
          }
        "
      />
    </div>
    <div class="column">
      <div class="row justify-start">
        <div class="q-pa-sm text-bold">Name</div>
        <div class="q-pa-sm">{{ template.name }}</div>
      </div>
      <div class="row justify-start">
        <div class="q-pa-sm text-bold">App</div>
        <div class="q-pa-sm">
          {{ template.appId }} / {{ template.appName }} / {{ template.appTemplateName }}
        </div>
      </div>
      <div class="row justify-start">
        <div class="q-pa-sm text-bold">Variables</div>
        <div class="q-pa-sm">
          {{ template.variables.join() }}
        </div>
      </div>
      <div class="row justify-start">
        <div class="q-pa-sm text-bold">CreatedAt</div>
        <div class="q-pa-sm">
          {{ template.createdAt }}
        </div>
      </div>
      <div class="row justify-start">
        <div class="q-pa-sm text-bold">UpdatedAt</div>
        <div class="q-pa-sm">
          {{ template.updatedAt }}
        </div>
      </div>
    </div>
    <q-table
      flat
      bordered
      title="Template Content"
      :rows="templateContent"
      :columns="columns"
      row-key="id"
      :pagination="initialPagination"
    >
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

const columns = [
  { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: false },
  { name: 'language', align: 'left', label: 'Language', field: 'language', sortable: false },
  { name: 'title', align: 'left', label: 'Title', field: 'title', sortable: false },
  { name: 'body', align: 'left', label: 'Body', field: 'body', sortable: false }
];

export default {
  setup() {
    // const $q = useQuasar();
    const applicationStore = useApplicationStore();
    const Route = useRoute();
    //const Router = useRouter();
    let id = ref();

    let template = ref();
    let templateContent = ref([]);

    onMounted(() => {
      id.value = Route.params.id;
      console.log(id.value);
      template.value = applicationStore.templates.find((t) => t.id == id.value);
      console.log(template);
      templateContent.value = applicationStore.templateContent.filter(
        (t) => t.templateId == id.value
      );
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
      templateContent,
      template
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
