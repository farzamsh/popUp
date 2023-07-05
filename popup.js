const button = document.getElementById("popup-button");
const popupSection = document.getElementById("popup-section");
// get element for close - minimize - maximize button:
const closeButton = document.getElementById("close-button");
const minimizeButton = document.getElementById("minimize-button");
const maximizeButton = document.getElementById("maximize-button");
// get element from table:
const status_table = document.getElementById("status");
const address_table = document.getElementById("address");
const phone_table = document.getElementById("phone");
const name_table = document.getElementById("name");
const srno_table = document.getElementById("srno");
// get element from popup:
const minimizePopup = document.getElementById("minimizePopup");
const cTable = document.getElementById("my_table");
// get element table head:
const ths = document.querySelectorAll("th");
const contentCounter = document.getElementById("contentCounter");
const tableSize = document.getElementById("tableSize");
// get element table body:
const tBody = document.getElementById("tableBody");
const columnName = document.getElementById("columnName");

const tablePages = document.querySelector(".links");
const spanLinks = tablePages.querySelectorAll("span");
// initial basic variables:
// import from backend:
let totalPages = 4523;
let totalRows = 86524;
let selectedPage = 1;

// assign table head css class:
ths.forEach((th) => {
  th.classList.add("th-td-size1");
});

// 12 addEventListeners:

button.addEventListener("click", function () {
  popupSection.classList.toggle("hidden");
  contentCounter.innerHTML = `${totalRows} ردیف در ${totalPages} صفحه.`;
  loadTable2(tableSize.value, selectedPage - 1);
  button.classList.add("hidden");
  tablePages.lastElementChild.textContent = `${totalPages} `;
  setPageNumbers(7);
});

spanLinks.forEach((pgNum) => {
  pgNum.addEventListener("click", function () {
    if (selectedPage != pgNum.textContent) {
      selectedPage = Number(pgNum.textContent);
      loadTable2(tableSize.value, selectedPage - 1);
    }
  });
});
closeButton.addEventListener("click", function () {
  popupSection.classList.add("hidden");
  button.classList.remove("hidden");
});

minimizeButton.addEventListener("click", function () {
  popupSection.classList.add("hidden");
  minimizePopup.classList.remove("hidden");
});

minimizePopup.addEventListener("click", function () {
  popupSection.classList.toggle("hidden");
  minimizePopup.classList.add("hidden");
});

maximizeButton.addEventListener("click", function () {
  popupSection.classList.toggle("max-icon1");
  popupSection.classList.toggle("max-icon2");

  cTable.classList.toggle("tab-size1");
  cTable.classList.toggle("tab-size2");

  ths.forEach((th) => {
    th.classList.toggle("th-td-size1");
    th.classList.toggle("th-td-size2");
  });

  tds.forEach((td) => {
    td.classList.toggle("th-td-size1");
    td.classList.toggle("th-td-size2");
  });
});

tableSize.addEventListener("change", function () {
  loadTable2(tableSize.value, selectedPage - 1);
});

status_table.addEventListener("click", function () {
  sortTable(1, "character");
});
address_table.addEventListener("click", function () {
  sortTable(2, "character");
});
phone_table.addEventListener("click", function () {
  sortTable(3, "character");
});
name_table.addEventListener("click", function () {
  sortTable(4, "character");
});
srno_table.addEventListener("click", function () {
  sortTable(5, "numeric");
});

// 3 functions:
function loadTable(size) {
  // Fetch data from the backend API
  fetch("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.json())
    .then((data) => {
      tBody.innerHTML = "";
      if (size > 11) {
        alert("حداکثر تعداد ردیف ها 10 می باشد");
        size = 10;
      }
      for (let i = 0; i < size; i++) {
        const row = document.createElement("tr");
        const cell1 = document.createElement("td");
        const cell2 = document.createElement("td");
        const cell3 = document.createElement("td");
        const cell4 = document.createElement("td");
        const cell5 = document.createElement("td");
        cell1.textContent = data[i].phone;
        cell2.textContent = data[i].email;
        cell3.textContent = data[i].username;
        cell4.textContent = data[i].name;
        cell5.textContent = data[i].id;
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        tBody.appendChild(row);
      }
      // define a global letiable to store all tds
      tds = document.querySelectorAll("td");
      if (ths[0].classList.contains("th-td-size1")) {
        tds.forEach((td) => {
          td.classList.add("th-td-size1");
        });
      } else {
        tds.forEach((td) => {
          td.classList.add("th-td-size2");
        });
      }
    });
}

function sortTable(n, type) {
  var table,
    rows,
    switching,
    i,
    x,
    y,
    shouldSwitch,
    dir,
    switchcount = 0;
  n = n - 1;
  table = document.getElementById("my_table");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";
  var sortIconAll = document.querySelectorAll(".column_name span");
  for (var i = 0; i < sortIconAll.length; i++) {
    sortIconAll[i].classList.add("hidden");
  }
  var sortIcon = document.getElementById("sortIcon" + n);
  sortIcon.classList.remove("hidden");
  sortIcon.textContent = dir === "asc" ? "▲" : "▼";
  sortIcon.style.color = dir === "asc" ? "green" : "red";
  /*Make a loop that will continue until
    no switching has been done:*/
  while (switching) {
    //start by saying: no switching is done:
    switching = false;
    rows = table.rows;
    /*Loop through all table rows (except the
      first, which contains table headers):*/
    for (i = 1; i < rows.length - 1; i++) {
      //start by saying there should be no switching:
      shouldSwitch = false;
      /*Get the two elements you want to compare,
        one from current row and one from the next:*/
      x = rows[i].getElementsByTagName("TD")[n];
      y = rows[i + 1].getElementsByTagName("TD")[n];
      if (type == "numeric") {
        var xValue = parseFloat(x.innerHTML);
        var yValue = parseFloat(y.innerHTML);
      } else {
        var xValue = x.innerHTML.toLowerCase();
        var yValue = y.innerHTML.toLowerCase();
      }

      /*check if the two rows should switch place,
        based on the direction, asc or desc:*/
      if (dir == "asc") {
        if (xValue > yValue) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      } else if (dir == "desc") {
        if (xValue < yValue) {
          //if so, mark as a switch and break the loop:
          shouldSwitch = true;
          break;
        }
      }
    }
    if (shouldSwitch) {
      /*If a switch has been marked, make the switch
        and mark that a switch has been done:*/
      rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
      switching = true;
      //Each time a switch is done, increase this count by 1:
      switchcount++;
    } else {
      /*If no switching has been done AND the direction is "asc",
        set the direction to "desc" and run the while loop again.*/
      if (switchcount == 0 && dir == "asc") {
        dir = "desc";
        switching = true;
      }
    }
  }
  sortIcon.textContent = dir === "asc" ? "▲" : "▼";
  sortIcon.style.color = dir === "asc" ? "green" : "red";
}

function loadTable2(size, floor) {
  // Fetch data from the backend API
  fetch("https://jsonplaceholder.typicode.com/photos")
    .then((response) => response.json())
    .then((data) => {
      tBody.innerHTML = "";
      if (size > 20) {
        alert("حداکثر تعداد ردیف ها 15 می باشد");
        size = 20;
      }
      tBody.innerHTML = "";
      for (let i = floor * size; i < (floor + 1) * size; i++) {
        const row = document.createElement("tr");
        const cell1 = document.createElement("td");
        const cell2 = document.createElement("td");
        const cell3 = document.createElement("td");
        const cell4 = document.createElement("td");
        const cell5 = document.createElement("td");
        cell1.textContent = (i % 2 == 0 ? "active" : "inactive") + " " + i;
        cell2.textContent = data[i].url.slice(0, 20) + i;
        cell3.textContent = data[i].title.slice(0, 20) + i;
        cell4.textContent = data[i].thumbnailUrl.slice(0, 20) + i;
        cell5.textContent = data[i].id;
        row.appendChild(cell1);
        row.appendChild(cell2);
        row.appendChild(cell3);
        row.appendChild(cell4);
        row.appendChild(cell5);
        tBody.appendChild(row);
      }
      // define a global letiable to store all tds
      tds = document.querySelectorAll("td");
      if (ths[0].classList.contains("th-td-size1")) {
        tds.forEach((td) => {
          td.classList.add("th-td-size1");
        });
      } else {
        tds.forEach((td) => {
          td.classList.add("th-td-size2");
        });
      }
    });
}
function setPageNumbers(pC) {
  //page Counter (pc) is the nunber of desired pages that are shown in under the table, the proper num is 7.
  // let varJ = Number(startPageNum(selectedPage));
  let middle = min(totalPages, pC) / 2 + 1;
  if (totalPages > pC) {
    if (selectedPage < middle) {
      for (let i = 1; i < pC + 1; i++) {
        if (i < middle + 2) {
          const span = document.createElement("span");
          span.className = "link";
          span.innerText = i;
        } else if (i == middle + 2) {
          const span = document.createElement("span");
          span.className = "link";
          span.innerText = ". . .";
        } else {
          const span = document.createElement("span");
          span.className = "link";
          span.innerText = totalPages;
        }
      }
    } else if (selectedPage < totalPages - middle) {
      
    } else {
    }
  } else {
    //   for (let i = 0; i < totalPages; i++)
    //   {
    //   const span = document.createElement("span");
    //   span.className = "link";
    //   span.innerText = i+1;
    //   }
    // }
  }

  //   for (let i = 0; i < 7; i++) {
  //     if(i<3){
  //     const span = document.createElement("span");
  //     span.className = "link";
  //     span.innerText = varJ+i;
  //     }
  //     else if(i==4){
  //       const span = document.createElement("span");
  //       span.className = "link";
  //       span.innerText = ". . .";
  //     }
  //     else{
  //       const span = document.createElement("span");
  //       span.className = "link";
  //       span.innerText = ;
  //     }
  //   }
  // }
  // function startPageNum(selectedPage,pc) {
  // //
  // //page Counter (pc) is the nunber of desired pages that are shown in under the table, the proper num is 7.
  //   middle =   let middle = min(totalPages,pc)/2+1

  //   if (selectedPage < middle) {
  //     return 1;
  //   } else if( selectedPage > totalPages -3 ){
  //     return totalPages - (middle+1);
  //   }
  //    else{
  //     return selectedPage - 1;
  //   }
}
