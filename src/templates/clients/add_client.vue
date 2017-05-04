<div>
    <h2 class="subtitle">Client: new</h2>
    <div class="field">
        <label class="label" for="name">Name</label>
        <p class="control">
            <input id="name" name="name" type="text" placeholder="Name" v-model="client.name" v-validate="'required'" :class="{'input': true, 'is-danger': errors.has('name')}" />
            <span v-show="errors.has('name')" class="help is-danger">{{ errors.first('name') }}</span>
        </p>
    </div>
    <div class="field">
        <p class="control">
            <label class="label" for="description">Description</label>
            <textarea id="description" class="textarea" v-model="client.description" placeholder="Description"/>
        </p>
    </div>
    <div class="field is-grouped">
        <p class="control">
            <button class="button is-primary" :disabled="!formIsValid" @click="$store.dispatch('clients/createClient')">Save new</button>
        </p>
        <p class="control">
            <router-link class="button" to="/clients/">Cancel</router-link>
        </p>
    </div>
</div>
