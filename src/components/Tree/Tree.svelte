
<script>
   // import { onMount } from 'svelte';
  //export let post;
  import TreeItem from './TreeItem.svelte'
  
  export let data = {in:[{name:'Не загружен'}]};
</script>

<style>
  .tree {
    width: 240px;
		max-height: 400px;
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
    
		list-style-type: none;/*
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


			
	.tree :global(li span.connector) {
    height: 16px;
		width: 16px;
		/*background-position: 0px -16px;*/
	}
  .tree :global(li.folder > span.connector) {
		background-image: url(../icons/plus.svg);
	}
  .tree :global(li.folder.open > span.connector) {
		background-image: url(../icons/minus.svg);
	}
  

  
</style>

<div class="tree">
  <h3>
    Tree
  </h3>

  {#if data.in}
    <ul class="container">
      <TreeItem items={data.in}/>
    </ul>
  {/if}
</div>
