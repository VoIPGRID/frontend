<div class="login-component">
    <h1>Login</h1>
    <input v-model="username" placeholder="Email address">
    <input type="password" v-model="password" placeholder="Password">
    <input type="submit">Login</input>
    <p>Username is: {{ username }}</p>
    <p>Password is: {{ password }}</p>
</div>
