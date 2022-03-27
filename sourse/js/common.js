"use strict";

let div = document.createElement('div');

div.style.overflowY = 'scroll';
div.style.width = '50px';
div.style.height = '50px';

// мы должны вставить элемент в документ, иначе размеры будут равны 0
document.body.append(div);

let scrollWidth = div.offsetWidth - div.clientWidth;
let root = document.documentElement;
root.style.setProperty('--spacing-end', scrollWidth + 'px');
div.remove();
const JSCCommon = {

	btnToggleMenuMobile: [].slice.call(document.querySelectorAll(".toggle-menu-mobile--js")),
	menuMobile: document.querySelector(".catalog-block"),
	menuMobileLink: [].slice.call(document.querySelectorAll(".menu-mobile--js ul li a")),

	modalCall() {
		const link = '[data-fancybox="modal"], .link-modal-js';

		Fancybox.bind(link, {
			arrows: false,
			// infobar: false,
			touch: false,
			trapFocus: false,
			placeFocusBack: false,
			infinite: false,
			dragToClose: false,
			type: 'inline',
			autoFocus: false,
			groupAll: false,
			groupAttr: false,
			l10n: {
				Escape: "Закрыть",
				NEXT: "Вперед",
				PREV: "Назад",
			},
			// beforeLoad: function () {
			// 	root.style.setProperty('--spacing-end', scrollWidth + 'px');
			// },
			// afterClose: function () {
			// 	root.style.setProperty('--spacing-end', null);
			// },

		});

		// $(link).fancybox({
		// });

		$(".modal-close-js").click(function () {
			fancybox.close();
		})
		// fancybox.defaults.backFocus = false;
		const linkModal = document.querySelectorAll(link);
		function addData() {
			linkModal.forEach(element => {
				element.addEventListener('click', () => {
					let modal = document.querySelector(element.getAttribute("href"));
					const data = element.dataset;

					function setValue(val, elem) {
						if (elem && val) {
							const el = modal.querySelector(elem)
							el.tagName == "INPUT"
								? el.value = val
								: el.innerHTML = val;
							// console.log(modal.querySelector(elem).tagName)
						}
					}
					setValue(data.title, '.ttu');
					setValue(data.text, '.after-headline');
					setValue(data.btn, '.btn');
					setValue(data.order, '.order');
				})
			})
		}
		if (linkModal) addData();
	},
	// /modalCall
	toggleMenu() {
		const toggle = this.btnToggleMenuMobile;
		const menu = this.menuMobile;
		document.addEventListener("click", function (event) {
			const toggleEv = event.target.closest(".toggle-menu-mobile--js");
			if (!toggleEv) return;
			// toggle.forEach(el => el.classList.toggle("on"));
			menu.classList.toggle("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.toggle("fixed"));
		}, { passive: true });
	},
	closeMenu() {
		let menu = this.menuMobile;
		if (!menu) return;
		if (menu.classList.contains("active")) {
			this.btnToggleMenuMobile.forEach(element => element.classList.remove("on"));
			this.menuMobile.classList.remove("active");
			[document.body, document.querySelector('html')].forEach(el => el.classList.remove("fixed"));
		}

	},
	mobileMenu() {
		if (!this.menuMobileLink) return;
		this.toggleMenu();
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(".menu-mobile--js.active"); // (1)
			// let link = event.target.closest(".menu-mobile .menu a"); // (1)
			// if (!container || link) this.closeMenu();
		}, { passive: true });

		// window.addEventListener('resize', () => {
		// 	if (window.matchMedia("(min-width: 992px)").matches) this.closeMenu();
		// }, { passive: true });
	},
	// /mobileMenu

	// tabs  .
	tabscostume(tab) {

		$('.' + tab + '__caption').on('click', '.' + tab + '__btn:not(.active)', function (e) {
			$(this)
				.addClass('active').siblings().removeClass('active')
				.closest('.' + tab).find('.' + tab + '__content').hide().removeClass('active')
				.eq($(this).index()).fadeIn().addClass('active');

		});

	},
	// /tabs

	animateScroll() {
		$(document).on('click', " .menu li a, .scroll-link", function () {
			const elementClick = $(this).attr("href");
			if (!document.querySelector(elementClick)) {
				$(this).attr("href", '/' + elementClick)
			}
			else {
				let destination = $(elementClick).offset().top;
				$('html, body').animate({ scrollTop: destination - 80 }, 0);
				return false;
			}
		});
	},
	getCurrentYear(el) {
		let now = new Date();
		let currentYear = document.querySelector(el);
		if (currentYear) currentYear.innerText = now.getFullYear();
	}
};
const $ = jQuery;

function eventHandler() {
	JSCCommon.modalCall();
	JSCCommon.tabscostume('tabs');
	JSCCommon.mobileMenu();
	// JSCCommon.sendForm(); 
	JSCCommon.animateScroll();


	function setFixedNav() {
		let topNav = document.querySelector('.top-nav  ');
		if (!topNav) return;
		window.scrollY > 0
			? topNav.classList.add('fixed')
			: topNav.classList.remove('fixed');
	}

	function whenResize() {
		setFixedNav();

		if (window.matchMedia("(max-width: 768px)").matches) {


		}
	}


	$(" .catalog-block__toggle--mob").click(function (e) {
		$('.catalog-block').removeClass('active');
		$("body, html").removeClass('fixed');
	})
 

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();

	let sCategoriesSlider = new Swiper('.sCategories__slider--js', {
		freeModeMomentum: true,
		watchOverflow: true,
		slidesPerView: 'auto',
		spaceBetween: 0,
		freeMode: true,
	});
	let sPopularsSlider = new Swiper('.sPopulars__slider--js', {
		freeModeMomentum: true,
		watchOverflow: true,
		slidesPerView: 'auto',
		spaceBetween: 0,
		freeMode: true,
	});

	let sliderWrap = document.querySelectorAll(".sBankProducts__slider-wrap");
	sliderWrap.forEach(el => {

		let sBankProductsSlider = new Swiper(el.querySelector('.sBankProducts__slider--js'), {
			freeModeMomentum: true,
			watchOverflow: true,
			slidesPerView: 'auto',
			spaceBetween: 30,
			freeMode: true,
			// loop: true,
			pauseOnMouseEnter: true,
			navigation: {
				nextEl: el.querySelector(' .swiper-button-next'),
				prevEl: el.querySelector(' .swiper-button-prev')
			},
			autoplay: {
				delay: 5000,
			},
		});
	})
	sliderWrap.forEach(el => {

		let sBankProductsSlider = new Swiper(el.querySelector('.sBankProducts__slider--2js'), {
			freeModeMomentum: true,
			watchOverflow: true,
			slidesPerView: 'auto',
			spaceBetween: 33,
			freeMode: true,
			// loop: true,
			pauseOnMouseEnter: true,
			navigation: {
				nextEl: el.querySelector(' .swiper-button-next'),
				prevEl: el.querySelector(' .swiper-button-prev')
			},
			autoplay: {
				delay: 5000,
			},
			breakpoints: { 
				1200: {
					slidesPerView: 3
				}
			}
		});
	})

	sliderWrap.forEach(el => {

		let sBankProductsSlider = new Swiper(el.querySelector('.sBankProducts__slider--page-js'), {
			freeModeMomentum: true,
			watchOverflow: true,
			slidesPerView: 'auto',
			spaceBetween: 33,
			freeMode: true,
			loop: false,
			pauseOnMouseEnter: true,
			slidesPerColumn: 4,
   		slidesPerColumnFill: "row",

			// navigation: {
			// 	nextEl: el.querySelector(' .swiper-button-next'),
			// 	prevEl: el.querySelector(' .swiper-button-prev')
			// },
			// autoplay: {
			// 	delay: 5000,
			// },
		});
	})
		let sProductsOnSite = new Swiper('.sProductsOnSite__slider--js', {
			freeModeMomentum: true,
			watchOverflow: true,
			slidesPerView: 'auto',
			spaceBetween: 0,
			freeMode: true,
		});
		let sPartnersSlider = new Swiper('.sPartners__slider--js', {
		// freeModeMomentum: true,
		watchOverflow: true,
		slidesPerView: 1,
		spaceBetween: 30,
		autoplay: {
			delay: 5000,
		},
		navigation: {
			nextEl: '.sPartners .swiper-button-next',
			prevEl: '.sPartners .swiper-button-prev'
		},
		pagination: {
			type: 'bullets',
			clickable: true,
			el: ".sPartners .swiper-pagination"
		},
		breakpoints: {

			768: {
				slidesPerView: 2,
				spaceBetween: 20,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			1200: {
				slidesPerView: 4,
				spaceBetween: 30,
			}
		}
	});
	let speed = 5000;

	let sHeaderBannerSlider = new Swiper('.sHeaderBanner__slider--js', {
		// freeModeMomentum: true,
		watchOverflow: true,
		slidesPerView: 1,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.sHeaderBanner .swiper-button-next',
			prevEl: '.sHeaderBanner .swiper-button-prev'
		},
		pagination: {
			el: ".sHeaderBanner .swiper-pagination",
			type: 'bullets',
			clickable: true,
		},
		autoplay: {
			delay: speed,
		},
		breakpoints: {
			
			992: {
				slidesPerView: 1,
				spaceBetween: 0,
				pagination: {
					el: ".sHeaderBanner .swiper-pagination",
          type: "fraction",
        },
			},
		}
	});


	$('.pieProgress').asPieProgress({
		namespace: 'pieProgress',
		barcolor: '#FFFFFF',
		barsize: '3',
		size: 38,
		speed: speed / 80,
		goal: 100,
		trackcolor: 'rgba(255, 255, 255, 0.23)',
	});

	$('.pieProgress').asPieProgress('start');
	sHeaderBannerSlider.on('init', () => { 
	})
	// modal window

	sHeaderBannerSlider.on('slideChange', () => {
		$('.pieProgress').asPieProgress('reset');
		$('.pieProgress').asPieProgress('start');
	})
	// modal window


	var wrapper = document.querySelector(".top-nav");
	if (wrapper) {

		let btn = document.querySelector('.scroll-menu-wrap');
		if (btn) {

			let btnText = btn.dataset.btn
			var nav = priorityNav.init({
				mainNavWrapper: ".scroll-menu-wrap", // mainnav wrapper selector (must be direct parent from mainNav)
				mainNav: ".menu", // mainnav selector. (must be inline-block)
				navDropdownLabel: btnText,
				navDropdownClassName: "menu__dropdown", // class used for the dropdown.
				navDropdownToggleClassName: "menu__dropdown-toggle", // class used for the dropdown toggle.
				// navDropdownBreakpointLabel: "Выбрать", //button label for navDropdownToggle when the breakPoint is reached.
				breakPoint: 0,
				// moved: function () { scrolldrop()}, // executed when item is moved to dropdown
				// movedBack: function () { scrolldrop()} // executed when item is moved back to main menu
			});

		}
	}
	$(".top-btn--search-toggle-js").click(function () {
		$(".topLine__search-wrap ").slideToggle();
	})

	$(".aside__toggle-btn--js").click(function () {
		$(this).toggleClass("active").next().slideToggle();
	})
	$(".aside strong").click(function () {
		$(this).toggleClass("active").parent().next().slideToggle();
	})





	$(".range-wrap").each(function () {
		var _this = $(this);

		var $range = _this.find(".slider-js");

		var $inputFrom = _this.find(".input_from");

		var $inputTo = _this.find(".input_to");

		var instance,
			from,
			to,
			min = $range.data('min'),
			max = $range.data('max');
		$range.ionRangeSlider({
			skin: "round",
			type: "double",
			grid: false,
			grid_snap: false,
			hide_min_max: true,
			hide_from_to: true,
			onStart: updateInputs,
			onChange: updateInputs,
			onFinish: updateInputs
		});
		instance = $range.data("ionRangeSlider");

		function updateInputs(data) {
			from = data.from + " сум";
			to = data.to + " сум";
			$inputFrom.prop("value", from);
			$inputTo.prop("value", to); // InputFormat();
		}

		$inputFrom.on("change input ", function () {
			var val = +$(this).prop("value").replace(/\s/g, ''); // validate

			if (val < min) {
				val = min;
			} else if (val > to) {
				val = to;
			}

			instance.update({
				from: val
			});
			$(this).prop("value", currencyFormat(val));
			console.log(val);
		});
		$inputTo.on("change input ", function () {
			var val = +$(this).prop("value").replace(/\s/g, ''); // validate

			if (val < from) {
				val = from;
			} else if (val > max) {
				val = max;
			}

			instance.update({
				to: val
			});
			$(this).prop("value", currencyFormat(val));
		});
	});


	$(".filter-item__title").click(function () {
		$(this).toggleClass("active").next().slideToggle(function () {
			$(this).toggleClass("active");
		})
	})
	$(".sCatalog__toggle-filter--js, .aside__filter-title-toggle--js ").click(function () {
		$('.aside__toggle-block-filter--js').toggleClass("active")
		$('body').toggleClass("fixed")
	})



	var swiper00 = new Swiper(".mySwiper", {
		loop: true,
		spaceBetween: 10,
		slidesPerView: 3,
		freeMode: true,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		navigation: {
			nextEl: ".sProdBody__slider-sm-wrap .swiper-button-next",
			prevEl: ".sProdBody__slider-sm-wrap .swiper-button-prev",
		},
	});
	var swiper222 = new Swiper(".mySwiper2", {
		loop: true,
		spaceBetween: 10,
		thumbs: {
			swiper: swiper00,
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
		navigation: {
			nextEl: ".sProdBody__slider-lg-wrap .swiper-button-next",
			prevEl: ".sProdBody__slider-lg-wrap .swiper-button-prev",
		},
	});

	var sInformationswiper = new Swiper(".sInformation__slider--js", {
		// loop: true,
		spaceBetween: 10, 
		autoplay: {
			delay: 5000,
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	});



	$('.readmore-js').readmore({
		collapsedHeight: 50,
		moreLink: '<a href="#" class="readmore-link-more">Батафсил </a>',
		lessLink: '<a href="#" class="readmore-link-more readmore-link-more--close">Қисқача</a>'
	});

	function toggleShow(toggle, drop, body) {

		let catalogDrop = drop;
		let catalogToggle = toggle;
		

		$(document).on('click', catalogToggle, function () {
			$(this).toggleClass('active').next().fadeToggle('fast', function () {
				$(this).toggleClass("active");
			});
			if (body) {
				document.body.classList.toggle('fixed2');

			}
		})
		
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(catalogDrop + ".active"); // (1)
			let link = event.target.closest(catalogToggle); // (1)
			if (!container || !catalogToggle) {
				$(catalogDrop).removeClass('active').fadeOut();
				$(catalogToggle).removeClass('active');
				if (body) {
					document.body.classList.remove('fixed2');
					
				}
			};
		}, { passive: true });
	}
	// $(".menu-item-has-children:first-child").addClass("active");
	// $(".catalog-block__toggle--desctop").click(function(){
	// })
	// $().hover(function (e) { 
	$(".menu-item-has-children > a").hover(  function(e){
		if ($(".catalog-block").hasClass("active")) return;
			// e.preventDefault();
		// 	console.log(1);
		// console.log(this);
		let title = $(this).text();
		$(this).parent().addClass("active").siblings('li').removeClass('active')
		.find('li').removeClass('active');
	})

	$('body:not(.page-cabinet) .catalog-block').on("click", ".menu-item-has-children > a", function(e){
		if (!$(".catalog-block").hasClass("active")) return;
		
		if ($(this).next("div")) {
			e.preventDefault();
			// 	console.log(1);
			// console.log(this);
			let title = $(this).text();
			$(this).parent().addClass("active").siblings('li').removeClass('active')
			.find('li').removeClass('active');
			$(this).next().find(".btn-back").remove();
			$(this).next().children().prepend(`<li class='btn-back d-md-none'> 
																<svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
																		<path d="M6.86474 0.00180554C7.12953 0.00134969 7.38614 0.0825446 7.59003 0.231296C7.70478 0.31506 7.79964 0.417934 7.86917 0.534023C7.9387 0.650112 7.98153 0.777137 7.99521 0.907824C8.0089 1.03851 7.99317 1.17029 7.94892 1.29562C7.90467 1.42094 7.83278 1.53735 7.73735 1.63818L2.66033 6.98632L7.55603 12.3444C7.65017 12.4465 7.72047 12.5639 7.76289 12.69C7.80531 12.8161 7.81901 12.9482 7.80321 13.079C7.78742 13.2097 7.74243 13.3364 7.67084 13.4518C7.59925 13.5672 7.50246 13.669 7.38604 13.7513C7.26879 13.8421 7.13147 13.9107 6.98272 13.9526C6.83396 13.9945 6.67698 14.0088 6.52162 13.9948C6.36625 13.9807 6.21587 13.9385 6.0799 13.8709C5.94392 13.8032 5.8253 13.7116 5.73147 13.6016L0.257804 7.61492C0.0911212 7.43639 0 7.21244 0 6.98133C0 6.75021 0.0911212 6.52627 0.257804 6.34773L5.92413 0.36101C6.03782 0.24026 6.18223 0.144808 6.34566 0.0823977C6.50909 0.0199873 6.68692 -0.00762439 6.86474 0.00180554Z" fill="#3E3E3E"/>
																		</svg>

																${title}</li>`)
			}
	})
	

	$(document).on("click", ".btn-back", function(){
		$(this).parent().parent().parent().removeClass("active");
	})
	toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown', true);

	toggleShow('.lang-choose__current', ".lang-choose__dropdown");
	toggleShow('.top-btn--alerts', ".dropdown-alert");


	let addImgBlock = document.querySelectorAll('.add-image input');
	addImgBlock.forEach((el) => {
		el.onchange = evt => {
			const [file] = el.files;
			if (file) {
				el.parentNode.classList.add("add-image--filled")
				el.parentNode.querySelector('img').src = URL.createObjectURL(file)
			}

		}
	});

	let elt = document.querySelector(".sChat__messages-body");
	if (elt) elt.scrollTop = elt.scrollHeight


	FilePond.registerPlugin(
		FilePondPluginImagePreview,
		// FilePondPluginImageExifOrientation,
		// FilePondPluginFileValidateSize,
		// FilePondPluginImageEdit
	);

	// Select the file input and use 
	// create() to turn it into a pond
	FilePond.create(
		document.querySelector('.inputGal'),
		{
			labelIdle: 'Перетащите Ваши изображения  или <span class="filepond--label-action"> Загрузите </span> (не более 5ти)'
		}
	);


	FilePond.create(
		document.querySelector('.inputavatar'),
		{
			labelIdle: ' Загрузить',
			imagePreviewHeight: 89,
			imageCropAspectRatio: '1:1',
			imageResizeTargetWidth: 89,
			imageResizeTargetHeight: 89,
			stylePanelLayout: 'compact',
		}
	);
 

	var wow = new WOW({
		mobile: false,
		animateClass: 'animate__animated',
	});
	wow.init();



	//img-svg
	$('img.img-svg-js, .sCategories__img-wrap img, .sHowWorks__img-wrap img, .sAdvantages__img-wrap img, .modal-win img.w-100px.mx-auto, .sWarning__img-wrap img, .sServicePurpose__img-wrap img').each(function () {
		var $img = $(this);
		var imgClass = $img.attr('class');
		var imgURL = $img.attr('src');
		if (imgURL) {


			$.get(imgURL, function (data) {
				// Get the SVG tag, ignore the rest
				var $svg = $(data).find('svg'); // Add replaced image's classes to the new SVG

				if (typeof imgClass !== 'undefined') {
					$svg = $svg.attr('class', imgClass + ' replaced-svg');
				} // Remove any invalid XML tags as per http://validator.w3.org


				$svg = $svg.removeAttr('xmlns:a').attr('style', function (i, style) {
					return style && style.replace(/enable-background[^;]+;?/g, '');
				}); // Check if the viewport is set, if the viewport is not set the SVG wont't scale.
				// $svg = $svg.removeAttr('xmlns:a'); // Check if the viewport is set, if the viewport is not set the SVG wont't scale.


				if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
					$svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'));
				} // Replace image with new SVG
				if ($svg.attr('viewBox') && !$svg.attr('height') && !$svg.attr('width')) {
					let width = $svg.attr("viewBox").split(' ')[2];
					let height = $svg.attr("viewBox").split(' ')[3];
					$svg.attr('width', width);
					$svg.attr('height', height);
				} // Replace image with new SVG


				$img.replaceWith($svg);
			}, 'xml');
		}
	});

 
	let logoText = document.querySelector(".logo__text");
	if (logoText) {
		let text2 = logoText.dataset.text;
		var typed2 = new Typed(logoText, {
			strings: ['','Agrobankdan'],
			typeSpeed: 70,
			backSpeed: 70,

			backDelay: 2200,
			loop: true,
			showCursor: false
		});
	}

	$(".form-wrap__btn-toggle-visible").click(function(){ 
		let typeInput = $(this).parent().find("input")[0];
		$(this).toggleClass("active") 
		const type = typeInput.getAttribute('type') === 'password' ? 'text' : 'password';
		typeInput.setAttribute('type', type);
	})



	$(".accordeon-item__head").click(function(){
		$(this).next().slideToggle().parent().toggleClass("active")
	})


	$('.top-nav:not(.top-nav--cabinet)').hcSticky({
		stickTo: $('body'),
		responsive: {
			768: {
				disable: true
			}
		},
		// mobileFirst: true
	});
	$('.top-nav--cabinet').hcSticky({
		stickTo: $('body'),
	});

	// $('.catalog-block__dropdown-inner ul').each(element, new SimpleBar());
	// new SimpleBar($('.catalog-block__dropdown-inner ul')[0], { autoHide: false });
	$('.sCabinetOrders__head input:checkbox').click(function () {
		if ($(this).is(':checked')) {
			$('.prod-line input:checkbox').prop('checked', true);
			$(".sCabinetOrders__input" ).removeAttr("disabled")
		} else {
			$('.prod-line input:checkbox').prop('checked', false);
			$(".sCabinetOrders__input" ).attr("disabled",'disabled')
		}
	});
	$(".toggle-modal-more").click(function(){
		$(this).toggleClass("active");
		$(this).parents(".modal-win").find(".block-more-info").slideToggle();
	})
	// $(' .prod-line type:checkbox').



	var swipersRew = new Swiper(".sRew__slider--js", {
		slidesPerView: 1,
		// loop: true,
		spaceBetween: 42, 
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true, 
		},
		navigation: {
			nextEl: " .swiper-button-next",
			prevEl: " .swiper-button-prev",
		},
		breakpoints: { 
			768: {
				slidesPerView: 2
			},
			// when window width is >= 640px
			992: {
				slidesPerView: 3
			}
		}
	});


	$(document).on("click", ".news-control__toggle--js", function(){
		$(".news-control__body").slideToggle();
	})



	var contentswiper2 = new Swiper(".content-gallery__slider--thumbs-js", {
		spaceBetween: 20,
		// slidesPerView: 'auto',
		slidesPerView: 'auto',
		freeMode: true,
		watchSlidesProgress: true,
	});
	var contentswiper = new Swiper(".content-gallery__slider--js", {
		spaceBetween: 0,
		navigation: {
			nextEl: ".swiper-button-next",
			prevEl: ".swiper-button-prev",
		},
		thumbs: {
			swiper: contentswiper2,
		},
	});


	$('.custom-select-js').select2({
		// dropdownParent: 
	});
};

if (document.readyState !== 'loading') {
	eventHandler();
} else {
	document.addEventListener('DOMContentLoaded', eventHandler);
}

// window.onload = function () {
// 	document.body.classList.add('loaded_hiding');
// 	window.setTimeout(function () {
// 		document.body.classList.add('loaded');
// 		document.body.classList.remove('loaded_hiding');
// 	}, 500);
// }

$(document).ready(function() {
	$(".with-dropdown").click(function() {
		if ($(".top-btn__icon-wrap", this).children().hasClass('top-btn__count')) {
			if ($(".user-dropdown").hasClass('open')) {
				$('.user-dropdown').fadeOut(500).removeClass('open');
			} else {
				$('.user-dropdown').fadeIn(500).addClass('open');
			}
		}
	});
});

/*start Tabs*/
function openCity(evt, cityName) {
	let i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	document.getElementById(cityName).style.display = "block";
	evt.currentTarget.className += " active";
}

$(".vacancy .tablinks").on('click', function () {
	if ($(this).hasClass('vac')) {
		$(".vacancy .vac_content.vac").css("display","block");
		$(".vacancy .vac_content.res").css("display","none");
	}
	if ($(this).hasClass('res')) {
		$(".vacancy .vac_content.res").css("display","block");
		$(".vacancy .vac_content.vac").css("display","none");
	}
});
/*end Tabs*/

/*start YandexMap*/
/*$(document).ready(function(){
	ymaps.ready(init);

	function init() {
		let  myInput = document.getElementById("suggest");
		let myPlacemark,
			myMap = new ymaps.Map('map', {
				center: [41.295907, 69.241113],
				zoom: 9
			}, {
				searchControlProvider: 'yandex#search'
			});

		myMap.events.add('click', function (e) {
			let coords = e.get('coords');

			if (myPlacemark) {
				myPlacemark.geometry.setCoordinates(coords);
			}
			else {
				myPlacemark = createPlacemark(coords);
				myMap.geoObjects.add(myPlacemark);
				myPlacemark.events.add('dragend', function () {
					getAddress(myPlacemark.geometry.getCoordinates());
				});
			}
			let geoButton = myMap.controls.get('geolocationControl');
			geoButton.events.add('locationchange', function (event) {
				let coords = event.get('position');
				myMap.panTo(coords);
				getAddress(coords);
			});
		});

		function createPlacemark(coords) {
			return new ymaps.Placemark(coords, {
				iconCaption: 'поиск...'
			}, {
				preset: 'islands#violetDotIconWithCaption',
				draggable: true
			});
		}

		function getAddress(coords) {
			myPlacemark.properties.set('iconCaption', 'поиск...');
			ymaps.geocode(coords).then(function (res) {
				var firstGeoObject = res.geoObjects.get(0);

				myPlacemark.properties
					.set({
						iconCaption: [
							firstGeoObject.getLocalities().length ? firstGeoObject.getLocalities() : firstGeoObject.getAdministrativeAreas(),
							firstGeoObject.getThoroughfare() || firstGeoObject.getPremise()
						].filter(Boolean).join(', '),
						balloonContent: firstGeoObject.getAddressLine()
					});
				myInput.value = suggest;
				localStorage.setItem('value', suggest);
			});
		}
		if(localStorage.getItem('value')){
			myInput.value = localStorage.getItem('value');
		}
	}
});*/
/*end YandexMap*/

/*start ButtonClickOpen*/
$(document).ready(function(){
	$(".sProdBody__footer-link.phone-button").on('click', function () {
		$(this).css("width", "185px");
	});
	$(document).mouseup(function (e) {
		let container = $(".sProdBody__footer-link.phone-button");
		if (container.has(e.target).length === 0){
			container.css("width", "46px");
		}
	});
});
/*end ButtonClickOpen*/