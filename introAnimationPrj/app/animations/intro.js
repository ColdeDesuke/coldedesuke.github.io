// installing gsap plugin
// import { gsap } from "/node_modules/gsap/gsap-core.js";
// import { Flip } from "/node_modules/gsap/Flip.js";
gsap.registerPlugin(Flip);


export default class Intro {
    constructor() {
        // declaring varibales
        this.state = null;
        this.centerImageWrapper = document.querySelector('.intro__center-image');
        this.centerImage = this.centerImageWrapper.querySelector('img');
        this.imagesWrapper = document.querySelector('.intro__images');
        this.images = [...this.imagesWrapper.querySelectorAll('img')];
        this.titleLines = 'h1 [data-animation="text-reveal"] > *';
        this.navLines = 'nav [data-animation="text-reveal"] > *';
        this.textLine = '.intro__line';

        this._getFinalState();
        this._setInitialState();
        this._fadeUpImages();
    }

    _getFinalState(){
        // moving images to center
        gsap.set([this.centerImageWrapper, this.images], {
            xPercent: -50,
            yPercent: -50
        });

        // Gsap State to record stuff to animate from
        this.state = Flip.getState([this.centerImageWrapper, this.images]);
    }

    _setInitialState(){
        // to set images to the initial postitions they will aimate
        this.centerImageWrapper.classList.add('initial');
        this.imagesWrapper.classList.add('initial');

        // changing transform origins of the images to top left
        gsap.set(this.images, {
            xPercent: 0,
            yPercent: 0,
            y: 70
        });

        // Scaling down center image wrapper
        gsap.set(this.centerImageWrapper, {
            y: 70,
            scale: 0.15
        });

        // Zooming up the center image
        gsap.set(this.centerImage, {
            scale: 1.5
        });

        // scaledown the textline
        gsap.set(this.textLine, {
            scaleX: 0,
            opacity: 1
        })
    }

    _fadeUpImages() {
        // without onComplete callback, both animations will start at once
        return gsap.to([this.images, this.centerImageWrapper], {
            y: 0,
            opacity: 1,
            duration: 3,
            ease: 'power3.inOut',
            stagger: 0.1,
            onComplete: () => this._moveImagesToCenter()
        })
    }

    _moveImagesToCenter() {
        // animating with Flip
        Flip.to(this.state, {
            duration: 2,
            ease: 'expo.inOut',
            stagger: 0.15,
            onComplete: () => this._scaleCenterImage()
        })
    }

    _scaleCenterImage() {
        const tl = gsap.timeline({
            onComplete: () => this._revealContent()
        });

        tl.to(this.centerImageWrapper, {
            scale: 1,
            duration: 2,
            ease: 'expo.inOut'
        }).to(this.centerImage, {
            scale: 1,
            duration: 2,
            ease: 'expo.inOut'
        }, '<');

        return tl
    }

    _revealContent() {
        const tl = gsap.timeline({
            defaults: {
                y: 0,
                duration: 2,
                ease: 'expo.inOut'
            }
        });

        tl.to(this.titleLines, {
            stagger: 0.2
        }).to(this.navLines, {
            stagger: 0.3
        }, '<+0.2').to(this.textLine, {
            scaleX: 1,
            transformOrigin: 'left center',
        }, +0.2)

        return tl
    }

}