<script>
  import { onMount } from "svelte";
  import Tree from "../Tree/Tree.svelte";
  //import Table from '1eLib/Table/Table.svelte';
  //import SprElm from '1eLib/Spr/SprElm.svelte';
  import Popup from "svelte-atoms/Popup.svelte";
  import Button from "svelte-atoms/Button.svelte";

  let isOpen = false;
  const close = () => (isOpen = false);
  const open = () => (isOpen = true);

  let tree = {};
  let icons;
  let flags;

  onMount(async () => {
    //console.log('mount');
    let obj = await import("../clSpr.js");
    let Spr = obj.default;
    let spr = new Spr();
    await spr.getFolders();
    icons = await spr.getData("http://localhost:3000/icon.json");
    flags = await spr.getData("http://localhost:3000/flag.json");
    // console.log(icons);

    tree.in = spr.folders;
    //tree = tree;
    // console.log(tree);
  });
</script>

<style>
  .container {
    display: grid;
    grid-template-columns: minmax(10%, 25%) auto;
    grid-template-rows: 50px auto 50px;
    grid-template-areas:
      "header header"
      "tree table"
      "footer footer";
  }
  .header1 {
    grid-area: header;
  }
  .tree1 {
    grid-area: tree;
  }
  .table1 {
    grid-area: table;
  }
  .footer1 {
    grid-area: footer;
  }
</style>

<svelte:head>
  <title>Sapper project template</title>
</svelte:head>

<div class="container">
  <div class="header1">
    <Button on:click={open}>Open</Button>
  </div>
  <div class="tree1">
    <Tree data={tree} {icons} {flags} />
  </div>
  <div class="table1">
    <!--  <Table></Table> -->
  </div>
  <div class="footer1" />
  <!--
  <Popup {isOpen} on:close={close} header="Title">
  <SprElm elm={tree.in[1]}/>
  <div slot="footer">
    <Button on:click={close}>Ok</Button>
  </div>
</Popup> -->
</div>
