<script>
  import { slide } from "svelte/transition";
  import { onMount } from "svelte";
  // import { dndzone } from "svelte-dnd-action";

  import Icon from "./Icon.svelte";
  export let parent;
  export let icons;
  export let flags;
  let items = parent.in;
  let type;
  let drag;
  let drop;
  let drop2;
  let move = false;
  let over = false;
  let arrow = false;

  function connectorClick(item) {
    if (!item.folder) return;
    item.open = !item.open;
    items = items;
    // console.log(item.flag);
    // console.log(item.open);
  }
  onMount(() => {
    drag = document.querySelectorAll(".ddd");
    drop = document.querySelectorAll(".drop");
    drop2 = document.querySelectorAll(".drop2");

    drag.forEach(element => {
      element.addEventListener("dragstart", function(event) {
        console.log("start");
        // dropStatus.innerHTML =
        //   "Dragging the " + event.target.getAttribute("id");
        event.dataTransfer.dropEffect = "move";
        event.dataTransfer.setData("text", event.target.getAttribute("id"));
        move = !move;
      });
      element.addEventListener("dragend", function(event) {
        console.log("end");
        move = !move;
      });
    });
    drop.forEach(element => {
      element.addEventListener("dragover", function(event) {
        if (event.preventDefault) {
          event.preventDefault();
        }
        event.dataTransfer.dropEffect = "move";
        return false;
      });
      element.addEventListener("dragenter", function(event) {
        // console.log("enter");
        // over = !over;
        this.classList.add("over");
      });
      element.addEventListener("dragleave", function(event) {
        this.classList.remove("over");
        // over = !over;
      });
      element.addEventListener("drop", function(event) {
        event.preventDefault();
        this.classList.remove("over");
        this.classList.remove("drop");
        move = !move;
        let elementID = event.dataTransfer.getData("text");
        let element = document.getElementById(elementID);
        this.appendChild(element);
      });
    });
    drop2.forEach(element => {
      element.addEventListener("dragover", function(event) {
        if (event.preventDefault) {
          event.preventDefault();
        }
        event.dataTransfer.dropEffect = "move";
        return false;
      });
      element.addEventListener("dragenter", function(event) {
        // console.log("enter");
        // over = !over;
        // arrow = !arrow;
        this.classList.add("arrow");
      });
      element.addEventListener("dragleave", function(event) {
        this.classList.remove("arrow");
        // over = !over;
      });
      element.addEventListener("drop", function(event) {
        event.preventDefault();
        this.classList.remove("arrow");
        this.classList.remove("drop2");
        move = !move;
        let elementID = event.dataTransfer.getData("text");
        let element = document.getElementById(elementID);
        this.appendChild(element);
      });
    });
  });

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
  .drop {
    display: none;
    width: 100%;
    height: 1px;
  }
  .over {
    height: 9px;
    background: url(../icons/Tipe3/arrow2.png) no-repeat;
  }
  .arrow {
    background: url(../icons/Tipe3/arrow1.png) no-repeat;
    background-position-x: 0px;
    background-position-y: 5px;
  }
  .move {
    display: block;
  }
</style>

<!-- <section
  use:dndzone={{ items, flipDurationMs }}
  on:consider={e => handleDndConsider(parent, e)}
  on:finalize={handleDndFinalize}> -->

{#each items as item, i (item.id)}
  <div id={item.id} class="ddd" draggable="true">
    <div id="drop{i * Math.random()}" class="drop" class:move class:over />
    <li
      id="drop2{i * Math.random()}"
      class:arrow
      class="drop2"
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
  </div>
{/each}
<!-- </section> -->
