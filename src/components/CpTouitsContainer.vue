<template>
  <section class="touits-container">
    <h2>Tous les touits</h2>
    <span>{{test_reactive}} {{test}}</span>
    <!-- si la propriété test s'incrémente toutes les secondes cela signifie qu'il y a un rechargement
    du composant car ce n'est pas une propriété réactive -->
    <p><em>{{test_computed}}</em></p>
    <div v-for="(touit, id) in touits" :key="id">
      <CpTouit :t="touit"/>
<!--  PROPS
On peut appeler les props comme bon nous semble mais il faut reprendre le même
nom dans le composant enfant (cf CpTouit.vue)
-->
    </div>
  </section>
</template>

<script>
// Ci dessous tout le code JS dont le composant peut se servir

//IMPORTS
import CpTouit from "@/components/CpTouit";
import API from "@/data/api";

export default {
  components: { //Permet d'indexer les imports de composants
    CpTouit,
  },

  //Les props peuvent être déclarées de plusieurs manières :

  //Déclaration des props du composant parent sous la forme : "user: Object"
  props: {
    nomDonneAMaProps: String, //La props doit avoir le nom qui est passé au composant via les ":" (cf dans App.vue)
  },

  //OU Sous forme de tableau =>  props: ['nomDonneAMaProps'], (cf Trending.vue pour l'exemple)

  data(){ //Représente le state d'un composant React, les variables sont réactives et
          // vont avoir un impact sur le rendu
    return{
      touits: [],
      test_reactive: 0, //la mutation de cette propriété dans une fonction entrainera un update du composant
                        //pour tester cette règle : décommenter la ligne 74 et regarder sur la page les chiffres sont actualisés toutes les 1s
      value_to_be_computed: 18,
    }
  },

  computed:{  // Une computed est une propriété calculée au montage du composant et qui va être conservée en cache
             //ce qui veut dire que si le composant vit un update alors cette propriété ne sera pas recalculée tant que ses entrées seront les
            // mêmes qu'au montage du composant
    test_computed(){
      return this.value_to_be_computed * 256; //(ici value_to_be_computed sera toujours 18 donc 18*256 sera toujours 4608)
    }
  },

  //LIFECYCLES : beforeCreate / created / beforeMounted / mounted / beforeUpdate / updated / beforeUnmount / unmounted

  created() {
    //Toutes les propriétés du composant déclarées ci-dessous sont non réactives elles correspondent aux propriétés classiques
    // Ce sont des propriétés dont on n'a pas besoin en dehors du composant et qui ne nécessitent pas de re render le composant
    this.isAlive = true;
    this.lastTimestamp = 0;
    this.timeoutID = null;
    this.test = 0;
  },

  mounted() {
    this.refreshTouits();
    // console.log(this.nomDonneAMaProps)
  },

  beforeUnmount() { // Correspond au cycle componentWillUnmount de React
    this.isAlive = false;
  },

  methods: { // L'objet methods : {} contient toutes les déclarations de fonctions dont le composant a besoin
    refreshTouits() {
      this.timeoutID = null;
      this.test++;
      // this.test_reactive++;
      // console.log("FCT refreshTouits")
      API.getAllTouits(
          this.lastTimestamp,
          data => {
            this.lastTimestamp = data.ts;
            if (data.messages.length > 0) {
              this.touits = [...this.touits, ...data.messages].sort((t1, t2) => t2.ts - t1.ts)
            }
            if (this.isAlive) {
              this.timeoutID = setTimeout(this.refreshTouits, 1000);
            }
          },
          console.error
      );
    }
  }

}
</script>

<style scoped>
/* L'attribut 'scoped' de la balise style indique que le style qui est écrit ici
n'est accessible que dans le scope de ce composant*/
</style>

<style>
/* Le style qui sera écrit ici sera accessible de manière global et
prendra la priorité sur les styles scopés des composants*/
</style>