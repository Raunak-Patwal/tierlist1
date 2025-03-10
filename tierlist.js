let currentdraggeditem;
console.log("hello");

const tierinput = document.getElementById("tier");//input tag ke andar wali cheezo ko access karne ke liye element bana diya khud sa 
const itemcontainers = document.getElementsByClassName('item-container');
const imageform = document.getElementById('imageform');
// const tierlists = document.querySelectorAll('.tier-list-items');

// Setup drag event for existing items
for (const itemcontainer of itemcontainers) {//normal for each will not gonna work as itemcontainer is not a normal array but a html element
    setupitemcontainerfordrag(itemcontainer);
}   

// tierlists.forEach(setupdropzoneinTierList);

imageform.addEventListener('submit', (event) => {
    event.preventDefault();
    console.log("form submitted");

    const imageiteminput = document.getElementById('image-item');
    const imageurl = imageiteminput.value;


    if (imageurl === "") {
        alert("please input a value");
        return;
    }

    imageiteminput.value = '';
    createtierlistitem(imageurl);
});

const submitbtn = document.getElementById("submit");
submitbtn.addEventListener('click', (event) => {
    event.preventDefault();
    console.log("button is clicked");

    if (tierinput.value === "") {       
        alert("please input a value");
        return;
    }

    createtierlist(tierinput.value);
});

function createtierlist(tierlistname) {
    const newtierlist = document.createElement("div");
    newtierlist.classList.add("tier-list");

    const heading = document.createElement("div");
    heading.classList.add("heading");
    heading.textContent = tierlistname;

    const newtierlistitems = document.createElement("div");
    newtierlistitems.classList.add("tier-list-items");

    newtierlist.appendChild(heading);
    newtierlist.appendChild(newtierlistitems);

    document.getElementById('tier-list-section').appendChild(newtierlist);

    tierinput.value = "";
    setupTierListForDrop(newtierlistitems);
}

function createtierlistitem(imageurl) {
    const imagediv = document.createElement('div');
    imagediv.classList.add('item-container');
    imagediv.setAttribute('draggable', 'true');

    const img = document.createElement('img');
    img.src = imageurl;

    imagediv.appendChild(img);

    document.getElementById('untier-section').appendChild(imagediv);
    setupitemcontainerfordrag(imagediv);
}

const nontiersection = document.getElementById('untier-section');

function setupitemcontainerfordrag(itemcontainer) {
    itemcontainer.addEventListener('dragstart', (event) => {
        console.log("Started dragging");
        currentdraggeditem = event.target.parentNode;
        console.log(currentdraggeditem);
        itemcontainer.addEventListener('dblclick', (event) => {
            nontiersection.appendChild(currentdraggeditem);
        });
    });
}

function setupTierListForDrop(tierlistitem) {
    
    tierlistitem.addEventListener('drop', (event) => {
        event.preventDefault();    
       
 
    });
    
    
    tierlistitem.addEventListener('dragover', function (event){
       console.log("dropped");
       event.target.appendChild(currentdraggeditem);
       console.log(event.target);
       if(this != currentdraggeditem.parentNode){
           this.appendChild(currentdraggeditem);
       }
       
        
    });

    
}