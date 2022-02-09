import './App.css';
import { useState } from "react"

const searchArray = (array, searchingFor) => {
    for(let i = 0; i < array.length; i++){
        if(array[i] == searchingFor) return true;
    }
    return false;
}

function App() {
    
    const [listItems, updateList] = useState([]); // List items
    const [archivedItems, updateArchive] = useState([]); // Archived items
    const [showingArchive, toggleArchive] = useState(false); // Which screen is being shown
    const [inputText, updateText] = useState(""); // Text input
    const changeText = event => updateText(event.target.value); // Updates the value of what's being added to the list
    const checkboxChanged = () => toggleArchive(!showingArchive); // Changes whether to show archived tasks
    // Adds value to array and calls the updateFunction to display the new list.
    const addToArray = (array, value, updateFunction) => {
        let newList = [...array];
        newList.push(value);
        updateFunction(newList);
    }
    // Removed the item at position "index" from the array, and calls the updateFunction to display the new list.
    // Returns what was removed for the archive function to add what was removed from the original list.
    const removeFromArray = (array, index, updateFunction) => {
        let newList = [...array];
        let archived = newList.splice(index, 1);
        updateFunction(newList);
        return archived;
    }
    // Takes the item from the list, and adds it to the archive
    const archiveItem = (index) => {
        let removed = removeFromArray(listItems, index, updateList);
        addToArray(archivedItems, removed, updateArchive);
    };
    // Uses the text box to edit an item in the list.
    const editListItem = (index) =>{
        if(inputText == "") alert("You cannot change your task to nothing, use 'Archive' instead.");
        else if(searchArray(listItems, inputText)) alert("You cannot change your task to something else already in the list.");
        else{
            let newList = [...listItems];
            newList[index] = inputText;
            updateList(newList);
        }
    }
    // Uses the text box to add an item to the list.
    const addListItem = () => {
        if(inputText == "") alert("You must give a description of your task.");
        else if(searchArray(listItems, inputText)) alert("You cannot add the same task into the list twice.");
        else addToArray(listItems, inputText, updateList);
    }
    // Live task list item
    function ListItem(index, value) {
        return (
            <div className="list_item" key={index}>
                <h3>{value}</h3>
                <button className="left" onClick={()=> editListItem(index)}>Edit</button>
                <button className="right" onClick={() => archiveItem(index)}>Archive</button>
            </div>
        );
    }
    // Archived task list item
    function ArchivedItem(index, value){
        return (
            <div className="archived_item" key={index}>
                <h3>{value}</h3>
                <button className="left" onClick={() => removeFromArray(archivedItems, index, updateArchive)}>Delete</button>
            </div>
        );
    }
    
    return (
        <div id="main">
            <div id="top_bar">
                <input id="task_input" placeholder="Task name" onChange={changeText}/>
                <button id="task_confirm" onClick={addListItem}>+</button>
                <div id="task_archived">
                    <p>Archived</p>
                    <input type="checkbox" onChange={checkboxChanged}/>
                </div>
            </div>
            <div id="items_list" style={{visibility: (showingArchive ? "hidden" : "visible"), height: (showingArchive ? "0px" : "auto")}}>
                {listItems.map((value, index) => {
                    return ListItem(index, value);
                })}
            </div>
            <div id="archived_list" style={{visibility: (showingArchive ? "visible" : "hidden"), height: (showingArchive ? "auto" : "0px")}}>
                {archivedItems.map((value, index) => {
                    return ArchivedItem(index, value);
                })}
            </div>
        </div>
    );
}

export default App;