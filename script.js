const TypeWriter = function(txtElement, words, wait=3000){
    this.txtElement = txtElement;
    this.words = words;
    this.txt=' ';
    this.wordIndex = 0;
    this.wait = parseInt(wait,10);
    this.type();
    this.isDeleting = false;
}

//Type Method
TypeWriter.prototype.type = function(){
    //Current index of word
    const current = this.wordIndex % this.words.length;

    //Get full text of current word
    const fullTxt = this.words[current];
    
    //Check if deleting
    if(this.isDeleting){
        //Remove a character
        this.txt = fullTxt.substring(0,this.txt.length - 1);
    } else{
        //Add a character
        this.txt = fullTxt.substring(0,this.txt.length + 1);
    }
    
    //Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`
  
    //Initial Type Speed
    let typeSpeed = 200;

    if(this.isDeleting){
        typeSpeed = typeSpeed/2;
    }

    //Checking if the world is complete
    if(!this.isDeleting && this.txt === fullTxt){
        //Make pause at end
        typeSpeed = this.wait;

        //Set delete to true
        this.isDeleting = true;
    } else if(this.isDeleting && this.txt ===''){
        this.isDeleting = false;

        //Move to next word
        this.wordIndex++;

        //Pause before start typing
        typeSpeed = 800;
    }
    
    setTimeout(() => this.type(),typeSpeed)
}


//Init on DOM Load
document.addEventListener('DOMContentLoaded',init);

//Init App
function init(){
    const txtElement = document.querySelector('.txt-type');
    const words = JSON.parse(txtElement.getAttribute('data-words'));
    const wait = txtElement.getAttribute('data-wait');

    //Init Typewriter
    new TypeWriter(txtElement,words,wait);

}


// $(document).ready(function(){
//     $(".value").each(function(){

//        $(this).prop('Counter',0).animate({
//             Counter :  $(this).text()
//         },{
//             duration:3500,
//             easing : 'swing',
//             step: function(now){
//                 $(this).text(Math.ceil(now));
//             }
//         })
//     });
// });

var a = 0;
$(window).scroll(function() {

  var oTop = $('.counter').offset().top - window.innerHeight;
  if (a == 0 && $(window).scrollTop() > oTop) {
    $('.counter-value').each(function() {
      var $this = $(this),
        countTo = $this.attr('data-count');
      $({
        countNum: $this.text()
      }).animate({
          countNum: countTo
        },

        {

          duration: 1000,
          easing: 'swing',
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(this.countNum);
            //alert('finished');
          }

        });
    });
    a = 1;
  }

});

