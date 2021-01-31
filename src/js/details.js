
  const loader = document.getElementById('loader');
    
    window.addEventListener('load', ()=>{
        const parametrosURL = new URLSearchParams(window.location.search)
        const idCliente = parametrosURL.get('id')
        if(idCliente){
          getPaisID(idCliente)
        }
    })
//variables
  let container = document.getElementById('detail_section2');    
    const getPaisID =(id)=>{
      SpinnerViews('block')
    setTimeout( ()=>{
      fetch(`https://restcountries.eu/rest/v2/alpha/${id}`)
      .then( res => res.json())
      .then( result => createElementDetails(result))
      SpinnerViews('none')
    }, 500)
    
    }
    const createElementDetails=(data)=>{
      
      //creacion de contenedores
      const fragment = document.createDocumentFragment();
      const article = document.createElement('article');
      const div1 = document.createElement('div');
      const div2 = document.createElement('div');
      const divborderv = document.createElement('div');
      const containerBorder = document.createElement('div');
      const detailfirts = document.createElement('div');
      const detailseconds = document.createElement('div')
      const img = document.createElement('img');
      const pais = document.createElement('h1');
      const population = document.createElement('p');
      const native = document.createElement('p');
      const region = document.createElement('p');
      const sub_region = document.createElement('p');
      const capital = document.createElement('p');
      const domain = document.createElement('p');
      const currenci = document.createElement('p');
      const lenguage = document.createElement('p');
      const titleborder = document.createElement('h2')
      //añadir clas clases y id
      article.classList="container-details__article";
      div1.className="container-details__details-div1";
      div1.id="details-div1";
      div2.className="container-details__details-div2";
      div2.id="details-div2";
      containerBorder.className="container-details__containerborder-d";
      detailfirts.className="container-details__detailsfirsts";
      detailseconds.className="container-details__detailseconds";
      pais.className="container-details__pais-d";
      population.className="container-details__population-d";
      native.className="container-details__native-d";
      region.className="container-details__region-d";
      img.className="container-details__imagen-d"
      sub_region.className="container-details__subregion-d";
      capital.className="container-details__capital-d";
      domain.className="container-details__domain-d";
      currenci.className="container-details__domain-d";
      lenguage.className="container-details__lenguage-d";
      divborderv.className="container-details__border-container";
      divborderv.id="border-container";
      titleborder.className="container-details__titleborder";
      //añadir datos
      img.src=data.flag;
      pais.textContent= data.name;
      native.innerHTML=`<strong>Native Name:</strong> ${data.nativeName}`
      population.innerHTML=`<strong>Population:</strong> ${data.population}`;
      region.innerHTML=`<strong>Region:</strong> ${data.region}`;
      sub_region.innerHTML=`<strong>Sub Region:</strong> ${data.subregion}`;
      capital.innerHTML=`<strong>Capital:</strong> ${data.capital}`;
      domain.innerHTML=`<strong>Top Level Domain:</strong> ${data.topLevelDomain[0]}`;
      currenci.innerHTML=`<strong>Currencies:</strong> ${data.currencies[0].name}`
      lenguage.innerHTML=`<strong>Languages:</strong> ${data.languages.map( item => item.name)}`
      titleborder.innerHTML=`<strong>Border Countries:</strong>`

      data.borders.map( item => {
        let border = document.createElement('a');
             border.className="container-details__link-paisborder"
             border.textContent=item;       
        return divborderv.appendChild(border)
      })
      //añadir hijos al hijo
      div1.appendChild(img);
      detailfirts.appendChild(pais);
      detailfirts.appendChild(native);
      detailfirts.appendChild(population);
      detailfirts.appendChild(region);
      detailfirts.appendChild(sub_region);
      detailfirts.appendChild(capital);
      detailseconds.appendChild(domain);
      detailseconds.appendChild(currenci);
      detailseconds.appendChild(lenguage);
      /*añadiendo el chield*/ 
      div2.appendChild(detailfirts)
      div2.appendChild(detailseconds)
      containerBorder.appendChild(titleborder);
      containerBorder.appendChild(divborderv);
      div2.appendChild(containerBorder)
     /*añadir hijos al padre*/ 
      article.appendChild(div1);
      article.appendChild(div2);
   /*añadir al principal*/ 
      fragment.appendChild(article);
      container.appendChild(fragment);

    } 


      /*spinner*/
  const SpinnerViews = (views) => {
    loader.style.display = views;
  };





