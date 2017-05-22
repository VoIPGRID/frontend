<transition name="fade">
<div class="notification is-primary">
    <button class="delete" @click="closeNotification(notification)"></button>
    <div v-if="html" v-html="message"></div>
    <div v-else>
        {{ notification.message }}
    </div>
</div>
</transition>
