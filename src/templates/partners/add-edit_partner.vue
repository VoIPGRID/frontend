<div>
    <h2 class="subtitle">Partner: {{partner.name}}</h2>
    <div class="field">
        <label class="label" for="name">Name</label>
        <input id="name" name="name" type="text" placeholder="Name"
            v-model.trim="partner.name" :class="{'input': true, 'is-danger': $v.partner.name.$error}"
            @input="$v.partner.name.$touch()"
        />
        <span class="help is-danger"
            v-if="$v.partner.name.$error && $v.partner.name.$dirty">
            Field is required and must be at least 3 characters
        </span>
    </div>
    <div class="field">
        <label class="label" for="description">Description</label>
        <textarea id="description" class="textarea" v-model="partner.description" placeholder="Description"/>
    </div>
    <div class="field is-grouped">
        <p class="control">
            <button class="button is-primary" :disabled="!formIsValid" @click="$store.dispatch('partners/upsertPartner')">Save changes</button>
        </p>
        <p class="control">
            <router-link class="button" :to="$helpers.lastRoute('list_partners')">Cancel</router-link>
        </p>
    </div>
</div>
