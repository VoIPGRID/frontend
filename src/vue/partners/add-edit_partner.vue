<div>
    <Tabs>
      <Tab id="partner" :title="$t('Partner')">
          <div class="field">
              <label class="label" for="name">{{$t('Name')}}</label>
              <input id="name" name="name" type="text" :placeholder="$t('Name')"
                  v-model.trim="partner.name" :class="{'input': true, 'is-danger': $v.partner.name.$error}"
                  @input="$v.partner.name.$touch()"
              />
              <span class="help is-danger"
                  v-if="$v.partner.name.$error && $v.partner.name.$dirty">
                  Field is required and must be at least 3 characters
              </span>
          </div>
          <div class="field">
              <label class="label" for="description">{{$t('Description')}}</label>
              <textarea id="description" class="textarea" v-model="partner.description" :placeholder="$t('Description')"/>
          </div>

          <div class="field">
              <label class="label" for="foreign_code">{{$t('Foreign code')}}</label>
              <input id="foreign_code" name="foreign_code" type="text" :placeholder="$t('Foreign code')"
                  v-model.trim="partner.foreign_code" :class="{'input': true, 'is-danger': $v.partner.foreign_code.$error}"
                  @input="$v.partner.foreign_code.$touch()"
              />
              <span class="help is-danger"
                  v-if="$v.partner.foreign_code.$error && $v.partner.foreign_code.$dirty">
                  Field is required and must be at least 16 characters
              </span>
          </div>

          <div class="field is-grouped">
              <p class="control">
                  <button class="button is-primary"
                      :disabled="!formIsValid"
                      @click="$store.dispatch('partners/upsertPartner')">
                      {{$t('Save changes')}}
                  </button>
              </p>
              <p class="control">
                  <router-link class="button" :to="$helpers.lastRoute('list_partners')">{{$t('Cancel')}}</router-link>
              </p>
          </div>
      </Tab>
      <Tab id="preferences" :title="$t('Preferences')">
          <div>Content B</div>
      </Tab>
      <Tab id="billing" :title="$t('Billing Preferences')">
          <p>Content C</p>
      </Tab>
    </Tabs>
</div>
