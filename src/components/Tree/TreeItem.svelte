<script>
import Icon from './Icon.svelte'
  export let items;
  function connectorClick(item) {
    item.open = !item.open;
    items = items;
		console.log(item);
	}
</script>
<style>

</style>

  {#each items as item}
    <li class:folder="{item.in}"
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
