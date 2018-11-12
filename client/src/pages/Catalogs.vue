<template>
  <div>
    <header-component title="PCC - Каталоги">
      <v-text-field v-if="searchLine"
        v-model="search"
        label="Search"
        single-line
      ></v-text-field>
      <v-btn @click="searchLine = !searchLine" icon>
        <v-icon>search</v-icon>
      </v-btn>
      <v-btn icon @click="openDialog">
        <v-icon>add</v-icon>
      </v-btn>
    </header-component>
    <v-container>
      <v-layout>
        <v-flex xs12>
          <v-breadcrumbs :items="breadcrumbs" divider=">" mb-0></v-breadcrumbs>
        </v-flex>
      </v-layout>
    </v-container>
    <v-container class="catalogs-table">
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-text-field v-model="editedItem.name" label="Имя каталога"></v-text-field>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click.native="close">Отмена</v-btn>
            <v-btn color="blue darken-1" flat @click.native="save">Сохранить</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      <v-data-table
        :headers="headers"
        :items="catalogsList"
        :search="search"
        class="elevation-1"
      >
        <template slot="items" slot-scope="props">
          <tr >
            <td>{{ props.item.name }}</td>
            <td class="text-xs-right">
              <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
              <v-icon small @click="deleteItem(props.item)">delete</v-icon>
            </td>
          </tr>
        </template>
        <v-alert slot="no-results" :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </v-data-table>
  </div>
</template>

<script>
  import headerComponent from '../components/Header';

  export default {
    async beforeMount() {
      await this.$store.dispatch('getTokenStatus');
      await this.$store.dispatch('getServerStatus');
      this.$store.commit('addBreadcrumbs', {
        text: 'Каталоги',
        disabled: false,
        href: '/catalogs'
      });
    },
    components: {
      headerComponent
    },
    computed: {
      formTitle() {
        return this.editedIndex === -1 ? 'Создание каталога' : 'Редактирование каталога';
      },
      catalogsList() {
        return this.$store.getters['catalogsList'];
      }
    },
    watch: {
      dialog(val) {
        val || this.close();
      },
      breadcrumbs() {
        return this.$store.getters.breadcrumbs;
      }
    },
    methods: {
      openDialog() {
        this.dialog = true;
      },
      openCatalog(name) {
        console.log(name);
      },
      editItem(item) {
        this.editedIndex = this.catalogsList.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.dialog = true;
      },

      deleteItem(item) {
        const index = this.catalogsList.indexOf(item);
        confirm('Вы увренеы, что хотите удалить данный каталог?') && this.$store.dispatch('spliceList', { 'index': index });
      },

      close() {
        this.dialog = false;
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem);
          this.editedIndex = -1;
        }, 300);
      },

      save() {
        if (this.editedIndex > -1) {
          this.$store.dispatch('assignList', { 'index': this.editedIndex, 'item': this.editedItem });
        } else {
          this.$store.dispatch('pushList', { 'item': this.editedItem });
        }
        this.close();
      }
    },
    data() {
      return {
        search: '',
        searchLine: false,
        dialog: false,
        headers: [
          { text: 'Имя каталога', align: 'left', sortable: true, value: 'name' },
          { text: 'Действия с каталогом', value: 'name', sortable: false, align: 'right' }
        ],
        editedIndex: -1,
        editedItem: {
          name: ''
        },
        defaultItem: {
          name: ''
        }
      };
    }
  };
</script>

<style scoped>
  .catalogs-table {
    margin-top: 100px;
  }
</style>
