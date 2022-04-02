const axios = require('axios');
const cheerio = require('cheerio');
const pretty = require('pretty');

const markup = `
<ul class="fruits">
  <li class="fruits__mango"> Mango </li>
  <li class="fruits__apple"> Apple </li>
</ul>
`;

const $ = cheerio.load(markup);

console.log(pretty($.html()));

const mongo = $(".fruits__mango");

console.log(mongo.html());

const apple = $(".fruits__apple");

console.log(apple.attr("class"));

console.log(apple.html());

const listitems = $("li");

console.log(listitems.length); // 2

// list from UL
listitems.each(
function(idx,el){
  console.log($(el).text());
}
);


const ul = $("ul");
ul.append("<li>Nujoom</li>");
ul.prepend("<li>ashina</li>");
console.log(pretty($.html()));
