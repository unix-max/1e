<script>
  import { slide } from "svelte/transition";
  // import { dndzone } from "svelte-dnd-action";

  import Icon from "./Icon.svelte";
  export let parent;
  export let icons;
  export let flags;
  let items = parent.in;
  let type;

  function connectorClick(item) {
    if (!item.folder) return;
    item.open = !item.open;
    items = items;
    // console.log(item.flag);
    // console.log(item.open);
  }

  // const flipDurationMs = 500;
  // function handleDndConsider(parent, e) {
  //   console.log(e.detail.items);
  //   items = e.detail.items;
  //   //console.log(items1);
  // }
  // function handleDndFinalize(e) {
  //   items = e.detail.items;
  // }
</script>

<style>

</style>

<!-- <section
  use:dndzone={{ items, flipDurationMs }}
  on:consider={e => handleDndConsider(parent, e)}
  on:finalize={handleDndFinalize}> -->

{#each items as item (item.id)}
  <li
    transition:slide
    class:folder={item.in}
    class:open={item.open}
    type={item.name}>
    <div class="treeConteiner">
      <span class="connector" on:click={() => connectorClick(item)} />
      <input type="checkbox" />

      {#if item.open}
        <Icon type="folderOpen" {icons} {flags} flagType={item.flag} />
      {:else}
        <Icon
          type={item.type ? item.type : item.in ? 'folder' : 'html'}
          {icons}
          {flags}
          flagType={item.flag} />
      {/if}
      {#if !item.edited}
        <span class="name">{item.name}</span>
      {/if}
    </div>
    {#if item.open}
      <ul>
        <svelte:self parent={item} {icons} {flags} />
      </ul>
    {/if}
  </li>
{/each}

<!-- </section> -->
