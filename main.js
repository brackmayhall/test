<template>
  <div id='app'>
      <b-navbar toggleable="sm" type="dark" variant="primary">
        <router-link to="/" v-if="signedIn">
          <b-navbar-brand href="">
            <img src="https://www.nicepng.com/png/detail/150-1501357_hedge-fund-marketplace-read-more-hedge-fund-icon.png" alt="fundmanager">
          </b-navbar-brand>
        </router-link>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav>
            <b-nav-item>
              <router-link to="/" v-if="signedIn">
                <b-icon icon="house"></b-icon>
                <a>Home</a>
              </router-link>
            </b-nav-item>            
            <b-nav-item>
              <router-link to="/fundmanager" v-if="signedIn">
                <b-icon icon="headset"></b-icon>
                <a>Triage</a>
              </router-link>
            </b-nav-item>               
          </b-navbar-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown right v-if="signedIn">
              <template v-slot:button-content>
                <em>{{emailDisplay}}</em>
              </template>
              <b-dropdown-item>
                <amplify-sign-out></amplify-sign-out>  
              </b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>          
        </b-collapse>
      </b-navbar>    
    <router-view></router-view>
  </div>
</template>

<script>
import { Auth, Hub } from 'aws-amplify'
export default {
  name: 'App',
  data() {
    return {
      emailDisplay: '',
      user: {},
      signedIn: false
    }
  },
  watch: {
    user: function (user) {
      if(user && user.attributes && user.attributes.email) {
        this.emailDisplay = user.attributes.email
      } else {
        this.emailDisplay = '';
      }      
    }
  },
  beforeCreate() {
    Hub.listen('auth', data => {
      const { payload } = data
      if (payload.event === 'signIn') {
        this.user = payload.data;
        this.signedIn = true;
        this.$router.push('/fundmanager')
      }
      if (payload.event === 'signOut') {
        this.user = {};
        this.$router.push('/login')
        this.signedIn = false
      }
    })
    Auth.currentAuthenticatedUser()
      .then(user => {
        this.user = user
        this.signedIn = true
      })
      .catch(() => this.signedIn = false)
  }
}
</script>

<style lang="scss">
.nav-item.nav-item.nav-item a {
  color: white;
}
</style>
