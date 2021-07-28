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
		const link = "[data-fancybox]";

		Fancybox.bind(link , {
				arrows: false,
				infobar: false,
				touch: false,
				infinite: false,
				dragToClose: false,
				type: 'inline',
				autoFocus: false,
				l10n: {
						Escape: "Закрыть",
						NEXT: "Вперед",
						PREV: "Назад",
						// PLAY_START: "Start slideshow",
						// PLAY_STOP: "Pause slideshow",
						// FULL_SCREEN: "Full screen",
						// THUMBS: "Thumbnails",
						// DOWNLOAD: "Download",
						// SHARE: "Share",
						// ZOOM: "Zoom"
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

	inputMask() {
		// mask for input
		let InputTel = [].slice.call(document.querySelectorAll('input[type="tel"]'));
		InputTel.forEach(element => element.setAttribute("pattern", "[+][0-9]{1}[(][0-9]{3}[)][0-9]{3}-[0-9]{2}-[0-9]{2}"));
		Inputmask("+9(999)999-99-99").mask(InputTel);
	},

	heightwindow() {
		// First we get the viewport height and we multiple it by 1% to get a value for a vh unit
		let vh = window.innerHeight * 0.01;
		// Then we set the value in the --vh custom property to the root of the document
		document.documentElement.style.setProperty('--vh', `${vh}px`);

		// We listen to the resize event
		window.addEventListener('resize', () => {
			// We execute the same script as before
			let vh = window.innerHeight * 0.01;
			document.documentElement.style.setProperty('--vh', `${vh}px`);
		}, { passive: true });
	},
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
	JSCCommon.inputMask();
	// JSCCommon.sendForm();
	JSCCommon.heightwindow();
	JSCCommon.animateScroll();

	// JSCCommon.CustomInputFile(); 
	var x = window.location.host;
	let screenName;
	screenName = document.body.dataset.bg;
	if (screenName && x.includes("localhost:30")) {
		document.body.insertAdjacentHTML("beforeend", `<div class="pixel-perfect" style="background-image: url(screen/${screenName});"></div>`);
	}


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

	$(" .menu-item-has-children > a").click(function (e) {
		if ($(".catalog-block").hasClass("active")) {
			e.preventDefault();
			$(this).next().slideToggle();
		}
	})

	window.addEventListener('scroll', () => {
		setFixedNav();

	}, { passive: true })
	window.addEventListener('resize', () => {
		whenResize();
	}, { passive: true });

	whenResize();


	let defaultSl = {
		spaceBetween: 0,
		lazy: {
			loadPrevNext: true,
		},
		watchOverflow: true,
		spaceBetween: 0,
		loop: true,
		navigation: {
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		pagination: {
			el: ' .swiper-pagination',
			type: 'bullets',
			clickable: true,
			// renderBullet: function (index, className) {
			// 	return '<span class="' + className + '">' + (index + 1) + '</span>';
			// }
		},
	}

	const swiper4 = new Swiper('.sBanners__slider--js', {
		// slidesPerView: 5,
		...defaultSl,
		slidesPerView: 'auto',
		freeMode: true,
		loopFillGroupWithBlank: true,
		touchRatio: 0.2,
		slideToClickedSlide: true,
		freeModeMomentum: true,

	});

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
	let sProductsOnSite = new Swiper('.sProductsOnSite__slider--js', {
		freeModeMomentum: true,
		watchOverflow: true,
		slidesPerView: 'auto',
		spaceBetween: 0,
		freeMode: true,
	});
	// modal window


	var wrapper = document.querySelector(".top-nav");
	let btnText = document.querySelector('.scroll-menu-wrap').dataset.btn
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
	
	$(".top-btn--search-toggle-js").click(function(){
		$(".topLine__search-wrap ").slideToggle();
	})

	$(".aside__toggle-btn--js").click(function(){
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
			from = data.from;
			to = data.to;
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


	$(".filter-item__title").click(function(){
		$(this).toggleClass("active").next().slideToggle(function(){
			$(this).toggleClass("active");
		})
	})
	$(".sCatalog__toggle-filter--js, .aside__filter-title-toggle--js ").click(function(){
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

	$('.readmore-js').readmore({
		collapsedHeight: 50,
		moreLink: '<a href="#" class="readmore-link-more">Батафсил </a>',
		lessLink: '<a href="#" class="readmore-link-more readmore-link-more--close">Close</a>'
	});

	function toggleShow(toggle, drop) {

		let catalogDrop = drop;
		let catalogToggle = toggle;
		
		$(document).on('click', catalogToggle, function(){
			$(this).toggleClass('active').next().fadeToggle('fast', function(){
				$(this).toggleClass("active")
			});
		})
		
		document.addEventListener('mouseup', (event) => {
			let container = event.target.closest(catalogDrop + ".active"); // (1)
			let link = event.target.closest(catalogToggle); // (1)
			if (!container || !catalogToggle) {
				$(catalogDrop).removeClass('active').fadeOut();
				$(catalogToggle).removeClass('active');
			};
		}, { passive: true });
	}
	toggleShow(".catalog-block__toggle--desctop", '.catalog-block__dropdown');
	toggleShow('.lang-choose__current', ".lang-choose__dropdown");
	toggleShow('.top-btn--alerts', ".dropdown-alert");
		
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