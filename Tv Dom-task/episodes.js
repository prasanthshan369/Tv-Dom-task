async function episodes(id) {
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
  input.ondblclick = "fun()";
  const button = document.createElement("a");
  button.innerHTML = "Back";
  button.href = "index.html";
  button.className = "button";
  const showlength=document.createElement('div')
  showlength.className="showlegnth"
  const showtotal=document.createElement('span')
  const displayshow = document.createElement("span");
showlength.append(showtotal);
showlength.append(displayshow);
  const containermain = document.createElement("div");
  containermain.className = "containermain";
  body.innerHTML = " ";
  async function fun() {
    const data = await fetch(`https://api.tvmaze.com/shows/${id}/episodes`);
    const res = await data.json();
    out = " ";
    res.forEach((element) => {
      out += `
      <option value='${element.name}' >${element.name}-S0${element.season}E0${element.number}</option>
            `;
      datalist.innerHTML = out;
    });
  }
  fun();
  body.append(button);
  body.append(input);
  body.append(datalist);
  body.append(search);
  body.append(showlength)
  let response = [];
  input.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();

    containermain.innerHTML = " ";
    const filterCharacter = response.filter((character) => {
      return character.name.toLowerCase().includes(searchString);
    });
    showepisode(filterCharacter);
  });
  response = [];
  search.addEventListener("keyup", (e) => {
    const searchString = e.target.value.toLowerCase();
    containermain.innerHTML = " ";
    const filterCharacter = response.filter((character) => {
      return (
        character.name.toLowerCase().includes(searchString) ||
        character.summary.toLowerCase().includes(searchString)
      );
    });
    showepisode(filterCharacter);
  });
  body.append(containermain);
  const episodeid = await fetch(
    `https://api.tvmaze.com/shows/${id}/episodes`
  );
  response = await episodeid.json();
  showtotal.innerHTML=` Display ${response.length}`
  showepisode(response);
  function showepisode(datas) {
    datas.forEach((element,index) => {
      const ids=`${element.id}`
      displayshow.innerHTML=`:${Math.round(element.id)}`
      const container = document.createElement("div");
      container.className = "container";
      container.style.cursor = "pointer";
      containermain.append(container);
      body.append(containermain);
      const head = document.createElement("h3");
      head.innerHTML = `${element.name}`;
      head.className = "head";
      container.append(head);
      const img = document.createElement("img");
      img.setAttribute("src", `${element.image.medium}`);
      img.className = "img";
      container.append(img);
      const content = document.createElement("div");
      content.className = "content";
      container.append(content);
      const h1=document.createElement('h4');
        h1.innerHTML=`name:${element.name}`;
        content.append(h1)
        const episode=document.createElement('h4')
        episode.innerHTML=`episode :${element.number}`;
        content.append(episode);
        const number=document.createElement('h4');
        number.innerHTML=`season :${element.season}`;
        content.append(number);
      const summary = document.createElement("p");
      summary.innerHTML = `<strong>${element.name}</strong>${element.summary}`;
      content.append(summary);
    });
  }
}
