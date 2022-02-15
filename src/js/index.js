(function () {
  window.addEventListener("DOMContentLoaded", () => {
    AddPaises();
    ViewPaises();
  });
  /*variables*/
  const selected = document.querySelector(".selected");
  const optionsContainer = document.querySelector(".options-container");
  const optionsList = document.querySelectorAll(".option");
  const ContainerCountry = document.getElementById("container-country2"); //
  const loader = document.getElementById('loader');
  const form = document.getElementById('form');
  const search = document.getElementById('search__input');
  var paises;

  form.addEventListener('submit', (e)=>{
     e.preventDefault();
     if(search.value.length >= 3){
      AddName(search.value)
     }
  })

  search.addEventListener('change', ()=>{
    if(search.value===''){
      AddPaises()
    }
  })
  //variables globales
  /*funcion al iniciarse*/
  /*funcion para el select*/
  selected.addEventListener("click", () => {
    optionsContainer.classList.toggle("active");
  });
  optionsList.forEach((option) => {
    option.addEventListener("click", (e) => {
      e.preventDefault()
      selected.innerHTML = option.querySelector("label").innerHTML;
      AddRegion(option.querySelector('input').value)
      optionsContainer.classList.remove("active");
    });
  });

  /*cargar los mapas*/
  const AddRegion=(regions)=>{
    console.log(regions)
    SpinnerViews('block');
    Removechild();
    setTimeout( ()=>{
      /*fetch(`https://restcountries.com/v3.1/region/${region}`)
      .then((res)=> res.json())
      .then((result) => ViewPaises(result))*/
      const data = JSON.parse(localStorage.getItem('countries')).filter(({region}) => region===regions)
      ViewPaises(data);
      SpinnerViews('none')
    },800)
  }


  const AddName=(name)=>{
    console.log(name)
    SpinnerViews('block');
    Removechild();
    setTimeout(()=>{
      /*fetch(`https://restcountries.com/v3.1/name/${name}?fullText=true`)
      .then(res=> res.json())
      .then((result) => {
        console.log(result)
        ViewPaises(result);
      })*/
      const data = JSON.parse(localStorage.getItem('countries')).filter((item) => item.name.common===capitalizarPrimeraLetra(name) )
      ViewPaises(data);
      SpinnerViews('none');
    },500)
  }
  const AddPaises = () => {
    SpinnerViews('block');
    Removechild();
    setTimeout( ()=>{
      if(JSON.parse(localStorage.getItem('countries'))){
        const data = JSON.parse(localStorage.getItem('countries'))
        ViewPaises(data);
    }else{
      fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((result) => {
        localStorage.setItem('countries',JSON.stringify(result))
        const data = JSON.parse(localStorage.getItem('countries'))
        ViewPaises(data);
      });
      
    }
    SpinnerViews('none');
    },1000)
  };

  const capitalizarPrimeraLetra=(str) =>{
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  const ViewPaises = (data) => {
    paises = data;
    if (data) {
        paises.map((item, index) => {
        const fragment = document.createDocumentFragment();
        let newElement = document.createElement("article");
        let enlace = document.createElement('a')
        let div1 = document.createElement("div");
        let div2 = document.createElement("div");
        let img = document.createElement("img");
        let Pais = document.createElement("h1");
        let Population = document.createElement("h1");
        let Region = document.createElement("p");
        let capital = document.createElement("p");
        newElement.className = "card-paises";
        enlace.className ="card-paises__link"
        div1.className = "card-paises__container1";
        div2.className = "card-paises__container2";
        img.className = "card-paises__container1__imagen";
        Pais.className="card-paises__container2__pais"
        Population.className="card-paises__container2__population"
        Region.className="card-paises__container2__region"
        capital.className="card-paises__container2__capital"
        img.alt = item.name;
        newElement.id = index;
        Pais.innerHTML = item.name.common;
        img.src = item.flags.png;
        enlace.href=`details.html?id=${item.cca3}`
        Population.innerHTML = `<strong>Population:</strong> ${item.population}`;
        Region.innerHTML = `<strong>Region:</strong> ${item.region}`;
        capital.innerHTML = `<strong>Capital:</strong> ${item.capital}`;

        enlace.appendChild(img)
        div1.appendChild(enlace);
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
  /*spinner*/
  const SpinnerViews = (views) => {
    loader.style.display = views;
  };


})();
