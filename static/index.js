


// // Functional Variables
// let contentArray =[1,2,3,4,5,6]
let selectedCategory ="";
let selectedDifficult ="";
let allOptionSelected = false;

// //DOM Registration

// 
// let contentArea = document.querySelector(".contentArea")
let navBar = document.querySelector(".navBar");
let selectionBox = document.querySelector(".selectionBox")
let infoParaContainer = document.querySelector(".infoParaContainer")
let infoPara = document.querySelector(".infoPara")
// let allCategoryElements=document.querySelectorAll(".categoryPara")
let applyButton = document.querySelector(".applyButtonDisabled")
let difficultButtons = document.querySelectorAll(".difficultPara")


//Added Event handler

navBar.addEventListener("touchstart", handleTouchNav);
applyButton.addEventListener("touchstart",handleApplyButton )
difficultButtons.forEach(element => {
  element.addEventListener("touchstart", handleDifficultButton)
  
});
// //Event Functions

function handleTouchNav(event){
  console.log("touch")
  navBar.classList.toggle("navBarActive");
  navBar.removeEventListener("touchstart", handleTouchNav);
  
};

function handleTouchCategory(event){
  selectedCategory = event.target.innerText;
  checkSelection();
  console.log(selectedCategory);
  //allCategoryElements erst in der Funktion initialisiert, da via Async Await fetched und generiert
  let allCategoryElements=document.querySelectorAll(".categoryPara")
  
  allCategoryElements.forEach(element => {
    
    // Überprüfen, ob das Element die Klasse 'categoryParaSelected' hat
    if (element.classList.contains("categoryParaSelected")&& element !== event.target) {
      
      element.classList.remove("categoryParaSelected");
    }
  });

  event.target.classList.add("categoryParaSelected")
  
  
};

// Function for Apply Button Event 
function handleApplyButton(event){
if(allOptionSelected== true) {
  console.log("true")
}

}

function handleDifficultButton(event) {
  selectedDifficult = event.target.innerText;
  checkSelection();
  console.log(selectedDifficult);

  difficultButtons.forEach(element => {
    if (element.classList.contains("categoryParaSelected")) {
      element.classList.remove("categoryParaSelected");
    }
  });

  event.target.classList.add("categoryParaSelected");
}
  







// for (let i=0; i<contentArray.length; i++){
// let contentBox = document.createElement("div")
// contentBox.classList.add("contentBox")
// contentArea.appendChild(contentBox)
// console.log(i)

// }

// URL API TRIVIA CATEGORIES
let url = "http://127.0.0.1:5000/categories";


// Async Function fetching Categories with embedded append in DOM and event listener handleTouchCategory
async function autoFetch(url){

const response = await fetch(url);
let fetchedData = await response.json();
return fetchedData

}

// async function appendOptions HOF using autofetch for async await fetch of API DATA. Data used to generate Category Divs and append them to DOM with Event Listener

async function appendOptions(url){
let receivedData = await autoFetch(url)
receivedData.categories.forEach(element => {
let categoryBox = document.createElement("div")
categoryBox.classList.add("categoryBox")
categoryBox.addEventListener("touchstart",handleTouchCategory)
let categoryPara = document.createElement("p")
categoryPara.classList.add("categoryPara")
categoryPara.innerText = element
categoryBox.append(categoryPara)
selectionBox.appendChild(categoryBox)
console.log(element)
});
   
  
  }

appendOptions(url)

//Function 


function checkSelection(){
if(selectedCategory!=="" && selectedDifficult!==""){
  allOptionSelected = true;
  applyButton.classList.add("applyButtonEnabled")
  console.log("all selected")
}

}