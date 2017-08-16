<div id="app">
    <div class="wrapper" v-if="user.authenticated">
        <Shouts :shouts="shouts"></Shouts>
        <Navigation></Navigation>
        <section>
            <ContentHeader></ContentHeader>
            <div class="content">
                <router-view></router-view>
            </div>
        </section>
    </div>
    <div v-else>
        <UserLogin></UserLogin>
    </div>
</div>
