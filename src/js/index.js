(function () {
  /*variables*/
  const image = document.getElementById("image");
  const selectoptions = document.getElementById("selectoptions");
  const selected = document.querySelector(".selected");
  const optionsContainer = document.querySelector(".options-container");
  const optionsList = document.querySelectorAll(".option");
  const containercountry = document.getElementById('container-country');



  //variables globales
  let paises=[];

/*funcion al iniciarse*/
  window.addEventListener("DOMContentLoaded", () => {
    AddPaises();
    ViewPaises(paises);
  });




  /*funcion para el select*/
  selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
  });
  optionsList.forEach((o) => {
    o.addEventListener("click", () => {
      selected.innerHTML = o.querySelector("label").innerHTML;
      optionsContainer.classList.remove("active");
    });
  });

  /*cargar los mapas*/
  const AddPaises=()=>{
     fetch('https://restcountries.eu/rest/v2/all')
     .then( res => res.json())
     .then( result => paises.push(...result))
  }

  const ViewPaises=(data)=>{
    console.log(data);

  }



})();
