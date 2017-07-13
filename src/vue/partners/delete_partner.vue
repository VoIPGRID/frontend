<div class="modal is-active">
  <div class="modal-background"></div>
  <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">{{$t('Remove')}} {{$t('partner')}} <i>{{partner.name}}</i>?</p>
        <router-link :to="{name: 'list_partners'}"><button class="delete"></button></router-link>
      </header>
      <section class="modal-card-body">
        <div class="content">
            <p>{{$t('Warning')}}! {{$t('Proceed with removing')}} {{$t('partner')}} <i>{{partner.name}}</i>?</p>
        </div>
      </section>
      <footer class="modal-card-foot">
        <a class="button is-primary" @click="deletePartner(partner)">{{$t('Confirm')}}</a>
        <router-link class="button" :to="{name: 'list_partners'}">{{$t('Cancel')}}</router-link>
      </footer>
    </div>
</div>
