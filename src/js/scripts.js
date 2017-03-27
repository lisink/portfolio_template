$(document).mouseup(function (e) {
    var container = $('.nav');

    if (!container.is(e.target)
        && container.has(e.target).length === 0) {

        $('.contacts-open').removeClass('active');
    }
});

$('.cats li').click(function() {
$('.cats li').removeClass('active');
    $(this).addClass('active');
});

$('.about-open').click(function() {
    $('.about, body').addClass('opened');
});

$('.about-close').click(function() {
    $('.about, body').removeClass('opened');
});

$('.contacts-open').click(function() {
    $(this).addClass('active');
});

$(document).ready(function(){
    $('.grid').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        transitionDuration: '0.8s'
    });
});

$('.cats span').click(function(){
    var filterValue = $(this).attr('data-filter');

    $('.grid').isotope({
        filter: filterValue
    });
});

$('.animated').waypoint({
    handler: function(direction) {
    $(this.element).addClass('in');
    },
    offset: '95%',
    triggerOnce: true
});