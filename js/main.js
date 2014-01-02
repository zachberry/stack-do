var db = {
	items: [],
	completed: []
};
var el = {
	list: document.getElementById('list'),
	completed: document.getElementById('completed'),
	input: document.getElementById('input')
}

if(typeof localStorage.db === 'undefined')
{
	localStorage.db = '';
}
else
{
	db = JSON.parse(localStorage.db);
}

function createLists()
{
	createList(el.list, db.items);
	createList(el.completed, db.completed);
}

function createList(element, data)
{
	while(element.hasChildNodes()) {
		element.removeChild(element.lastChild);
	}

	for(var i = 0, len = data.length; i < len; i++)
	{
		appendItemToList(element, data[i]);
	}
}


el.input.addEventListener('keyup', function(event) {
	switch(event.keyCode)
	{
		case 13: //enter
			addItem(el.input.value);
		case 27: //esc //(intentional fallthrough)
			el.input.value = '';
			break;
	}

})

function storeLists() {
	localStorage.db = JSON.stringify(db);
}

function addItem(s) {
	if(s === '' || db.items.indexOf(s) > -1)
	{
		return;
	}

	db.items.push(s);
	storeLists();
	createLists();
}

function completeItem(s) {
	var index = db.items.indexOf(s);

	if(index === -1)
	{
		return;
	}

	db.completed.push(db.items.splice(index, 1)[0]);
	storeLists();
	createLists();
}

function removeItem(s) {
	var index = db.completed.indexOf(s);

	if(index === -1)
	{
		return;
	}

	db.completed.splice(index, 1);
	storeLists();
	createLists();
}

function promoteItem(s) {
	var index = db.items.indexOf(s);

	if(index === -1)
	{
		return;
	}

	db.items.splice(0, 0, db.items.splice(index, 1)[0]);
	storeLists();
	createLists();
}

function restoreItem(s) {
	var index = db.completed.indexOf(s);

	if(index === -1)
	{
		return;
	}

	db.items.push(db.completed.splice(index, 1)[0]);
	storeLists();
	createLists();
}

function appendItemToList(ul, s) {
	var curLi;
	var span = document.createTextNode(s);
	var closeButton = document.createElement('div');

	closeButton.className = 'close-btn';
	closeButton.appendChild(document.createTextNode('×'));
	closeButton.setAttribute('unselectable', 'on');

	curLi = document.createElement('li');
	curLi.appendChild(span);
	curLi.appendChild(closeButton);
	ul.appendChild(curLi);

	if(ul === el.list)
	{
		curLi.addEventListener('click', function(event) {
			var text = event.target.childNodes[0].nodeValue;
			promoteItem(text);
		});
		closeButton.addEventListener('click', function(event) {
			var text = event.target.parentNode.childNodes[0].nodeValue;
			completeItem(text);

			if(event.shiftKey)
			{
				removeItem(text);
			}
		});
	}
	else
	{
		curLi.addEventListener('click', function(event) {
			var text = event.target.childNodes[0].nodeValue;
			restoreItem(text);
		});
		closeButton.addEventListener('click', function(event) {
			var text = event.target.parentNode.childNodes[0].nodeValue;
			removeItem(text);
		});
	}
}

createLists();