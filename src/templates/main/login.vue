<div class="login-component">
    <div class="field">
        <label class="label">Email</label>
        <p class="control has-icons-left">
            <input class="input" v-model="credentials.email" placeholder="Email address">
            <span class="icon is-small is-left">
                <i class="fa fa-user"></i>
            </span>
         </p>
    </div>

    <div class="field">
        <label class="label">Password</label>
        <p class="control has-icons-left">
            <input type="password" class="input" v-model="credentials.password" placeholder="Password">
            <span class="icon is-small is-left">
                <i class="fa fa-lock"></i>
            </span>
         </p>
    </div>

    <div class="field is-grouped">
        <p class="control">
            <button class="button is-primary" @click="$store.dispatch('main/login')">Login</button>
        </p>
    </div>
</div>
