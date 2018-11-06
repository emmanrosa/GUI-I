// ADD NEW ITEM TO END OF LIST
var newEl = document.createElement('li');
var newText = document.createTextNode('cream');
newEl.appendChild(newText);
var position = document.getElementsByTagName('ul')[0];
position.appendChild(newEl);

// ADD NEW ITEM START OF LIST
var newItem = document.createElement('li');
var textnode = document.createTextNode('kale');
newItem.appendChild(textnode);
var list = document.getElementsByTagName('ul')[0];
list.insertBefore(newItem, list.childNodes[0]);

// ADD A CLASS OF COOL TO ALL LIST ITEMS
var listitems = document.querySelectorAll('li');
var i;
for (i = 0; i < listitems.length; i++) {
listitems[i].className = 'cool';
}

// ADD NUMBER OF ITEMS IN THE LIST TO THE HEADING
//var listitems = document.querySelectorAll('li');
var head = document.querySelector('h2');
var textloc = head.firstChild.nodeValue;
var totalitems = listitems.length;
var newHead = textloc + '<span>' + totalitems + '</span>';
head.innerHTML = newHead;
