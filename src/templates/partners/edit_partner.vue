<div>
    <h2 class="subtitle">Partner: {{partner.name}}</h2>
    <div class="field">
        <label class="label" for="edit-name">Name</label>
        <input id="edit-name" class="input" type="text" v-model="partner.name" required/>
    </div>
    <div class="field">
        <label class="label" for="edit-description">Description</label>
        <textarea id="edit-description" class="textarea" v-model="partner.description" required/>
    </div>
    <div class="field is-grouped">
        <p class="control">
            <button class="button is-primary" @click="$store.dispatch('partners/updatePartner')">Save changes</button>
        </p>
        <p class="control">
            <router-link class="button" to="/partners/">Cancel</router-link>
        </p>
    </div>
</div>
