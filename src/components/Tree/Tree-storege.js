import { writable } from 'svelte/store';

const storeTree = writable([]);

const tree = {
    subscribe: storeTree.subscribe,
    setTree: treeItems => {
        storeTree.set(treeItems);
    },
    updateTree: (moveItemNumber, numberPosition, moveFrom, moveTo) => {
        storeTree.update(treeItems => {
            const updateTree = { ...treeItems };

            const moveItem = moveFrom.in[moveItemNumber];
            // console.log(moveItem);

            const updateOldParent = moveFrom;
            updateOldParent.in.splice(moveItemNumber, 1);

            let updateNewParent;
            if (numberPosition > moveItemNumber) {
                updateNewParent = moveTo.in.splice(numberPosition - 1, 0, moveItem);
            } else {
                updateNewParent = moveTo.in.splice(numberPosition, 0, moveItem);
            }

            // console.log(updateTree);
            return updateTree;
        });
    }
};

export default tree;