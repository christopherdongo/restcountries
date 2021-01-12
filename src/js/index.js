(function () {
  /*variables*/
  const selectoptions = document.getElementById("selectoptions");
  const selected = document.querySelector(".selected");
  const optionsContainer = document.querySelector(".options-container");
  const optionsList = document.querySelectorAll(".option");
  const ContainerCountry = document.getElementById("container-country"); //
 
  var paises;
  //variables globales
  /*funcion al iniciarse*/
  window.addEventListener("DOMContentLoaded", () => {
    AddPaises();
    ViewPaises();
  });

  /*funcion para el select*/
  selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
  });
  optionsList.forEach((o) => {
    o.addEventListener("click", (e) => {
      e.preventDefault()
      selected.innerHTML = o.querySelector("label").innerHTML;
      AddRegion(o.querySelector('input').value)
      optionsContainer.classList.remove("active");
    });
  });

  /*cargar los mapas*/

  const AddRegion=(region)=>{
    Removechild();
    fetch(`https://restcountries.eu/rest/v2/region/${region}`)
    .then((res)=> res.json())
    .then((result) => ViewPaises(result))
  }
  const AddName=(name)=>{
    Removechild();
    fetch(`https://restcountries.eu/rest/v2/name/${name}?fullText=true`)
    .then(res=> res.json())
    .then((result) => ViewPaises(result))
  }
  const AddPaises = () => {
    fetch("https://restcountries.eu/rest/v2/all")
      .then((res) => res.json())
      .then((result) => ViewPaises(result));
  };

  const ViewPaises = (data) => {
    paises = data;

    if (data) {
      paises.map((item, index) => {
        const fragment = document.createDocumentFragment();
        let newElement = document.createElement("article");
        let div1 = document.createElement("div");
        let div2 = document.createElement("div");
        let img = document.createElement("img");
        let Pais = document.createElement("h1");
        let Population = document.createElement("p");
        let Region = document.createElement("p");
        let capital = document.createElement("p");
        newElement.className = "card-paises";
        div1.className = "card-paises__container1";
        div2.className = "card-paises__container2";
        img.className = "card-paises__container1__imagen";
        img.alt = item.name;
        newElement.id = index;
        Pais.innerHTML = item.name;
        img.src = item.flag;
        Population.innerHTML = item.population;
        Region.innerHTML = item.region;
        capital.innerHTML = item.capital;

        div1.appendChild(img);
        div2.appendChild(Pais);
        div2.appendChild(Population);
        div2.appendChild(Region);
        div2.appendChild(capital);
        newElement.appendChild(div1);
        newElement.appendChild(div2);
        fragment.appendChild(newElement);
        //añadir valores
        return ContainerCountry.appendChild(fragment);
      });
    }
  };

  /*remover*/
  const Removechild=()=>{

    if (ContainerCountry.children.length >=1) {
      while (ContainerCountry.firstChild) {
        ContainerCountry.removeChild(ContainerCountry.firstChild);
      }
    }
  } 


})();
