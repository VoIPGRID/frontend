<div class="field" v-if="type === 'checkbox'">
    <p class="control">
        <input type="checkbox" v-bind:checked="vmodel"
            v-on:click="vChange($event.target.value)" :id="name"/>
        <label class="checkbox" @click="vClick" v-on:click="vChange(vmodel)" :for="name">
            {{label}}
        </label>
        <em class="help" v-if="help">{{help}}</em>
    </p>
</div>

<div class="field" v-else-if="type === 'text'">
    <label class="label" :for="name">{{label}}</label>
    <input type="text" v-bind:class="{'is-danger': vInvalid(), 'input': true}"
        v-on:input="vChange($event.target.value)" v-bind:value="vmodel"
        :id="name" :name="name" :placeholder="placeholder"/>
    <em class="help" v-if="help">{{help}}</em>
    <span class="help is-danger" v-if="vInvalid()" v-html="validationMessage"></span>
</div>

<div class="field" v-else-if="type === 'textarea'">
    <label class="label" :for="name">{{label}}</label>
    <textarea class="textarea" v-on:input="vChange($event.target.value)" v-bind:value="vmodel"
         :id="name" :name="name" :placeholder="placeholder"/>
    <span class="help is-danger" v-html="validationMessage" v-if="vInvalid()"></span>
</div>

<div class="field" v-else-if="type === 'select'">
    <label class="label" :for="name">{{label}}</label>
    <span class="select">
        <select class="select" type="text" v-on:change="vChange($event.target.value)" :id="name" :name="name">
            <option value="" v-if="placeholder">{{placeholder}}</option>
            <option v-bind:selected="option[idfield] == vmodel"
                v-bind:value="option[idfield]" v-for="option in options">
                {{ option[namefield] }}
            </option>
        </select>
    </span>
    <em class="help" v-if="help">{{help}}</em>
</div>

<div class="field" v-else-if="type === 'color'">
    <label class="label" :for="name">{{label}}</label>
    <input class="input" type="color" v-on:change="vChange($event.target.value)"
        v-bind:value="vmodel" :disabled="disabled"/>
</div>

<div class="field" v-else-if="type === 'file'">
    <label class="label" :for="name">{{label}}</label>
    <input type="file" />
    <em class="help" v-if="help">{{help}}</em>
</div>
