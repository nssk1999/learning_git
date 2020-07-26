const hamburger = document.querySelector(
  ".header .nav-bar .nav-list .hamburger"
);
const mobile_menu = document.querySelector(".header .nav-bar .nav-list ul");
const menu_item = document.querySelectorAll(
  ".header .nav-bar .nav-list ul li a"
);
const header = document.querySelector(".header.container");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  mobile_menu.classList.toggle("active");
});

document.addEventListener("scroll", () => {
  var scroll_position = window.scrollY;
  if (scroll_position > 10) {
    header.style.backgroundColor = "#29323c";
  } else {
    header.style.backgroundColor = "transparent";
  }
});

menu_item.forEach((item) => {
  item.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    mobile_menu.classList.toggle("active");
  });
});

function _displayhs(data) {
  data["hptls"].forEach((item) => {
    var rw = `
		  <tr>
		  <td >${item["name"]}</td>
		  <td>${item["area"]}</td>
		  <td>${item["abeds"]}</td>
		  <td>${item["phone"]}</td>
		</tr>
		  `;
    document.getElementsByTagName("tbody").innerHTML += rw;
    document.getElementById("h-data").innerHTML += rw;
  });
}
const uril = "https://nssk1999.github.io/covid19/hps.json";
const geths = () => {
  fetch(uril)
    .then((response) => response.json())
    .then((data) => _displayhs(data))
    .catch((error) => console.error("Unable to get items.", error));
};
geths();
