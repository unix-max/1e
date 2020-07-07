<script>
  import { scale } from "svelte/transition";
  // import { onMount } from "svelte";
  export let type = "doc";
  export let flagType;
  export let icons;
  export let flags;
  let flag = flags[flagType];
  let elem = icons[type];

  // onMount(async () => {
  //   //console.log('mount');
  //   let obj = await import("../clSpr.js");
  //   let Spr = obj.default;
  //   let spr = new Spr();
  //   data = await spr.getData("http://localhost:3000/icon.json");
  //   elem = data[type];
  //   dataFlag = await spr.getData("http://localhost:3000/flag.json");
  //   flag = dataFlag[flagType];
  //   // console.log(flag);
  // });

  // console.log(flagStyle);
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
    <img class="flag" src={flag} alt="flag" />
  {/if}
</span>
