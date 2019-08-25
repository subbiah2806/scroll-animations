import { TimelineLite, TweenLite, Power2, Linear } from "gsap/all";
import ScrollMagic from "scrollmagic";
import "imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators";
import "imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/animation.gsap";
// import "imports-loader?define=>false!scrollmagic/scrollmagic/uncompressed/plugins/debug.addIndicators.js";
import Vue from 'vue'

export const guestNameAnimation = {
	bind(el, binding) {
		Vue.nextTick(() => {
			let scale_tween;
			const screenWidth = window.innerWidth;
			if (screenWidth && screenWidth < 575.98) {
				scale_tween = TweenLite.from(`.guestName${parseInt(binding.arg) + 1}`, 0.5, {
					y: 200,
					skewY: "-5deg",
					autoAlpha: 0,
					rotation: 90.01,
					ease: Linear.easeNone
				});
			} else {
				scale_tween = TweenLite.from(`.guestName${parseInt(binding.arg) + 1}`, 0.25, {
					y: 100,
					x: 20,
					skewY: "-5deg",
					autoAlpha: 0,
					rotation: 0.01,
					ease: Linear.easeNone
				});
			}
			var controller = new ScrollMagic.Controller();
			var scale_scene = new ScrollMagic.Scene({
				triggerElement: `#section${parseInt(binding.arg) + 1}`,
				offset: -100,
			}).setTween(scale_tween);
			controller.addScene([scale_scene]);
		});
	}
}
export const imageToolTipOnHover = {
	bind(el, binding) {
		Vue.nextTick(() => {
			const elPosition = el.getBoundingClientRect();
			const img = document.createElement('img');
			img.classList.add('img-tootltip');
			img.src = require(`./assets/${binding.value.file}`);
			let style = '';
			if (binding.value.bottom) {
				style = `${style}bottom: ${binding.value.bottom};`;
			} else {
				style = `${style}top: ${binding.value.top || (`${elPosition.y + (binding.value.y || 0)}px`)};`;
			}
			if (binding.value.right) {
				style = `${style}right: ${binding.value.right};`;
			} else {
				style = `${style}left: ${binding.value.left || (`${elPosition.x + (binding.value.x || 0)}px`)};`;
			}
			img.setAttribute("style", style);
			el.parentNode.parentNode.insertBefore(img, el.parentNode);
			const direction = binding.arg || 'top';
			let tweetStyle, tweetStyleTo
			if (direction === 'top') {
				tweetStyle = {
					y: 50,
					skewType: "simple",
					skewY: "-8deg",
					skewX: "4deg",
				}
				tweetStyleTo = {
					y: 0,
					skewType: "simple",
					skewY: "-3deg",
					skewX: "3deg",
					opacity: 1,
					ease: Power2.easeOuts,
				}
			} else {
				tweetStyle = {
					y: -50,
					skewType: "simple",
					skewY: "-5deg",
					rotation: 4
				}
				tweetStyleTo = {
					y: 0,
					skewType: "simple",
					skewY: "0deg",
					opacity: 1,
					ease: Power2.easeOuts,
				}
			}
			TweenLite.set(img, tweetStyle);
			const tooltipTo = new TimelineLite({ paused: true });
			tooltipTo.to(img, .15, tweetStyleTo);
			el.addEventListener('mouseover', () => {
				tooltipTo.play();
			});
			el.addEventListener('click', () => {
				tooltipTo.play();
			});
			el.addEventListener('mouseleave', () => {
				tooltipTo.reverse()
			});
		})
	},
	unbind(el) {
		el.removeEventListener('mouseover', () => { });
		el.removeEventListener('click', () => { });
		el.removeEventListener('mouseleave', () => { });
	}
};
export const hoverOnATag = {
	bind(el) {
		Vue.nextTick(() => {
			const mousepointer = document.getElementById('mousePointer');
			el.addEventListener('mouseover', () => {
				mousepointer.classList.add("mousepointerSmall");
			});
			el.addEventListener('mouseleave', () => {
				mousepointer.classList.remove("mousepointerSmall");
			});
		})
	},
	unbind(el) {
		el.removeEventListener('mouseover', () => { });
		el.removeEventListener('mouseleave', () => { });
	}
}
export const hoverOnImgTag = {
	bind(el) {
		Vue.nextTick(() => {
			el.addEventListener('mouseover', () => {
			});
			el.addEventListener('mouseleave', () => {
			});
		})
	},
	unbind(el) {
		el.removeEventListener('mouseover', () => { });
		el.removeEventListener('mouseleave', () => { });
	}
}