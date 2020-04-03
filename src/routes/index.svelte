<script>
import Tree from '../components/Tree/Tree.svelte';
import Table from '../components/Table/Table.svelte';
let tree={in:[{name:"one", type:"root", in:[{name:"one one"},{name:"one two"},{name:"one free",
in:[{name:"one free one"},{name:"one free two", type:"doc"}]},
{name:"one four", in:[{name:"one four one"},{name:"one four two"}]}
]},
{name:"two", type:"sad", in:[{name:"two one"},{name:"two two"}]}]};
</script>
<style>
	
	@media (min-width: 480px) {
	
	}
</style>

<svelte:head>
	<title>Sapper project template</title>
</svelte:head>

<Tree data = {tree}></Tree>