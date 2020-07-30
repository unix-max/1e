<script>
  import Editor from "./Editor.svelte";
  import { createEventDispatcher, onMount } from "svelte";
  export let children = {};

  let color = "red";

  $: chil = children.in;

  onMount(() => {
    console.log(chil);
  });

  const dispatch = createEventDispatcher();

  function addHendler(children) {
    dispatch("add", children);
  }
</script>

<style>
  .conteiner {
    width: 200px;
    margin: 0 auto;
  }
  .text {
    height: 50px;
  }
  .text:focus {
    outline: none;
  }

  button {
    display: block;
    margin: 5px auto;
  }
  h1 {
    text-align: center;
    padding-bottom: 1px;
    margin: 0;
  }
</style>

<div class="conteiner" style="border: 2px solid {color};">
  <header style="border: 2px solid {color};">
    <button on:click={() => addHendler(children)}>Add</button>
    <h1>{children.name} test1</h1>
  </header>
  <div class="text" contenteditable="true">{children.text}</div>
  {#if chil}
    <Editor info={children} on:add />
  {/if}
</div>
