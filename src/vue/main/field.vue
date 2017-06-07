<div class="field" v-if="type === 'checkbox'">
    <p class="control">
        <input type="checkbox" v-bind:checked="vmodel" v-on:click="vChange($event.target.value)"
            :id="name" />
        <label :for="name" class="checkbox" @click="vClick" v-on:click="vChange(vmodel)">{{label}}</label>
        <p class="help" v-if="help">{{help}}</p>
    </p>
</div>

<div class="field" v-else-if="type === 'text'">
    <label class="label" :for="name">{{label}}</label>
    <input type="text" :id="name" :name="name" v-bind:value="vmodel"
        v-on:input="vChange($event.target.value)" class="input"
        :placeholder="placeholder" />
    <p class="help" v-if="help">{{help}}</p>
    <span class="help is-danger" v-if="vInvalid()" v-html="validationMessage"></span>
</div>

<div class="field" v-else-if="type === 'textarea'">
    <label class="label" :for="name">{{label}}</label>
    <textarea :id="name" :name="name" class="textarea" v-bind:value="vmodel"
        v-on:input="vChange($event.target.value)" :placeholder="placeholder"/>
    <span class="help is-danger" v-if="vInvalid()" v-html="validationMessage"></span>
</div>

<div class="field" v-else-if="type === 'select'">
    <label class="label" :for="name">{{label}}</label>
    <p class="help" v-if="help">{{help}}</p>
    <span class="select">
        <select class="select" type="text" v-on:change="vChange($event.target.value)" :id="name" :name="name">
            <option v-if="placeholder" value="">{{placeholder}}</option>
            <option v-for="option in options" v-bind:selected="option[idfield] == vmodel" v-bind:value="option[idfield]">
            {{ option[namefield] }}
            </option>
        </select>
    </span>
</div>

<div class="field" v-else-if="type === 'color'">
    <label class="label" :for="name">{{label}}</label>
    <input :disabled="disabled" type="color" v-on:change="vChange($event.target.value)" v-bind:value="vmodel" class="input"/>
</div>
