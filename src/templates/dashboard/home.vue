<div class="tile is-ancestor dashboard-home">
    <div class="tile is-12 is-horizontal is-parent">
        <div class="module tile is-child box is-2" v-for="module in modules">
            <span class="icon">
                <i v-bind:class="['fa', module.icon]"></i>
            </span>
            <p class="subtitle">{{module.name}}</p>
        </div>
    </div>
</div>
