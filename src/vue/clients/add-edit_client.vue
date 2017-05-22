<div>
    <h2 class="subtitle">
        {{$t('Client')}}: {{client.name}}
    </h2>
    <div class="field">
        <label class="label" for="name">{{$t('Name')}}</label>
        <input id="name" name="name" type="text"
            :placeholder="$t('Name')"
            v-model.trim="client.name" :class="{'input': true, 'is-danger': $v.client.name.$error}"
            @input="$v.client.name.$touch()"
        />
        <span class="help is-danger"
            v-if="$v.client.name.$error && $v.client.name.$dirty">
            Field is required and must be at least 3 characters
        </span>
    </div>
    <div class="field">
        <label class="label" for="description">{{$t('Description')}}</label>
        <textarea id="description" class="textarea" v-model="client.description" :placeholder="$t('Description')"/>
    </div>
    <div class="field is-grouped">
        <p class="control">
            <button class="button is-primary" :disabled="!formIsValid" @click="$store.dispatch('clients/upsertClient')">{{$t('Save changes')}}</button>
        </p>
        <p class="control">
            <router-link class="button" :to="$helpers.lastRoute('list_clients')">{{$t('Cancel')}}</router-link>
        </p>
    </div>
</div>
