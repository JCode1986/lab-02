// 'use strict';

// const all_animals = [];

// function Animal (horn){
//    this.image_url = horn.image_url;
//    this.title = horn.title;
//    this.description = horn.description;
//    this.keyword = horn.keyword;
//    this.horns = horn.horns;
//  all_animals.push(this);
// }

// Animal.get_animal_data = function(){
//   $.get('../data/page-1.json', 'json').then( data => {
//     data.forEach(horn => new Animal(horn));
//     all_animals.forEach(horn => horn.render());
//   })
// }

// Animal.prototype.render = function(){
//  const photo_section_html = $('#photo-template').html()

//  $('main').append('<section id="clone"></section>');
//  $('#clone').html(photo_section_html);
//  $('#clone').find('h2').text(this.name);
//  $('#clone').find('img').attr('src', this.image_url);
//  $('#clone').find('p').text(this.title).text(this.description);
//  $('#clone').attr('id', this.keyword);
//  $('#clone').attr('class', this.keyword);
// }

// const test_animal = new Animal({});
// test_animal.render();

// $('#horned_animals').on('change', function() {
//   let select_value = $(this).val();
//   $('section').hide()
//   $(`.${select_value}`).show();
//   console.log(select_value);
// });


// Animal.get_animal_data();

'use strict';

let all_creatures = [];

const creatures_template_source = $('#creature-template').html();
const creature_template = Handlebars.compile(creatures_template_source);

const creature_option_template_source = $('#creature-option-template').html();
const creature_option_template = Handlebars.compile(creature_option_template_source);

function Creature(horn) {
  this.image_url = horn.image_url;
  this.title = horn.title;
  this.description = horn.description;
  this.keyword = horn.keyword;
  this.horns = horn.horns;
}

Creature.prototype.render = function(){
  const new_html = creature_template(this);
  $('main').append(new_html);
}

Creature.prototype.make_option = function(){
  if($(`option[value=${this.keyword}]`).length) return;

  const new_html = creature_option_template(this);
  $('select').append(new_html);
}

const get_creature_data = data => {
  $.get(`${data}`, 'json').then(data => {
    data.forEach( val => all_creatures.push(new Creature(val)));
    all_creatures.forEach(creature => creature.render());
    all_creatures.forEach(creature => creature.make_option())
  })
}

$(document).ready(() => {
  get_creature_data('../data/page-1.json');

  $('header').on('click', 'button', function(){
    all_creatures = [];
    $('main').empty();
    console.log($(this).text());
    get_creature_data(`${$(this).text()}.json`);
  })

  $('header').on('click', 'p.big', function() {
    //sort them alphabetically
    all_creatures.sort((a,b) => {
      if(a.title > b.title) {
        return 1
      }
      if( a.title < b.title) return -1;
      return 0;
    })
    $('main').empty();
    all_creatures.forEach(creature => creature.render());
  })
})