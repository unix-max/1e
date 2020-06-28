<script>
	import { flip } from 'svelte/animate';
  import { dndzone } from 'svelte-dnd-action';
  
  import Icon from './Icon.svelte'
  export let items;
  function connectorClick(item) {
    item.open = !item.open;
    items = items;
		console.log(item);
  }
  
  const flipDurationMs = 300;
	function handleDndConsider(e) {
		items = e.detail.items;
	}
	function handleDndFinalize(e) {
		items = e.detail.items;
	}
</script>
<style>

</style>
<section use:dndzone={{items, flipDurationMs}} on:consider={handleDndConsider} on:finalize={handleDndFinalize}>
  
  {#each items as item(item.id)}
    <li class:folder="{item.in}" animate:flip="{{duration: flipDurationMs}}"
      class:open="{item.open}" type={item.name}
      >
      <span class="connector" on:click="{() => connectorClick(item)}"></span>
      <Icon type={item.type ? item.type : item.in ? 'folder' : 'html'}/>
      {item.name}
      {#if item.open}
        <ul>
          <svelte:self items={item.in}/>
        </ul>

      {/if}

    </li>
  {/each}
</section>