<script>
  import { scale } from "svelte/transition";
  import { onMount } from "svelte";
  //export let type = "default";
  //export let flagType;
  //export let icons;
  //export let flags;
  //let flag = flagType ? flags[flagType] : null;
  //let elem = icons[type];
  export let elem;
  export let flag;
  //let flag = ["../icons/Tipe3/cross3.png", "../icons/Tipe3/label.png"];
   console.log(flag);


</script>

<style>
  .elem {
    width: 20px;
    height: 20px;
  }
  .flag {
    position: absolute;
    top: 2px;
    left: 2px;
    z-index: 99;
  }
  span {
    position: relative;
    width: 20px;
    height: 20px;
  }
  /*
  span.html {
    background-image: url(../icons/fileHTML.svg);
  }
  span.doc {
    background-image: url(../icons/docFile.svg);
  }
  span.folder {
    background-image: url(../icons/folder.svg);
  }
  span.root {
    background-image: url(../icons/root.svg);
  }
  span.sad {
    background-image: url(../icons/home.svg);
  } */
</style>

<span in:scale|local>
  <img class="elem" src={elem} alt="img" /> 
  {#if flag}
    {#each flag as item}
      <img class="flag" src={item} alt="flag" />
    {/each}
  {/if}
</span>
