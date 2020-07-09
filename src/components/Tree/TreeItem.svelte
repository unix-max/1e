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
    if (!item.in) return;
    item.open = !item.open;
    items = items;
    // console.log(item.flag);
    // console.log(item.open);
  }

  function icon(item) {
    if (item.in) {
      if (item.open) {
        if (icons[item.type] && icons[item.type].open) {
          return icons[item.type].open;
        } else {
          return icons['default'].open;
        }
      } else {
        if (icons[item.type] && icons[item.type].folder) {
          return icons[item.type].folder;
        } else {
          return icons['default'].folder;
        }
      }
    } else {
      //console.log(icons[item.type])
      //console.log(item);
      if (icons[item.type].elm) {
        return icons[item.type].elm;
      } else {
        return icons['default'].elm;
      }

    }
  }
  function flag(item) {
    if (item.flag) {
      if (Array.isArray(item.flag)) {
        if (item.flag.length > 0) {
          let fl =[];
          for (let i=0; i < item.flag.length; i++) {
            if (flags[item.flag[i]]) {
              fl[i] = flags[item.flag[i]];
            }
          }
          return fl;
        } else return null;
      } else {
        if (flags[item.flag]) {
          return [flags[item.flag]];
        } else return null;
      }
    } else return null;
  }

  function itemEdit(item) {
    item.edited=false;
    items = items;
  }
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
    type={item.type}>
  
    <div class="treeConteiner">
      <span class="connector" on:click={() => connectorClick(item)} />
      <input type="checkbox" />
<!--
      {#if item.open} 
        <Icon type="folderOpen" {icons} {flags} flagType={item.flag} /> 

      {:else}
        <Icon
          type={item.type ? item.type : item.in ? 'folder' : 'html'}
          {icons}
          {flags}
          flagType={item.flag} />
      {/if}-->
      <Icon
          elem={icon(item)} 
          flag={flag(item)}
          />

      {#if !item.edited}
        <span class="name" on:click={() => item.edited=true}>{item.name}</span>
      {:else}
        <span class="name"><input bind:value={item.name} on:change={() => itemEdit(item)}/></span>
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
