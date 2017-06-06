<div class="field" v-if="type === 'text'">
    <label class="label" :for=name>{{label}}</label>
    <input type="text" :id=name :name=name v-bind:value="vmodel" v-on:input="updateValue($event.target.value)" class="input" :placeholder=placeholder />
    <span class="help is-danger" v-if="isInvalid()" v-html=validationMessage>
    </span>
</div>

<div class="field" v-else-if="type === 'textarea'">
    <label class="label" for="description">{{label}}</label>
    <textarea :id=name :name=name class="textarea" v-bind:value="vmodel" v-on:input="updateValue($event.target.value)" :placeholder=placeholder />
</div>

<div class="field" v-else-if="type === 'select'">
    <label class="label" for="owner">{{$t('Owner')}}</label>
    <span class="select">
        <select id="owner" class="select" name="owner" type="text" v-model="partner.owner">
            <option value="" disabled>{{placeholder}}</option>
            <option v-for="option in owners" v-bind:value="option.id">
            {{ option.name }}
            </option>
        </select>
    </span>
</div>
