<template>
  <header>
    <h1>Touiteur</h1>
    <small>Le Touiteur des Rgx Lovers</small>
  </header>
</template>

<script>
export default {
  name: "CpHeader"
}
</script>

<style scoped>

header {
  padding: 16px;
  text-align: center;
}

h1 {
  color: var(--green);
  margin: 0;
}

h1::after {
  content: ".sh";
  color: var(--dark-green);
}

header small {
  color: var(--dark-cyan);
}

header small::before {
  content: '[';
}

header small::after {
  content: ']';
}

header small::before, header small::after {
  color: var(--dark-blue);
  font-weight: bold;
}
</style>