<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Warning! delete client <i>{{client.name}}</i>?</p>
        <router-link :to="{name: 'list_clients'}"><button class="delete"></button></router-link>
      </header>
      <section class="modal-card-body">
        <div class="content">
            <p>You're about to remove client <i>{{client.name}}</i>. Are you sure?</p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <a class="button is-danger" @click="$store.dispatch('clients/deleteClient')">Confirm</a>
        <router-link class="button" :to="{name: 'list_clients'}">Cancel</router-link>
      </footer>
    </div>
</div>
