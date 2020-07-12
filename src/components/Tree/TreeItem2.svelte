<script>
  import { createEventDispatcher } from "svelte";
  import { slide } from "svelte/transition";
  //   import { onMount } from "svelte";

  import Icon from "./Icon.svelte";
  export let parent;
  export let icons;
  export let flags;
  let items = parent.in;
  let type;
  let move = false;
  let over = false;
  let arrow = false;
  let component;

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
    console.log("В дереве", info);
    dispatch("moveitem", info);
  }

  function moveStart(event) {
    console.log("start");
    event.dataTransfer.dropEffect = "move";
    moveItemNumber = event.target.dataset.itemNumber;
    console.log("номер перемещаемого итема", moveItemNumber);
  }
  function moveEnd(event, parent) {
    moveFrom = parent;
    console.log("Откуда", moveFrom);
    sentPosition();
    console.log("end");
  }
  function overDrag(event) {
    event.dataTransfer.dropEffect = "move";
    return false;
  }
  function enterOne(event) {
    event.target.classList.add("over");
  }
  function enterTwo(event, i) {
    component = items[i].li;
    let drop2 = event.target.dataset.drop2;
    if (drop2 === "folder") {
      component.style.paddingLeft = "25px";
      component.classList.add("arrow");
    }
  }

  function leaveOne(event) {
    event.target.classList.remove("over");
  }
  function leaveTwo(event, i) {
    component = items[i].li;
    let drop2 = event.target.dataset.drop2;
    if (drop2 === "folder") {
      component.style.paddingLeft = "";
      component.classList.remove("arrow");
    }
  }

  function dropOne(event, parent) {
    event.preventDefault();
    event.target.classList.remove("over");
    numberPosition = event.target.dataset.dropNumber;
    console.log("Номер слота куда", numberPosition);
    moveTo = parent;
    console.log("Куда", moveTo);
  }
  function dropTwo(event, item) {
    event.preventDefault();
    component.style.paddingLeft = "";
    component.classList.remove("arrow");
    numberPosition = event.target.dataset.dropNumber;
    console.log("Номер слота куда", numberPosition);
    moveTo = item;
    console.log("папка в которую перемещается объект", moveTo);
  }
</script>

<style>
  .drop {
    width: 100%;
    height: 5px;
  }
  .over {
    height: 9px;
    background: url(../icons/Tipe3/arrow2.png) no-repeat;
  }
  .arrow {
    padding-left: 41px;
    background: url(../icons/Tipe3/arrow1.png) no-repeat;
    background-position-x: 0px;
    background-position-y: 5px;
  }
</style>

{#each items as item, i (item.id)}
  <div
    data-item-number={i}
    class="ddd"
    draggable="true"
    on:dragstart={event => {
      moveStart(event);
    }}
    on:dragend|stopPropagation={event => {
      moveEnd(event, parent);
    }}>
    <div
      class="drop"
      data-drop-number={i}
      class:over
      on:dragover|preventDefault={event => overDrag(event)}
      on:dragenter|stopPropagation={event => enterOne(event)}
      on:dragleave|stopPropagation={event => leaveOne(event)}
      on:drop|stopPropagation={event => {
        dropOne(event, parent);
      }} />
    <li
      bind:this={item.li}
      on:dragover|preventDefault={event => overDrag(event)}
      on:dragenter|stopPropagation={event => enterTwo(event, i)}
      on:dragleave|stopPropagation={event => leaveTwo(event, i)}
      on:drop|stopPropagation={event => {
        dropTwo(event, item, i);
      }}
      data-drop2={item.folder ? 'folder' : 'file'}
      class:arrow
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
          <span class="name" data-drop2={item.folder ? 'folder' : 'file'}>
            {item.name}
          </span>
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
  on:dragover|preventDefault={event => overDrag(event)}
  on:dragenter|stopPropagation={event => enterOne(event)}
  on:dragleave|stopPropagation={event => leaveOne(event)}
  on:drop|stopPropagation={event => {
    dropOne(event, parent);
  }} />
