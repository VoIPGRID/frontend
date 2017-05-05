<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Warning! delete partner <i>{{partner.name}}</i>?</p>
        <router-link :to="{name: 'list_partners'}"><button class="delete"></button></router-link>
      </header>
      <section class="modal-card-body">
        <div class="content">
            <p>You're about to remove partner <i>{{partner.name}}</i>. Are you sure?</p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <a class="button is-primary" @click="$store.dispatch('partners/deletePartner')">Confirm</a>
        <router-link class="button" :to="{name: 'list_partners'}">Cancel</router-link>
      </footer>
    </div>
</div>
