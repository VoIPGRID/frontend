<div>
    <h2 class="subtitle">Partner: {{partner.name}}</h2>
    <div class="field">
        <label class="label" for="name">Name</label>
        <input id="name" name="name" type="text" placeholder="Name" v-model="partner.name" v-validate.initial="'required'" :class="{'input': true, 'is-danger': errors.has('name')}" />
        <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
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
            <router-link class="button" to="/partners/">Cancel</router-link>
        </p>
    </div>
</div>
