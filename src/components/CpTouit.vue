<template>
  <article>
    <span class="username">{{t.name.replaceAll(" ", "_")}}</span>
    <span class="hostname">touiteur</span>
    <span class="path">~/{{ new Date(t.ts).toISOString() }}/</span>
    <p>{{ t.message }}</p>
  </article>
</template>

<script>
export default {
  props: ['t'], // correspond aux props passées par le parent
}
</script>

<style scoped>
article {
  display: flex;
  align-items: baseline;
}

article > .username {
  color: var(--cyan);
}

article > .username::after {
  content: "@";
}

article > .hostname {
  color: var(--red);
}

article > .hostname::after {
  content: ":";
}

article > .path {
  color: var(--dark-cyan);
}

article > .path::after {
  content: "$";
}

article > span:after {
  color: var(--green);
}

article > p {
  font-style: italic;
  margin-left: 8px;
  word-break: break-all;
}

</style>