<template>
  <section class="trending">
    <h2>Termes tendances</h2>
    <div class="trending-container" v-for="word in words" :key="word">
      <span @click="$emit('wordClick', word)">#{{word}}</span>
<!--
pour déclencher un évènement dans le composant parent, on utilise la méthode $emit de vue,
comme son nom l'indique, CpTrending va alors "émettre" l'évènement "wordClick"
!!! L'important est que l'évènement émis par le composant enfant ait le même nom que l'évènement que son parent écoute
-->
    </div>
  </section>
</template>

<script>
import API from "@/data/api";

export default {
  props: ['wordClick'],

  data(){
    return {
      words: [],
    }
  },
  mounted(){
    API.getTrending(
        data => {
          this.words= Object.entries(data).sort(([,n1], [,n2]) => n2 - n1).map(([word]) => word)
        },
        console.error
    )
  }
}
</script>

<style scoped>
.trending-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 8px;
}

.trending-container > * {
  background-color: var(--dark-green);
  color: var(--black);
  padding: 2px 8px;
  cursor: pointer;
}

.trending-container > *:hover {
  background-color: var(--green);
}
</style>