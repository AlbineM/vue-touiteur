<template>
  <div class="send-form">
      <form @submit="registerSubmit">
        <label for="register-username">Username</label>
        <input type="text"
               name="username"
               v-model="registerUsername"
               id="register-username"
               placeholder="Blahman32"
        />

        <label for="register-password">Password</label>
        <input type="password"
               name="register-password"
               v-model="registerPassword"
               id="register-password"
               placeholder="*********"
        />
        <input type="submit" value="S'enregistrer"/>
      </form>
      <form @submit="loginSubmit">
        <label for="login-username">Username</label>
        <input type="text"
               name="login-username"
               v-model="loginUsername"
               id="login-username"
               placeholder="Blahman32"
        />

        <label for="login-password">Password</label>
        <input type="password"
               name="login-password"
               v-model="loginPassword"
               id="login-password"
               placeholder="*********"/>
        <input type="submit" value="Se connecter"/>
      </form>
      <div>
        <button @click="disconnect">Se déconnecter</button>
      </div>
  </div>
</template>

<script>
//IMPORTS
import API from "@/data/api";

export default {
  name: "AuthenticationSubview",

  data(){
    return{
      loginUsername: '',
      loginPassword: '',
      registerUsername: '',
      registerPassword: '',

    }
  },

  methods: {

    registerSubmit(ev) {
      ev.preventDefault();
      API.userRegister(
          this.registerUsername,
          this.registerPassword,
          ({username, expiration}) => {
            alert("Votre compte " + username + " existera jusqu'au " + expiration);
          },
          errorMessage => {
            alert("ERREUR : " + errorMessage);
          }
      );
    },

    loginSubmit(ev){
      ev.preventDefault();
      API.userLogin(
          this.loginUsername,
          this.loginPassword,
          token => {
            localStorage.setItem("auth-token", token);
            alert("Vous êtes connecté !");
          },
          errorMessage => {
            alert("ERREUR : " + errorMessage);
          }
      );
    },

    disconnect() {
      localStorage.removeItem('auth-token');
      alert("Vous n'êtes plus connecté !");
    }

  }

}
</script>

<style scoped>
 form{
   border: 1px solid var(--white);
   padding: 8px;
   margin: 8px
 }

</style>