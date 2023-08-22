(function(){
    let button = document.querySelector('.header__nav-btn');
    let popup = document.querySelector('.header__popup');
    let closePopup = document.querySelector('.header__close');
    let modal = document.querySelector('.header__pop-modal');
    let body = document.getElementsByTagName('body');
  
    document.querySelectorAll('.btn').forEach(function(tabsBtn){
      tabsBtn.addEventListener('click', function(){
        document.body.classList.add('disable-scroll');
        popup.classList.add('show__popup');
        popup.classList.add('fade');
        popup.classList.add('animate-open');
        modal.classList.add('is-open');
      });
    });
    closePopup.addEventListener('click', function(){
      popup.classList.remove('show__popup');
      popup.classList.remove('fade');
      popup.classList.remove('animate-open');
      modal.classList.remove('is-open');
      document.body.classList.remove('disable-scroll');
    })
  })();