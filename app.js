let todoList = localStorage.getItem("todoList")==null?[]:JSON.parse(localStorage.getItem("todoList"));
showItems();

function addToMap(itemName){

    const todoObj = {
        "itemName":itemName,
        "isDone":false
    };

    todoList.push(todoObj);
    localStorage.setItem("todoList", JSON.stringify(todoList));
    console.log(todoList);
    clearTextField();
    showItems();
}

function clearTextField(){
    document.getElementById("todoText").value = "";
}

function showItems(){
    document.getElementById("view").innerHTML = "";
    todoList.forEach((item,index)=>{
        const div = "<div style='float: right'>" +
            "<i onclick='check("+index+")' class='fa fa-check' aria-hidden='true'></i>" +
            "<i onclick='edit("+index+")' class='fa fa-pencil-square-o' aria-hidden='true'></i> " +
            "<i onclick='deleteItem("+index+")' class='fa fa-times' aria-hidden='true'></i></div>"
        let iname = item.isDone?"<s>"+item.itemName+"</s>":item.itemName;
        document.getElementById("view").innerHTML += "<li id='"+index+"' class='list-group-item'>"+iname+div+"</li>";
    })
}

function check(index){
    const obj = todoList[index];
    obj.isDone = true;
    localStorage.clear();
    localStorage.setItem("todoList", JSON.stringify(todoList));
    document.getElementById(index).innerHTML ="<s>"+obj.itemName+"<div style='float: right'>" +
        "<i onclick='check("+index+")' class='fa fa-check' aria-hidden='true'></i>" +
        "<i onclick='edit("+index+")' class='fa fa-pencil-square-o' aria-hidden='true'></i> " +
        "<i onclick='deleteItem("+index+")' class='fa fa-times' aria-hidden='true'></i></div></s>"
}

function deleteItem(i){
    const obj = todoList[i];
    todoList = todoList.filter(function(item) {
        return item !== obj
    });
    localStorage.clear();
    localStorage.setItem("todoList", JSON.stringify(todoList));
    showItems();
}

function edit(i){
    const obj = todoList[i];
    document.getElementById("todoText").value = obj.itemName;
    deleteItem(i);
}