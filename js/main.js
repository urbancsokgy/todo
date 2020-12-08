'use strict'
//#region A dátum kiírása
const now=new Date();
const day=now.getDay();
var daylist = ["Vasárnap","Hétfő","Kedd","Szerda ","Csütörtök","Péntek","Szombat"];
document.querySelector('.todo h2').textContent=`${now.toLocaleDateString()} ${daylist[day]}`;
//#endregion
//#region  változók
let storageLength=localStorage.length;
let todoItem={
key:'item1',
checked:'true',
value:'Első feladat'
};
let todoArray=[
todoItem
];
let keyNumber=localStorage.length;
//#endregion  változók
//#region Teendő hozzáadása
const todoNow=document.querySelector('.input__todo');
const plusButton=document.querySelector('.input__button');
const listItem=document.querySelector('.todo__list__now ul');
plusButton.addEventListener('click', event =>addTodo(event));
//click function

function addTodo(event){
    keyNumber++;
    let key=`item${keyNumber}`;
    appendList(key ,todoNow.value);
    todoNow.value='';

}

//#endregion Teendő hozzáadása
//#region A teendők listája
function appendList(key, value){
    let timeToChill= document.querySelector('.timeToChill');
    (!timeToChill.classList.contains('hidden'))?timeToChill.classList.add('hidden'):'';
    document.querySelector('.between').classList.remove('hidden');
let templateString=
`<div class="list isanitem">
<i class="far fa-square"></i>
<li class="${key}">${value}</li>
<i class="fas fa-trash-alt"></i>
</div>`
 listItem.innerHTML+=templateString;
 trashClick();
 checkItem();

}
//#endregion A teendők listája
//#region Kuka ikon
function trashClick(){
const trashNode=document.querySelectorAll('.fa-trash-alt');
trashNode.forEach(element => {
    element.addEventListener('click', event=>{
        console.log(event.target);
        event.target.parentElement.remove();
        (document.querySelector('.todo__list__now ul').nextElementSibling==null)?
        document.querySelector('.timeToChill').classList.add('hidden'):'';
    })
});
}
//#endregion
//#region Pipa ikon
function checkItem(){
    const boxNode=document.querySelectorAll('.fa-square');
boxNode.forEach(element => {
    element.addEventListener('click', event=>{         
        let itemValue =event.target.nextElementSibling.textContent;
        transfer(itemValue);
        event.target.parentElement.remove();
    })
});
}
//#endregion
//#region Áttöltés a pipa részbe
function transfer(value){
    let templateString1=`
    <div class="list list__checked">
    <i class="far fa-check-square"></i>
    <li class="li__item">${value}</li>
    </div>`
    document.querySelector('.todo__checked ul').innerHTML+=templateString1;
}
//#endregion

//#region Show/hide complete
const hideShow=document.querySelector('.todo__checked');
document.querySelector('.complete').addEventListener('click', event=>
{
    if(event.target.textContent.includes('Hide')){
        hideShow.classList.add('hidden');
        event.target.textContent='Show Complete';
    }else{
        event.target.textContent='Hide Complete';
        hideShow.classList.remove('hidden');        
    } })
    //#endregion
    //#region Clear All 
    document.querySelector('.clear').addEventListener('click', event=>
    {
        let remNodeList=document.querySelectorAll('.list');
        remNodeList.forEach(el=>el.remove());
        document.querySelector('.between').classList.add('hidden');
        document.querySelector('.timeToChill').classList.toggle('hidden');
    })
    //#endregion
    //#region Lap elhagyása és onload
    window.onload = function() {
      readStorage();
       
      };
    window.addEventListener("unload", function(event) { 
        const itemNodeList=document.querySelectorAll('.isanitem li');
        clearStorage();
        itemNodeList.forEach(elem=>{
            let key=elem.className;
            let value=elem.textContent;
            localStorage.setItem(key, value);
        })
        console.log('Lefut1'); });
    //#endregion 
    
    //#region A localStorage beolvasása
    function readStorage(){
    for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            const element = localStorage[key];
            if(key.includes('item')){
            appendList(key, localStorage[key])
            console.log(key+' '+ element);}
        }
    }}
    //#endregion
    //#region A localStorage beolvasása
    function clearStorage(){
    for (const key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            const element = localStorage[key];
            if(key.includes('item')){
            localStorage.removeItem(key);
            console.log(key+' '+ element);}
        }
    }}
    //#endregion
    