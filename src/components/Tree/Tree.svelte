<script>
  // import { onMount } from 'svelte';
  //export let post;
  import { createEventDispatcher } from "svelte";
  import TreeItem2 from "./TreeItem2.svelte";

  export let data = { in: [{ name: "Не загружен" }] };
  export let icons;
  export let flags;

  const dispatch = createEventDispatcher();

  let info = {};

  // const listenItem = e => {
  //   let info = {
  //     moveItemNumber: e.detail.moveItemNumber,
  //     moveFrom: e.detail.moveFrom,
  //     moveTo: e.detail.moveTo,
  //     numberPosition: e.detail.numberPosition
  //   };
  //   console.log("Дерево", info);
  //   // dispatch("changeTree", info);
  // };

  const listeninfo1 = e => {
    info.moveItemNumber = e.detail.moveItemNumber;
    // console.log("Дерево1", info);
  };
  const listeninfo2 = e => {
    info.numberPosition = e.detail.numberPosition;
    info.moveTo = e.detail.moveTo;
    // console.log("Дерево2", info);
  };
  const listeninfo3 = e => {
    info.moveFrom = e.detail.moveFrom;
    console.log("Дерево3", info);
    if (info.moveTo) {
      dispatch("changeTree", info);
    }
  };
</script>

<style>
  .tree {
    position: fixed;
    /* padding: 20px; */
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
  .tree :global(h3) {
    text-align: center;
  }
  .tree :global(ul li) {
    position: relative;
    z-index: 10;
    padding-left: 10px;
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
    width: 16px;
    height: 16px;
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
    /* margin: 2px; */
  }

  .tree :global(.treeConteiner > input) {
    position: relative;
    margin: 0;
    padding: 0;
    bottom: -2px;
  }
  .tree :global(.name) {
    outline: none;
    /* padding: 2px; */
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
      <TreeItem2
        parent={data}
        {icons}
        {flags}
        on:moveinfo1={listeninfo1}
        on:moveinfo2={listeninfo2}
        on:moveinfo3={listeninfo3} />
    </ul>
  {/if}
</div>
