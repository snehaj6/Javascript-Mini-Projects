const input = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const itemTotal = document.getElementById("item");
const counterContainer = document.getElementById("counter-container");

function addTask() {
  if (input.value === "") {
    alert("You must write something!");
  } else {
    let li = document.createElement("li");
    li.innerText = input.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
    itemTotal.textContent =
      document.getElementById("list-container").children.length;
  }
  input.value = "";
  saveData();
}

listContainer.addEventListener(
  "click",
  (e) => {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      itemTotal.textContent =
        document.getElementById("list-container").children.length;
      saveData();
    }
  },
  false
);

function deleteAll() {
  
  localStorage.clear();
  listContainer.innerHTML = "";
  itemTotal.textContent =
    document.getElementById("list-container").children.length;
  saveData();
}


function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
  localStorage.setItem("totalCount", itemTotal.textContent);

}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
  itemTotal.textContent = localStorage.getItem("totalCount");
}

showTask();
