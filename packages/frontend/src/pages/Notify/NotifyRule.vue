<template>
  <div class="q-pa-md column" v-if="policy">
    <div class="row q-py-sm justify-start">
      <!-- <q-select v-model="category" :options="applicationStore.categories" label="Category" class="col-3"/> -->
      <q-btn
        label="Back"
        class="col-1"
        flat
        color="primary"
        @click="
          () => {
            this.$router.push('/notify');
          }
        "
      />
    </div>
    <div class="column">
      <div class="row justify-start">
        <div class="q-pa-sm text-bold">Name</div>
        <div class="q-pa-sm">{{ policy.name }}</div>
      </div>
      <div class="row justify-start">
        <div class="q-pa-sm text-bold">isDefault</div>
        <div class="q-pa-sm">
          {{ policy.isDefault }}
        </div>
      </div>
    </div>
    <q-table
      flat
      bordered
      title="Rules"
      :rows="rules"
      :columns="columns"
      row-key="id"
      :pagination="initialPagination"
    >
      <template v-slot:top-right>
        <q-btn label="Add" class="col-1" flat color="primary" @click="addNotifyRule()" />
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

      <template v-slot:body-cell-sender="props">
        <q-td :props="props">
          {{ applicationStore.senders.find((sender) => sender.id == props.row.sender).name }}
        </q-td>
      </template>
      <template v-slot:body-cell-recipients="props">
        <q-td :props="props">
          {{
            applicationStore.recipients.find((recipients) => recipients.id == props.row.recipients)
              .name
          }}
        </q-td>
      </template>
      <template v-slot:body-cell-action="props">
        <q-td :props="props">
          <q-btn
            label="Delete"
            class="col-1"
            flat
            color="primary"
            @click="onDelete(props.row.id)"
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useApplicationStore } from '../../stores/application';
import { Loading, useQuasar } from 'quasar';
import { useRoute, useRouter } from 'vue-router';
import AddRule from './AddRule';

const columns = [
  { name: 'id', align: 'left', label: 'ID', field: 'id', sortable: false },
  // {
  //   name: 'notifyPolicyId',
  //   align: 'left',
  //   label: 'Policy',
  //   field: 'notifyPolicyId',
  //   sortable: false
  // },
  { name: 'sender', align: 'left', label: 'Sender', field: 'sender', sortable: false },
  { name: 'recipients', align: 'left', label: 'Recipients', field: 'recipients', sortable: false },
  { name: 'status', align: 'left', label: 'Status', field: 'status', sortable: false },
  { name: 'updatedAt', align: 'left', label: 'updatedAt', field: 'updatedAt', sortable: false },
  { name: 'action', align: 'right', label: 'Action', sortable: false }
];

export default {
  setup() {
    const $q = useQuasar();
    const applicationStore = useApplicationStore();
    const Route = useRoute();
    let id = ref();

    let policy = ref();
    let rules = ref([]);

    onMounted(async () => {
      id.value = Route.params.id;
      console.log(id.value);
      policy.value = applicationStore.notifyPolicy.find((t) => t.id == id.value);
      console.log(policy.value);
      rules.value = await applicationStore.getNotifyRuleByPolicyId(id.value);
    });

    function addNotifyRule() {
      $q.dialog({
        component: AddRule,
        persistent: true,
        componentProps: {
          id: id.value
        }
      }).onOk(async () => {
        rules.value = await applicationStore.getNotifyRuleByPolicyId(id.value);
      });
    }

    async function onDelete(ruleId) {
      Loading.show();
      try {
        await applicationStore.deleteNotifyRule(ruleId);
        rules.value = await applicationStore.getNotifyRuleByPolicyId(id.value);
      } finally {
        Loading.hide();
      }
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
      policy,
      rules,
      addNotifyRule,
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
