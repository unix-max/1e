<script>
  // import { onMount } from 'svelte';
  //export let post;
  import TreeItem from "./TreeItem.svelte";

  export let data = { in: [{ name: "Не загружен" }] };
  export let icons;
  export let flags;
</script>

<style>
  .tree {
    position: fixed;
    padding: 20px;
    left: 0;
    width: 240px;
    height: 80vh;
    overflow: auto;
    border: 1px dotted gray;
  }

  ul.container {
    font-family: Tahoma;
    font-size: 11pt;
    padding: 1px;
    margin: 1px;
  }

  .tree :global(ul li) {
    list-style-type: none; /*
		background-repeat: repeat-y;
    
		background-image: url(../icons/dotted.svg); */
  }

  .tree :global(ul li ul) {
    padding-left: 20px;
  }

  .tree :global(li span) {
    display: inline-block;
    vertical-align: middle;
    /*
				background-repeat: no-repeat;
				background-image: url(../icons/dotted1.svg) */
  }

  .tree :global(.connector) {
    height: 16px;
    width: 16px;
    transition: all 0.1s;

    /*background-position: 0px -16px;*/
  }
  .tree :global(li) {
    text-align: start;
  }
  .tree :global(.connector) {
    width: 18px;
    height: 18px;
    transition: all 0.5s;
  }
  .tree :global(li.folder > .treeConteiner > .connector) {
    background-image: url(../icons/plus.svg);
  }
  .tree :global(li.folder.open > .treeConteiner > .connector) {
    background-image: url(../icons/minus.svg);
  }
  .tree :global(.treeConteiner) {
    cursor: pointer;
    margin: 2px;
  }
  
  .tree :global(.treeConteiner > input) {
    position: relative;
    margin: 0;
    padding: 0;
    bottom: -2px;
  }
  .tree :global(.name) {
    outline: none;
    padding: 2px;
    transition: all 0.1s;
  }
  .tree :global(.treeConteiner:hover .name) {
    border: 1px solid rgba(102, 204, 255, 1);
    background: rgba(204, 255, 255, 0.3);
  }
</style>

<div class="tree">
  <h3>Tree</h3>

  {#if data.in}
    <ul class="container">
      <TreeItem parent={data} {icons} {flags} />
    </ul>
  {/if}
</div>
