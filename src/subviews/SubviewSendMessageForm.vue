<template>
  <section class="send-form">
    <form v-on:submit="formSubmit">
      <label v-if="!token" for="touit-username">Your username :</label>
      <input v-if="!token"
          type="text"
          placeholder="@w3s0m3Dud3"
          id="touit-username"
          name="username"
          maxlength="16"
          v-model="username"
      />
      <label for="touit-message">Your message :</label>
      <input
          type="text"
          placeholder="K1k00 l0l ☺"
          id="touit-message"
          name="message"
          maxlength="256"
          v-model="message"
      />
      <input type="submit" value="exec()" />
    </form>
  </section>
</template>

<script>
//IMPORTS
import API from "@/data/api";


export default {
  name: 'SendMessageForm',  // Cette propriété permet d'identifier un composant par son nom (cf ex router/index.js)
  data() {
    return{
      username: '',
      message:'',
      token: null,
    }
  },
  created() {
    const localtoken = localStorage.getItem('auth-token');
    if (localtoken) {
      API.getUserInfo(
          localtoken,
          () => {
            this.token = localtoken
          },
          () => {
            localStorage.removeItem("auth-token");
          }
      )
    }
  },
  methods: {
      formSubmit(ev) {
          ev.preventDefault();
        if (this.token) {
          API.sendAuthenticatedTouit(
              this.token,
              this.message,
              () => {
                this.message = ""
                alert("Le touit a bien été envoyé !");
              },
              errorMessage => {
                alert("Une erreur est survenue : " + errorMessage)
              }
          )
        } else {
          API.sendTouit(
              this.username,
              this.message,
              () => {
                this.message = "";
                alert("Le touit a bien été envoyé !");
              },
              errorMessage => {
                alert("Une erreur est survenue : " + errorMessage)
              }
          )
        }
      }
  }
}
</script>

<style scoped>
.send-form {
  border-bottom: 1px solid gray;
}

.send-form form {
  display: flex;
  align-items: baseline;
  gap: 8px;
}

#touit-message {
  flex: 1;
}

input {
  background-color: transparent;
  color: var(--yellow);
  font-weight: bold;
  border: none;
  border-bottom: 2px solid var(--dark-yellow);
  margin: 4px;
}

input:focus {
  outline: none;
}

input[type=submit] {
  background-color: var(--yellow);
  border-bottom: none;
  color: var(--black);
  padding: 4px 16px;
}

input[type=submit]:hover {
  background-color: var(--white);
  color: var(--dark-yellow);
  border-bottom: 2px solid var(--dark-yellow);
  padding-bottom: 2px;
  cursor: pointer;
}

input[type=submit]:active {
  background-color: var(--dark-yellow);
  color: var(--black);
  border-bottom: 2px solid var(--yellow);
  padding-bottom: 2px;
  cursor: pointer;
}

</style>