<script>
  import { createEventDispatcher } from "svelte";
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

  const dispatch = createEventDispatcher();
  let moveItemNumber;
  let dropZoneParent;
  let numberPosition;
  let moveItem;
  let moveFrom;
  let moveTo;

  function connectorClick(item) {
    if (!item.folder) return;
    item.open = !item.open;
    items = items;
    // console.log(item.flag);
    // console.log(item.open);
  }
  function sentPosition() {
    let info = {
      moveItemNumber,
      moveFrom,
      moveTo,
      numberPosition
    };
    console.log(info);

    // dispatch("moveitem", {
    //   moveItemId,
    //   parentItemId,
    //   numberPosition
    // });
    // dispatch("moveitem", info);
  }
  onMount(() => {
    drag = document.querySelectorAll(".ddd");
    drop = document.querySelectorAll(".drop");
    drop2 = document.querySelectorAll(".drop2");

    drag.forEach(element => {
      element.addEventListener("dragstart", function(event) {
        console.log("start");
        event.dataTransfer.dropEffect = "move";
        // event.dataTransfer.setData("text", event.target.getAttribute("id"));
        moveItemNumber = event.target.dataset.itemNumber;
        console.log("номер перемещаемого итема", moveItemNumber);
        // event.stopPropagation();
      });
      // element.addEventListener("drag", function(event) {
      //   move = true;
      // });
      element.addEventListener("dragend", function(event) {
        console.log("end");
        // move = false;
        // event.stopPropagation();
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
        // this.classList.remove("drop");
        // move = false;
        // let elementID = event.dataTransfer.getData("text");
        // let element = document.getElementById(elementID);
        // this.appendChild(element);
        // dropZoneId = this.getAttribute("id");
        numberPosition = event.target.dataset.dropNumber;
        // console.log(dropZoneId);
        console.log("номер слота", numberPosition);
        sentPosition();
        event.stopPropagation();
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
        this.style.paddingLeft = "25px";
        this.classList.add("arrow");
      });
      element.addEventListener("dragleave", function(event) {
        this.style.paddingLeft = "";
        this.classList.remove("arrow");
        // over = !over;
      });
      element.addEventListener("drop", function(event) {
        event.preventDefault();
        this.style.paddingLeft = "";
        this.classList.remove("arrow");
        // this.classList.remove("drop2");
        // move = false;
        // let elementID = event.dataTransfer.getData("text");
        // let element = document.getElementById(elementID);
        // this.appendChild(element);
        // dropZoneId = this.getAttribute("id");
        numberPosition = event.target.dataset.dropNumber;
        // console.log(dropZoneId);
        console.log("номер слота", numberPosition);
        sentPosition();
        event.stopPropagation();
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
    /* display: none; */
    width: 100%;
    height: 5px;
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
  /* .move {
    display: block;
  } */
</style>

<!-- <section
  use:dndzone={{ items, flipDurationMs }}
  on:consider={e => handleDndConsider(parent, e)}
  on:finalize={handleDndFinalize}> -->

{#each items as item, i (item.id)}
  <div
    data-item-number={i}
    class="ddd"
    draggable="true"
    on:dragend|stopPropagation={() => {
      moveFrom = parent;
      console.log(' родитель перемещаемого итема', moveFrom);
    }}>
    <div
      class="drop"
      data-drop-number={i}
      class:over
      on:drop|stopPropagation={() => {
        moveTo = parent;
        console.log('родитель контейнера итем', moveTo);
      }} />
    <li
      on:drop|stopPropagation={() => {
        moveTo = item;
        console.log('папка в которую перемещается объект', moveTo);
      }}
      class:arrow
      class:drop2={item.folder}
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
          <svelte:self parent={item} {icons} {flags} on:moveitem />
        </ul>
      {/if}
    </li>
  </div>
{/each}
<div
  class="drop"
  data-drop-number={items.length}
  data-parent={parent}
  class:over
  on:drop|stopPropagation={() => {
    moveTo = parent;
    console.log('родитель контейнера итем', moveTo);
  }} />
<!-- </section> -->
