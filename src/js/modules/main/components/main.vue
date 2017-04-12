<div>
    <nav class="navbar navbar-default">
        <div class="container">
            <ul class="nav navbar-nav">
                <li><router-link to="/">Home</router-link></li>
                <li><router-link to="/partners">Partners</router-link></li>
                <li><router-link to="/clients">Clients</router-link></li>
                <li><router-link to="/login">Login</router-link></li>
            </ul>
        </div>
    </nav>
    <div class="container">
        <router-view></router-view>
    </div>
</div>
