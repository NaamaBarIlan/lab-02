'use strict';

function startApp(){
  loadData();
}

function loadData(){

  // const tester = data => data.forEach(object => dataArray.push(object));

  const success = images => displayPage(images);

  // const success = images => console.log(images);
  const failure = error => console.error(error);

  $.get('data/page-1.json', 'json')
    .then(success)
    .catch(failure);
}

function displayPage(images) {

  // console.log('images', images);

  // images is the array, image is an item in the array(obj).
  images.forEach(creatureObj => {
    const $newImage = $('#photo-template').clone();

    $newImage.find('h2').text(creatureObj.title);
    $newImage.find('img').attr('src', creatureObj.image_url);
    $newImage.find('p').text(creatureObj.description);
    $newImage.attr('class', creatureObj.keyword);

    // data attributes, don't have display meaning, but have meaning for the dev:
    // $newImage.attr('data-type', images.type);

    $('.photo').append($newImage);

  });
	
  makeDropDown(images);
}

function makeDropDown(images){
  // create an array to hold keywords
  const keywordsArray = [];

  // we need to push all keywords into the keyword array

  images.forEach((element, i)=> {
    // check if the array already has that word before pushing
    // if the word is not in the array
    if(!keywordsArray.includes(element.keyword)){
      keywordsArray.push(element.keyword) 
    }
  });

  keywordsArray.forEach((arrayElement) => {
    $('select').append($('<option>', {value: arrayElement, text: arrayElement}))
    console.log('arrayElement keyword', arrayElement);
  });  
  
  console.log('keywords arr', keywordsArray);

  $('select').on('change', handleChange);
}

const handleChange = event => {
  const dropOption = $(event.target).val();

  if(dropOption === 'default'){
    $('main section').show();
    $('#photo-template:first-child').hide();
  } else {
    $('main section').hide();
    $(`.${dropOption}`).show();
  }
  // console.log('dropOption', dropOption);
}

$(startApp)
