<div>
    <h2 class="subtitle">{{ $formatMessage('client', {name: client.name}) }}</h2>
    <div class="field">
        <label class="label" for="name">Name</label>
        <input id="name" name="name" type="text" placeholder="Name"
            v-model.trim="client.name" :class="{'input': true, 'is-danger': $v.client.name.$error}"
            @input="$v.client.name.$touch()"
        />
        <span class="help is-danger"
            v-if="$v.client.name.$error && $v.client.name.$dirty">
            Field is required and must be at least 3 characters
        </span>
    </div>
    <div class="field">
        <label class="label" for="description">Description</label>
        <textarea id="description" class="textarea" v-model="client.description" placeholder="Description"/>
    </div>
    <div class="field is-grouped">
        <p class="control">
            <button class="button is-primary" :disabled="!formIsValid" @click="$store.dispatch('clients/upsertClient')">Save changes</button>
        </p>
        <p class="control">
            <router-link class="button" :to="$helpers.lastRoute('list_clients')">Cancel</router-link>
        </p>
    </div>
</div>
