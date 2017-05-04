<div>
    <h2 class="subtitle">Client: {{client.name}}</h2>
    <div class="field">
        <label class="label" for="edit-name">Name</label>
        <input id="edit-name" class="input" type="text" v-model="client.name" required/>
    </div>
    <div class="field">
        <label class="label" for="edit-description">Description</label>
        <textarea id="edit-description" class="textarea" v-model="client.description" required/>
    </div>
    <div class="field is-grouped">
        <p class="control">
            <button class="button is-primary" @click="$store.dispatch('clients/updateClient')">Save changes</button>
        </p>
        <p class="control">
            <router-link class="button" to="/clients/">Cancel</router-link>
        </p>
    </div>
</div>
