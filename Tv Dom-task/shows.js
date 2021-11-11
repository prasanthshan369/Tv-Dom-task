function shows() {
  const body = document.querySelector("body");
  const search = document.createElement("input");
  search.setAttribute("type", "text");
  search.setAttribute("placeholder", "Enter The Field");
  search.className = "search";
  const datalist = document.createElement("datalist");
  datalist.setAttribute("id", "browsers");
  const input = document.createElement("input");
  input.placeholder = "Show all";
  input.type = "text";
  input.setAttribute("list", "browsers");
  input.id = "browser";
  input.className = "input";
  input.ondblclick = "searchfield()";
  const showlength=document.createElement('div')
  showlength.className="showlegnth"
  const showtotal=document.createElement('span')
  const displayshow = document.createElement("span");
showlength.append(showtotal);
showlength.append(displayshow);
  const containercontent = document.createElement("div");
  containercontent.className = "containercontent";
  async function searchfield() {
    const data = await fetch("https://api.tvmaze.com/shows");
    const res = await data.json();
    out = " ";
    res.forEach((element) => {
      out += `

    <option value='${element.name}' >${element.name}-S0${element.season}E0${element.number}</option>
          `;

      datalist.innerHTML = out;
    });
  }
  searchfield();
  body.append(input);
  body.append(datalist);
  body.append(search); 
  body.append(showlength)
  let response = [];
  input.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();

    containercontent.innerHTML = " ";
    const filterCharacter = response.filter((character) => {
      return character.name.toLowerCase().includes(searchString);
    });
    displayCharacters(filterCharacter);
  });
  body.append(containercontent);
  response = [];
  search.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();
    containercontent.innerHTML = " ";
    const filterCharacter = response.filter((character) => {
      return (
        character.name.toLowerCase().includes(searchString) ||
        character.summary.toLowerCase().includes(searchString)
      );
    });
    displayCharacters(filterCharacter);
  });
  async function callme() {
    const data = await fetch("https://api.tvmaze.com/shows");
    response = await data.json();
    showtotal.innerHTML=` Display :${9+response.length}`
    displayCharacters(response);
  }
  callme();
  function displayCharacters(respo) {
   
    respo.forEach((element) => {
   displayshow.innerHTML=`:${element.id}`
      const container = document.createElement("div");
      container.setAttribute("value", `${element.id}`);
      container.value = `${element.id}`;
      container.className = "containers";
      container.style.cursor = "pointer";
      container.onclick = function setup() {
        const id = container.value;
        showepisodes(id);
        window.onload = setup;
      };
      containercontent.append(container);
      const head = document.createElement("h3");
      head.innerHTML = `${element.name}`;
      head.className = "head";
      container.append(head);
      const showrating=document.createElement('div');
      showrating.className="showrating";
      const img = document.createElement("img");
      img.setAttribute("src", `${element.image.medium}`);
      img.className = "img";
      const ratings=document.createElement('div')
      ratings.className="ratings"
      const rated=document.createElement('h4')
      const genres=document.createElement('h4')
      const runtime=document.createElement('h4');
      runtime.innerHTML=`${element.runtime}`
      genres.innerHTML=`${element.genres[0]}`
      rated.innerHTML=`${element.rating['average']}`
      const status=document.createElement('h4')
      status.innerHTML=`${element.status}`
      ratings.append(rated)
      ratings.append(status)
      ratings.append(genres)
      ratings.append(runtime);
      showrating.append(img)
      showrating.append(ratings)
      container.append(showrating);
      const content = document.createElement("div");
      content.className = "content";
      container.append(content);
      const summary = document.createElement("p");
      summary.innerHTML = `<strong>${element.name}</strong>${element.summary}`;
      content.append(summary);
    });
  }
}

///////////////////////////////////////////////
function showepisodes(episodeid){
episodes(episodeid)
}