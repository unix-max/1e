<script>
  export let info = {
    in: [
      {
        lvl: 1,
        name: "lvl",
        text: "Some text",
        in: [
          {
            lvl: 2,
            name: "lvl",
            text: "Next some text",
            in: [{ lvl: 3, name: "lvl", text: "text" }]
          }
        ]
      }
    ]
  };
  $: childrens = info.in;

  function addHendler(children) {
    let counter = children.lvl;
    counter++;
    if (children.in) {
      children.in = [
        ...children.in,
        { lvl: counter, name: "lvl", text: "Some text again" }
      ];
      console.log(children.in);
      childrens = childrens;
    } else {
      children.in = [{ lvl: counter, name: "lvl", text: "Some text again" }];
      console.log(children.in);
      childrens = childrens;
    }
  }
</script>

<style>
  .conteiner {
    width: 400px;
    margin: 0 auto;
    border: 2px solid black;
  }
  .text {
    height: 50px;
  }
  .text:focus {
    outline: none;
  }
  header {
    border-bottom: 2px solid black;
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

{#each childrens as children (children)}
  <div class="conteiner">
    <header>
      <button on:click={() => addHendler(children)}>Add</button>
      <h1>{children.name}{children.lvl}</h1>
    </header>
    <div class="text" contenteditable="true">{children.text}</div>
    <div class="editor">
      {#if children.in}
        <svelte:self info={children} />
      {/if}
    </div>
  </div>
{/each}
