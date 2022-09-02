<!-- App.vue représente l'application comme le App.js de React -->

<template>
  <div class="App">
    <CpHeader/>
    <hr>

    <nav>
      <!--  La possibilité de naviguer implique d'installer un module de navigation, ici il s'agit de vue-router -->
      <router-link to="/">Home</router-link>
      <router-link to="/auth">Authentification</router-link>
      <!--  l'attribut "to" des router-link indique au navigateur de changer d'url et les composants associés
          à cet url sont définis dans le fichier router/index.js -->
      <span>{{trendWord}}</span>
    </nav>

    <main>
      <router-view/><!--  Les balises router-view représentent les "children" de la route active cf router/index.js -->

      <CpTrending @wordClick="word => this.trendWord = word"/> <!--  @customEventName évènement écouté par le composant App (cf CpTrending pour le déclenchement de l'event)    -->
      <CpTouitsContainer :nomDonneAMaProps="propsExemple"/>
    </main>
  </div>
</template> <!-- template = contenu composant ~ equivalent JSX de React-->

<!-- Script JS -->
<script>
// IMPORTS --- au même titre que React, il faut importer les composants dont on a besoin
import CpHeader from "@/components/CpHeader.vue";
import CpTouitsContainer from "@/components/CpTouitsContainer";
import CpTrending from "@/components/CpTrending";


export default {
  name: 'App',
  data() {
    return {
      trendWord: '',
      propsExemple: 'blah',
    }
  },
  components: {
    CpHeader,
    CpTouitsContainer,
    CpTrending,
    // SubviewSendMessageForm,
    // SubviewAuthentication,
  },
  mounted(){

  },

}
</script>

<!-- Style CSS -->
<style>
/*#app {*/
/*  font-family: Avenir, Helvetica, Arial, sans-serif;*/
/*  -webkit-font-smoothing: antialiased;*/
/*  -moz-osx-font-smoothing: grayscale;*/
/*  text-align: center;*/
/*  color: #2c3e50;*/
/*  margin-top: 60px;*/
/*}*/

/* GLOBAL CSS RULES */
:root {
  --background: #222;
  --foreground: #fff;

  --red: #f00;
  --yellow: #ff0;
  --green: #0f0;
  --cyan: #0ff;
  --blue: #00f;
  --magenta: #f0f;

  --black: #000;
  --gray: #888;
  --white: #fff;

  --dark-red: #800;
  --dark-yellow: #880;
  --dark-green: #080;
  --dark-cyan: #088;
  --dark-blue: #008;
  --dark-magenta: #808;
}

body {
  margin: 0;
  font-family: 'Consolas', monospace,
  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  background-color: var(--background);
  color: var(--foreground);
}

hr {
  border: 0;
}

hr::after {
  content: "-----------";
  color: var(--gray);
}

h2 {
  color: var(--dark-magenta);
  letter-spacing: 2px;
  font-size: 1.5em;
  margin: 8px;
  padding: 8px;
  border-bottom: 1px solid var(--blue);
  box-shadow: 0 2px 0 var(--dark-blue);
}

h2::before {
  content: '[';
  color: var(--magenta);
}

h2::after {
  content: ']';
  color: var(--magenta);
}


.App {
  display: flex;
  flex-direction: column;
  align-items: stretch;
}

main {
  display: grid;
  grid-template-areas: "send-form send-form"
                         "trending touits-container";
  grid-template-columns: 420px 1fr;
  gap: 8px;
}

main > section {
  padding: 16px;
}

.send-form {
  grid-area: send-form;
}



.touits-container {
  grid-area: touits-container;
}

</style>

