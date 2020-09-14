<template>
  <div class="Auth">
    <amplify-authenticator username-alias="email">
      <amplify-sign-up
      validationErrors="true"
        slot="sign-up"
        username-alias="email"
        :form-fields.prop="formFields"
      ></amplify-sign-up>
      <amplify-sign-in slot="sign-in" username-alias="email"></amplify-sign-in>
    </amplify-authenticator>
  </div>
</template>

<script>

export default {
  name: 'Auth',
  data() {
    return {
      formFields: [
        {
          type: 'email',
          label: 'Email Address *',
          placeholder: 'Email',
          required: true,
        },
        {
          type: 'password',
          label: 'Password *',
          placeholder: 'Password',
          required: true,
        }
      ]
    }
  }
}
</script>
<style lang="scss">
.Auth {
  margin: 50px auto;
  width: 460px;
}
</style>
