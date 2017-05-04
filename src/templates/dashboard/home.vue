<div class="dashboard-home">
    <div class="tile is-ancestor" v-for="row in $helpers.chunk(modules, 4)">
        <div v-for="module in row" :class="{'is-3': true, tile: true}">
            <div class="tile is-parent">
                <div class="module tile is-child button is-light  is-primary is-outlined" :disabled="module.disabled">
                    <span class="icon">
                        <i v-bind:class="['vg-icon', module.icon]"></i>
                    </span>
                    <p class="subtitle">{{module.name}}</p>
                </div>
            </div>
        </div>
    </div>
</div>
