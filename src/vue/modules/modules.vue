<div class="modules vg-masonry-page masonry-4">
    <div class="vg-box-wrapper">
        <h4>{{$t('General')}}</h4>
        <div class="vg-box">
            <div class="module" :disabled="module.disabled" v-for="module of modules.general">
                <router-link v-if="!module.disabled" :to="{name: module.route}">
                    <i v-bind:class="['vg-icon', module.icon]"></i>{{$t(module.name)}}
                </router-link>
                <template v-else><i v-bind:class="['vg-icon', module.icon]"></i>{{$t(module.name)}}</template>
            </div>
        </div>
    </div>

    <div class="vg-box-wrapper">
        <h4>{{$t('Call forwarding')}}</h4>
        <div class="vg-box">
            <div class="module" :disabled="module.disabled" v-for="module of modules.forwarding">
                <router-link v-if="!module.disabled" :to="{name: module.route}">
                    <i v-bind:class="['vg-icon', module.icon]"></i>{{$t(module.name)}}
                </router-link>
                <template v-else><i v-bind:class="['vg-icon', module.icon]"></i>{{$t(module.name)}}</template>
            </div>
        </div>
    </div>

    <div class="vg-box-wrapper">
        <h4>{{$t('Options')}}</h4>
        <div class="vg-box">
            <div class="module" :disabled="module.disabled" v-for="module of modules.options">
                <router-link v-if="!module.disabled" :to="{name: module.route}">
                    <i v-bind:class="['vg-icon', module.icon]"></i>{{$t(module.name)}}
                </router-link>
                <template v-else><i v-bind:class="['vg-icon', module.icon]"></i>{{$t(module.name)}}</template>
            </div>
        </div>
    </div>

    <div class="vg-box-wrapper">
        <h4>{{$t('Fax')}}</h4>
        <div class="vg-box">
            <div class="module" :disabled="module.disabled" v-for="module of modules.fax">
                <router-link v-if="!module.disabled" :to="{name: module.route}">
                    <i v-bind:class="['vg-icon', module.icon]"></i>{{$t(module.name)}}
                </router-link>
                <template v-else><i v-bind:class="['vg-icon', module.icon]"></i>{{$t(module.name)}}</template>
            </div>
        </div>
    </div>

    <div class="vg-box-wrapper">
        <h4>{{$t('Advanced options')}}</h4>
        <div class="vg-box">
            <div class="module" :disabled="module.disabled" v-for="module of modules.advanced">
                <router-link v-if="!module.disabled" :to="{name: module.route}">
                    <i v-bind:class="['vg-icon', module.icon]"></i>{{$t(module.name)}}
                </router-link>
                <template v-else><i v-bind:class="['vg-icon', module.icon]"></i>{{$t(module.name)}}</template>
            </div>
        </div>
    </div>

    <div class="vg-box-wrapper">
        <h4>{{$t('System management')}}</h4>
        <div class="vg-box">
            <div class="module" :disabled="module.disabled" v-for="module of modules.system">
                <router-link v-if="!module.disabled" :to="{name: module.route}">
                    <i v-bind:class="['vg-icon', module.icon]"></i>{{$t(module.name)}}
                </router-link>
                <template v-else><i v-bind:class="['vg-icon', module.icon]"></i>{{$t(module.name)}}</template>
            </div>
        </div>
    </div>

    <div class="vg-box-wrapper">
        <h4>{{$t('Integrations')}}</h4>
        <div class="vg-box">
            <div class="module" :disabled="module.disabled" v-for="module of modules.integrations">
                <router-link v-if="!module.disabled" :to="{name: module.route}">
                    <i v-bind:class="['vg-icon', module.icon]"></i>{{$t(module.name)}}
                </router-link>
                <template v-else><i v-bind:class="['vg-icon', module.icon]"></i>{{$t(module.name)}}</template>
            </div>
        </div>
    </div>
</div>
