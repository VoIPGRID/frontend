<div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-card">
        <header class="modal-card-head">
            <p class="modal-card-title">{{$t('Remove')}} {{$t('VoIP account')}} <i>{{phoneaccount.account_id}}</i>?</p>
        <router-link :to="{name: 'list_clients'}"><button class="delete"></button></router-link>
        </header>
        <section class="modal-card-body">
            <div class="content">
                <p>{{$t('Warning')}}! {{$t('Proceed with removing')}} {{$t('VoIP account')}} <i>{{phoneaccount.account_id}}</i>?</p>
            </div>
        </section>
        <footer class="modal-card-foot">
            <a class="button is-primary" @click="deletePhoneaccount($store.user.selectedClient, phoneaccount)">{{$t('Confirm')}}</a>
        <router-link class="button" :to="{name: 'list_phoneaccounts'}">{{$t('Cancel')}}</router-link>
        </footer>
    </div>
</div>
