const inputDataEntry = document.querySelector(".section_container_dataentry input");
const btnAddData = document.querySelector(".section_container_dataentry button");

const containerShowItems = document.querySelector(".section_container_items_list");

const btnClearAllItems = document.querySelector(".section_container_clearitems button");

let dataLocalStorage = [];
let dataEdit = false;

readLocalStorage();

btnAddData.addEventListener("click", ()=>{

    let inputDataEntryValue = inputDataEntry.value;

    addToLocalStorage(inputDataEntryValue);

});

btnClearAllItems.addEventListener("click", ()=>{

    containerShowItems.innerHTML = "";

    localStorage.clear();

});

function addToLocalStorage(value){

    let itemsLocalStorage = getLocalStorage();
    
    if (itemsLocalStorage != null && dataEdit == false){

        itemsLocalStorage.push({item:value})

        localStorage.setItem("list", JSON.stringify(itemsLocalStorage));

        addItemToContainer(value);

    }
    
    if (itemsLocalStorage == null && dataEdit == false){

        dataLocalStorage.push({item:value});

        localStorage.setItem("list", JSON.stringify(dataLocalStorage));
    
        addItemToContainer(value);
    }



}

function addItemToContainer(value){

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

function readLocalStorage(){
    let itemsLocalStorage = getLocalStorage();
    
    if (itemsLocalStorage != null){
        for (let i = 0; i < itemsLocalStorage.length; i++){
            addItemToContainer(itemsLocalStorage[i].item);
        }
    }

}

function getLocalStorage(){
   return JSON.parse(localStorage.getItem("list"));
}

function itemDelete(value){
    const btnsDelete = document.querySelectorAll(".btnDelete");

    btnsDelete.forEach(function(btn){

        btn.addEventListener("click", ()=>{

            let itemsLocalStorage = getLocalStorage();

            let liOfBtn = btn.parentElement.parentElement;
            let liId = btn.parentElement.parentElement.children[0].children[0].outerText;
            
            
            for(let i = 0; i < itemsLocalStorage.length; i++){
                if (liId == itemsLocalStorage[i].item){
                    const index = itemsLocalStorage.indexOf(itemsLocalStorage[i]);

                    itemsLocalStorage.splice(index, 1);
                    localStorage.setItem("list", JSON.stringify(itemsLocalStorage));
                }
            }

            liOfBtn.remove();
        });

    });
}

function itemEdit(){

    const btnsEdit = document.querySelectorAll(".btnEdit");

    btnsEdit.forEach(function(btn){
        btn.addEventListener("click", ()=>{

            let liH2 = btn.parentElement.parentElement.children[0].children[0];
            let liId = btn.parentElement.parentElement.children[0].children[0].outerText;
            let itemsLocalStorage = getLocalStorage();
            dataEdit = true;
            btnAddData.textContent = "✓";
            inputDataEntry.value = liId;


            btnAddData.addEventListener("click", ()=>{

                for (let i = 0; i < itemsLocalStorage.length; i++){
                    if (liId == itemsLocalStorage[i].item){
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



