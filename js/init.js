AOS.init({
    offset: 200,
      duration: 700,
      easing: 'ease-in',
     delay: 300,
 }, {offset:'50%'});

 jQuery(document).ready(function($) {
     $(this).scrollTop(0);//scroll to top automatically at start
       var a = 0;
           $(window).scroll(function() {
           
             var oTop = $('#whyCont').offset().top - window.innerHeight;
            //  console.log(oTop);
             if (a == 0 && $(window).scrollTop() > oTop) {
               $('.counter').each(function() {
                 var $this = $(this),
                   countTo = $this.attr('data-count');
                 $({
                   countNum: $this.text()
                 }).animate({
                     countNum: countTo
                   },
                   {
                     duration: 3000,
                     easing: 'swing',
                     step: function() {
                       $this.text(commaSeparateNumber(Math.floor(this.countNum)));
                     },
                     complete: function() {
                       $this.text(commaSeparateNumber(this.countNum));
                     }
                   });
               });
               function commaSeparateNumber(val) {
                 while (/(\d+)(\d{3})/.test(val.toString())) {
                   val = val.toString().replace(/(\d+)(\d{3})/, '$1' + ',' + '$2');
                 }
                 return val;
   
               }
               a = 1;
             }
           });
       

         initNav();

             getMainNavItems("Grow");
             getMainNavItems("Live");
             getMainNavItems("Work");
             getMainNavItems("Resources");
             getMainNavItems("Contact");


             //video stuff below here

             scaleVideoContainer();

             initBannerVideoSize('.video-container .poster img');
             initBannerVideoSize('.video-container .filter');
             initBannerVideoSize('.video-container video');

             $(window).on('resize', function () {
                 scaleVideoContainer();
                 scaleBannerVideoSize('.video-container .poster img');
                 scaleBannerVideoSize('.video-container .filter');
                 scaleBannerVideoSize('.video-container video');
             });

             

       });


       function initNav() {
         $('.menu-btn' ).click(function(){
             $('.navContainer').toggleClass('expand')
         })
     }

     function getMainNavItems(uniqueId) {
         var dfd = $.Deferred();

         var camlQueryUniqueID  = "<Query><Where><And><Eq><FieldRef Name='RR_IsVisible' /><Value Type='Text'>Yes</Value></Eq><Eq><FieldRef Name='RR_UniqueID' /><Value Type='Text'>"+uniqueId+"</Value></Eq></And></Where><OrderBy><FieldRef Name='RR_SortOrder' Ascending='True' /></OrderBy></Query>";
         var camlViewFields = "<ViewFields><FieldRef Name='Title' /><FieldRef Name='RR_LinkUrl' /><FieldRef Name='RR_UniqueID' /></ViewFields>";
         var getNavItems = $().SPServices.SPGetListItemsJson({
           webURL: "/",
           listName: "Global Navigation",
           viewName: "",
           CAMLQuery: camlQueryUniqueID,
           CAMLViewFields: camlViewFields,
           CAMLRowLimit: "",
           CAMLQueryOptions: "",
           changeToken: "",
           contains: "",
           mapping: null,
           mappingOverrides: null,
           debug: true
       });
         $.when(getNavItems).fail(function() {
             console.log("query for nav items failed");
         })
         .done(function() {
             //convert this to switch case
             if (this.data[0].RR_UniqueID == "Grow") {
                 for (var i=0; i< this.data.length; i++) {
                     $(".main-nav-grow").append("<li><a href='" + this.data[i].RR_LinkUrl.Url + "'>" + this.data[i].Title + "</a></li>");
                     $(".main-nav-footer-grow").append("<li><a href='" + this.data[i].RR_LinkUrl.Url + "'>" + this.data[i].Title + "</a></li>");
                 }
             }
             else if (this.data[0].RR_UniqueID == "Work") {
                 for (var i=0; i< this.data.length; i++) {
                     $(".main-nav-work").append("<li><a href='" + this.data[i].RR_LinkUrl.Url + "'>" + this.data[i].Title + "</a></li>");
                     $(".main-nav-footer-work").append("<li><a href='" + this.data[i].RR_LinkUrl.Url + "'>" + this.data[i].Title + "</a></li>");
                 }
             }
             else if (this.data[0].RR_UniqueID == "Contact") {
                 for (var i=0; i< this.data.length; i++) {
                     $(".main-nav-contact").append("<li><a href='" + this.data[i].RR_LinkUrl.Url + "'>" + this.data[i].Title + "</a></li>");
                     $(".main-nav-footer-contact").append("<li><a href='" + this.data[i].RR_LinkUrl.Url + "'>" + this.data[i].Title + "</a></li>");
                 }
             }
             else if (this.data[0].RR_UniqueID == "Live") {
                 for (var i=0; i< this.data.length; i++) {
                     $(".main-nav-live").append("<li><a href='" + this.data[i].RR_LinkUrl.Url + "'>" + this.data[i].Title + "</a></li>");
                     $(".main-nav-footer-live").append("<li><a href='" + this.data[i].RR_LinkUrl.Url + "'>" + this.data[i].Title + "</a></li>");
                 }
             }
             else if (this.data[0].RR_UniqueID == "Resources") {
                 for (var i=0; i< this.data.length; i++) {
                     $(".main-nav-resources").append("<li><a href='" + this.data[i].RR_LinkUrl.Url + "'>" + this.data[i].Title + "</a></li>");
                     $(".main-nav-footer-resources").append("<li><a href='" + this.data[i].RR_LinkUrl.Url + "'>" + this.data[i].Title + "</a></li>");
                 }
             }
         });
     }


     function scaleVideoContainer() {

         var height = $(window).height() + 5;
         var unitHeight = parseInt(height) + 'px';
         $('.homepage-hero-module').css('height', unitHeight);

     }

     function initBannerVideoSize(element) {

         $(element).each(function () {
             $(this).data('height', $(this).height());
             $(this).data('width', $(this).width());
         });

         scaleBannerVideoSize(element);

     }

     function scaleBannerVideoSize(element) {

         var windowWidth = $(window).width(),
         windowHeight = $(window).height() + 5,
         videoWidth,
         videoHeight;

         // console.log(windowHeight);

         $(element).each(function () {
             var videoAspectRatio = $(this).data('height') / $(this).data('width');

             $(this).width(windowWidth);

             if (windowWidth < 1000) {
                 videoHeight = windowHeight;
                 videoWidth = videoHeight / videoAspectRatio;
                 $(this).css({ 'margin-top': 0, 'margin-left': -(videoWidth - windowWidth) / 2 + 'px' });

                 $(this).width(videoWidth).height(videoHeight);
             }

             $('.homepage-hero-module .video-container video').addClass('fadeIn animated');

         });
     }


   //   var player;
   //   function onYouTubeIframeAPIReady() {
   //       player = new YT.Player('player', {
   //           videoId: 'iiV5udOKPc4',
   //           playerVars: {
   //               mute: 1,
   //               autoplay: 1,
   //               loop: 1,
   //               controls: 0,
   //               showinfo: 0,
   //               autohide: 0,
   //               enablejsapi: 1,
   //               modestbranding: 1,
   //               playlist: 'iiV5udOKPc4',
   //               vq: 'hd1080'
   //           },
   //           allowfullscreen: 1,
   //           events: {
   //               'onStateChange': onPlayerStateChange
   //           }
   //       });
   //   }
   //   function onPlayerStateChange(el) {
   //       if(el.data === 1) {
   //           jQuery('#video-overlay').hide();
   //       }
   //   }
