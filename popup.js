const button = document.getElementById("popup-button");
const popupSection = document.getElementById("popup-section");
const closeButton = document.getElementById("close-button");
const minimizeButton = document.getElementById("minimize-button");
const maximizeButton = document.getElementById("maximize-button");
const status_table = document.getElementById("status");
const address_table = document.getElementById("address");
const phone_table = document.getElementById("phone");
const name_table = document.getElementById("name");
const srno_table = document.getElementById("srno");
const minimizePopup = document.getElementById("minimizePopup");


button.addEventListener("click", function () {
  popupSection.classList.toggle("hidden");
  button.classList.add("hidden");
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
});

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
  table = document.getElementById("my_table");
  switching = true;
  //Set the sorting direction to ascending:
  dir = "asc";
  var sortIconAll = document.querySelectorAll(".column_name span");
  for (var i = 0; i < sortIconAll.length; i++) {
    console.log(sortIconAll.length);
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
        var xValue = (x.innerHTML).toLowerCase();
        var yValue = (y.innerHTML).toLowerCase();
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
status_table.addEventListener("click", function () {
  sortTable(0, "character");
});
address_table.addEventListener("click", function () {
  sortTable(1, "character");
});
phone_table.addEventListener("click", function () {
  sortTable(2 , "numeric");
});
name_table.addEventListener("click", function () {
  sortTable(3 , "character");
});
srno_table.addEventListener("click", function () {
  sortTable(4 , "numeric");
});
