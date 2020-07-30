<script>
  import Red from "./red.svelte";
  import Blue from "./blue.svelte";
  import Green from "./green.svelte";
  export let info = {
    in: [
      {
        obj: Red,
        name: "Red",
        text: "Some text",
        in: [
          {
            obj: Blue,
            name: "Blue",
            text: "Next some text",
            in: [
              {
                obj: Green,
                name: "Green",
                text: "text"
              }
            ]
          }
        ]
      }
    ]
  };
  $: childrens = info.in;

  function add(event) {
    let data = event.detail;
    if (data.in) {
      data.in = [
        ...data.in,
        { obj: data.obj, name: data.name, text: "Some text again" }
      ];
      childrens = childrens;
    } else {
      data.in = [{ obj: data.obj, name: data.name, text: "Some text again" }];
      childrens = childrens;
    }
  }
</script>

{#each childrens as children (children)}
  <svelte:component this={children.obj} {children} on:add={add} />
{/each}
