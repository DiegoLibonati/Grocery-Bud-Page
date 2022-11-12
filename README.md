# Grocery-Page

## Getting Started

1. Clone the repository
2. Join to the correct path of the clone
3. Install LiveServer extension from Visual Studio Code [OPTIONAL]
4. Click in "Go Live" from LiveServer extension

---

1. Clone the repository
2. Join to the correct path of the clone
3. Open index.html in your favorite navigator

## Description

I made a web page that allows you to add items to a list. These items can be edited and deleted. There is also a button to delete all items in the list. It is important to note that every item that is added, is saved in the LocalStorage. This allows to keep the items in each update of the page.

## Technologies used

1. Javascript
2. CSS3
3. HTML5

## Galery

![grocery-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/grocery-0.jpg)

![grocery-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/grocery-1.jpg)

![grocery-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/grocery-2.jpg)

![grocery-page](https://raw.githubusercontent.com/DiegoLibonati/DiegoLibonatiWeb/main/data/projects/Javascript/Imagenes/grocery-3.jpg)

## Portfolio Link

`https://diegolibonati.github.io/DiegoLibonatiWeb/#/projects?q=Grocery%20page`

## Video

https://user-images.githubusercontent.com/99032604/199616057-b39c7e07-d4c3-4674-8cf2-2324ddcbbc68.mp4

## Documentation

The `addToLocalStorage()` function is in charge of adding to the LocalStorage the item that is added to the list:

```
function addToLocalStorage(value) {
  let itemsLocalStorage = getLocalStorage();

  if (itemsLocalStorage != null && dataEdit == false) {
    itemsLocalStorage.push({ item: value });

    localStorage.setItem("list", JSON.stringify(itemsLocalStorage));

    addItemToContainer(value);
  }

  if (itemsLocalStorage == null && dataEdit == false) {
    dataLocalStorage.push({ item: value });

    localStorage.setItem("list", JSON.stringify(dataLocalStorage));

    addItemToContainer(value);
  }
}
```

The `addItemToContainer()` function is in charge of adding the HTML of the item that was added to the list:

```
function addItemToContainer(value) {
  containerShowItems.innerHTML += `

    <li>
        <div class="section_container_items_list_li_title">
            <h2>${value}</h2>
        </div>

        <div class="section_container_items_list_li_btns">
            <button type="button" class="btnDelete"><i class="fa-solid fa-trash"></i></button>
            <button type="button" class="btnEdit"><i class="fa-solid fa-pen-to-square"></i></button>
        </div>
    </li>
    `;

  itemDelete();
  itemEdit();
}
```

The `readLocalStorage()` function is in charge of reading the LocalStorage each time the page is reloaded and adding the items to the list:

```
function readLocalStorage() {
  let itemsLocalStorage = getLocalStorage();

  if (itemsLocalStorage != null) {
    for (let i = 0; i < itemsLocalStorage.length; i++) {
      addItemToContainer(itemsLocalStorage[i].item);
    }
  }
}
```

The `getLocalStorage()` function is in charge of getting the LocalStorage information:

```
function getLocalStorage() {
  return JSON.parse(localStorage.getItem("list"));
}
```

The `itemDelete()` function is in charge of deleting an item when it is called:

```
function itemDelete(value) {
  const btnsDelete = document.querySelectorAll(".btnDelete");

  btnsDelete.forEach(function (btn) {
    btn.addEventListener("click", () => {
      let itemsLocalStorage = getLocalStorage();

      let liOfBtn = btn.parentElement.parentElement;
      let liId =
        btn.parentElement.parentElement.children[0].children[0].outerText;

      for (let i = 0; i < itemsLocalStorage.length; i++) {
        if (liId == itemsLocalStorage[i].item) {
          const index = itemsLocalStorage.indexOf(itemsLocalStorage[i]);

          itemsLocalStorage.splice(index, 1);
          localStorage.setItem("list", JSON.stringify(itemsLocalStorage));
        }
      }

      liOfBtn.remove();
    });
  });
}
```

The `itemEdit()` function is in charge of editing an item when it is called:

```
function itemEdit() {
  const btnsEdit = document.querySelectorAll(".btnEdit");

  btnsEdit.forEach(function (btn) {
    btn.addEventListener("click", () => {
      let liH2 = btn.parentElement.parentElement.children[0].children[0];
      let liId =
        btn.parentElement.parentElement.children[0].children[0].outerText;
      let itemsLocalStorage = getLocalStorage();
      dataEdit = true;
      btnAddData.textContent = "✓";
      inputDataEntry.value = liId;

      btnAddData.addEventListener("click", () => {
        for (let i = 0; i < itemsLocalStorage.length; i++) {
          if (liId == itemsLocalStorage[i].item) {
            itemsLocalStorage[i].item = inputDataEntry.value;
            liH2.innerHTML = itemsLocalStorage[i].item;
            localStorage.setItem("list", JSON.stringify(itemsLocalStorage));
          }
        }

        btnAddData.textContent = "+";
        dataEdit = false;
      });
    });
  });
}
```
