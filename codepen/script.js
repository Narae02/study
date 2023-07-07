let eventFunctions = {};
let inViewSequence = [];
const defaultSlideOption = 'right';
const slideOptions = ['up-left', 'up', 'up-right', 'right', 'down-right', 'down', 'down-left', 'left'];
let init = false;

jschecker();
createSlideOptions();
createContent();
handleOptions();

window.addEventListener('scroll', e => {
    setScrollDirection(e);
    handleEvents(e);
});
window.addEventListener('resize', handleEvents);

function createSlideOptions () {
    const select = document.querySelector('#slide-options');
    let html = '';
        html += `<option value="none">none</option>`;
    
    slideOptions.forEach(option => {
        html += `<option value="${option}">${option}</option>`;
    });

    html += `<option value="random" selected>random</option>`;
    select.innerHTML = html;
}

function createContent () {
    
    const slideOption = document.querySelector('#slide-options').value;
    const count = document.querySelector('#count').value;
    let loopValue = document.querySelector('#iteration-count').value;
    let selectorValue = document.querySelector('#selector').value;
    let padding = document.querySelector('#padding').checked;
    let alignContent = document.querySelector('#align-content').value;

    const container = document.querySelector('.content-generator');
    let html = '';
    let paddingClass = padding ? 'reduced-padding' : '';
    
    for (let i = 0; i < count; i++) {
        let slideOptionContent = slideOption;
        let slideOptionImg = slideOption;
        let loopContent = loopValue;
        let loopImg = loopValue;
        let selector = selectorValue;
    
        if (slideOption === 'random') {
            slideOptionContent = slideOptions[randomNum(0, slideOptions.length)];
            slideOptionImg = slideOptions[randomNum(0, slideOptions.length)];
        }
    
        if (loopValue === 'random') {
            loopContent = randomNum(0, 2);
            loopImg = randomNum(0, 2);
        }
    
        if (selectorValue === 'random') {
            selector = randomNum(0, 3) + '';
        }

        html += `
            <section class="${paddingClass} ${alignContent}">
              <div class="container">`;

        if (selector === '0' || selector === '1') {
            html += `
                <img class="scroll-animation scroll-animation--fade scroll-animation--slide scroll-animation--slide--${slideOptionImg}" data-scroll-animation-loop="${loopContent}" data-scroll-animation-slide="${slideOptionImg}" src="https://picsum.photos/888/500">`;
        } else {
            html += `<img src="https://picsum.photos/888/500">`;
        }

        if (selector === '0' || selector === '2') {
            html += `
                <div class="content scroll-animation scroll-animation--fade scroll-animation--slide scroll-animation--slide--${slideOptionContent}" data-scroll-animation-loop="${loopImg}" data-scroll-animation-slide="${slideOptionContent}">
                  <p>Turkish, grounds, sit doppio rich, mocha variety skinny french press coffee to go. Variety carajillo cream bar ut, decaffeinated, acerbic cortado coffee instant macchiato. Robusta sugar café au lait aromatic breve con panna single shot crema dripper kopi-luwak. Body decaffeinated foam cream in trifecta skinny dripper steamed espresso.</p>
                  <p>
                    <a href="#top">Back to top</a>
                  </p>
                </div>`;
        } else {
            html += `
                <div class="content">
                  <p>Turkish, grounds, sit doppio rich, mocha variety skinny french press coffee to go. Variety carajillo cream bar ut, decaffeinated, acerbic cortado coffee instant macchiato. Robusta sugar café au lait aromatic breve con panna single shot crema dripper kopi-luwak. Body decaffeinated foam cream in trifecta skinny dripper steamed espresso.</p>
                  <p>
                    <a href="#top">Back to top</a>
                  </p>
                </div>`;
        }
        
                
        html += `
              </div>
            </section>`;
    }

    container.innerHTML = html;
    scrollAnimation();
}

function randomNum (min, max) {
    return Math.floor(Math.random() * max) + min;
}

function handleOptions () {
    const select = document.querySelector('#slide-options');
    const count = document.querySelector('#count');
    const iterationCount = document.querySelector('#iteration-count');
    const selector = document.querySelector('#selector');
    const padding = document.querySelector('#padding');
    let alignContent = document.querySelector('#align-content')

    select.addEventListener('change', createContent);
    count.addEventListener('change', createContent);
    iterationCount.addEventListener('change', createContent);
    selector.addEventListener('change', createContent);
    padding.addEventListener('change', createContent);
    alignContent.addEventListener('change', createContent);
}

function scrollAnimation() {
    eventFunctions = {};
    const itemsToAnimate = document.querySelectorAll('.scroll-animation');

    for (let i = 0; i < itemsToAnimate.length; i++) {
        const item = itemsToAnimate[i];

        item.dataset.scrollAnimationCount = 0;

        const allAnimations = (item, status, direction) => {
            if (item.dataset.scrollAnimation !== status) {
                scrollAnimationOverrides(item);
                fade(item, status);
                slide(item, status);

                item.dataset.scrollAnimation = status;

                let itemLoop = Number(item.dataset.scrollAnimationLoop);
                let itemCount = Number(item.dataset.scrollAnimationCount);
                
                if (status === 'in' && itemCount < itemLoop) {
                    item.dataset.scrollAnimationCount++;
                }
            }
        };
        
        
        const callback = function (e, item) {
            setClientBox(e.type, item);
            inView(e.type, item, (status, direction) => {
                allAnimations(item, status, direction);

                let itemLoop = Number(item.dataset.scrollAnimationLoop);
                let itemCount = Number(item.dataset.scrollAnimationCount);
                let itemStatus = item.dataset.scrollAnimation;

                if (!document.getElementsByClassName(item.classList.value).length || (itemLoop > 0 && itemStatus === 'in' && itemCount >= itemLoop)) {
                    // window.removeEventListener('scroll', eventFunctions[i]);
                    // window.removeEventListener('resize', eventFunctions[i]);
                    delete eventFunctions[i];
                }
            });
        };

        eventFunctions[i] = function (e) {
            callback(e, item);
       };
        
        if (init) {
            inView('load', item, (status, direction) => {
                // initial run incase anything is in view on load
                allAnimations(item, status, direction);
            });
        } else {
            window.addEventListener('load', () => {
                inView('load', item, (status, direction) => {
                    // initial run incase anything is in view on load
                    allAnimations(item, status, direction);
                });
                init = true;
            });
        }
    }
}

function handleEvents (e) {
    const functionKeys = Object.keys(eventFunctions);

    if (functionKeys.length) {
        for (let i = 0; i < functionKeys.length; i++) {
            eventFunctions[functionKeys[i]](e);
        }
    }
}

function setScrollDirection () {
    if (window.lastY !== window.scrollY) {
        let direction = false;
        
        if (window.scrollY < window.lastY) {
            direction = 'up';
        } else if (window.scrollY > window.lastY) {
            direction = 'down';
        }
        
        window.lastY = window.scrollY;
        window.scrollDirection = direction;
    }
}

function inView (type, item, dothis) {
    // if (window.lastY !== window.scrollY) {
        let top, bottom;
        
        if (item.dataset.top && item.dataset.bottom && item.dataset.scrollYOffset) {
            let offset = Number(item.dataset.scrollYOffset);
            top = Number(item.dataset.top) + offset - window.scrollY;
            bottom = Number(item.dataset.bottom) + offset - window.scrollY;
        } else {
            let itemBounds = item.getBoundingClientRect();
            top = itemBounds.top;
            bottom = itemBounds.bottom;
        }

        const status = item.dataset.scrollAnimation;
        const windowHeight = window.innerHeight;
        const scrollDirection = window.scrollDirection;
        const execArea = (windowHeight / 16 * 6);
        const offscreen = 96;

        if (window.scrollDirection === 'up') {
            if (top <= windowHeight && bottom >= execArea) {
                dothis('in', scrollDirection);
            } else if (status === 'in' && (bottom < (0 - offscreen) || top > windowHeight + offscreen)) {
                dothis('out', scrollDirection);
            }
        } else {
            if (bottom >= 0 && top <= windowHeight - execArea) {
                dothis('in', scrollDirection);
            } else if (status === 'in' && (bottom < (0 - offscreen) || top > windowHeight + offscreen)) {
                dothis('out', scrollDirection);
            }
        }
    // }
}

function jschecker () {
    document.querySelector('body').classList.add('js');
}

function scrollAnimationOverrides (item) {
    const delay = item.dataset.scrollAnimationDelay;
    
    item.style.transitionDelay = delay;
}

function setClientBox (type, item) {
    if (type === 'resize' || (!item.dataset.top && !item.dataset.bottom)) {
        // window.lastY = undefined;
        let box = item.getBoundingClientRect();
        item.dataset.top = box.top;
        item.dataset.bottom = box.bottom;
        item.dataset.scrollYOffset = window.scrollY;
    }
}

function fade (item, status) {
    const itemClasses = item.classList;
    const classes = {
        identifier: 'scroll-animation--fade',
        in: 'scroll-animation--fade-in'
    };

    if (itemClasses.contains(classes.identifier)) {
        if (status === 'in') {
            itemClasses.add(classes.in);
        } else if (status === 'out') {
            itemClasses.remove(classes.in);
        }
    }
}

function slide (item, status, direction) {
    const itemClasses = item.classList;
    const itemDirection = item.dataset.scrollAnimationSlide;

    const classes = {
        identifier: 'scroll-animation--slide',
        up: 'scroll-animation--slide--up',
        upright: 'scroll-animation--slide--up-right',
        right: 'scroll-animation--slide--right',
        downright: 'scroll-animation--slide--down-right',
        down: 'scroll-animation--slide--down',
        downleft: 'scroll-animation--slide--down-left',
        left: 'scroll-animation--slide--left',
        upleft: 'scroll-animation--slide--up-left'
    };

    if (itemClasses.contains(classes.identifier) && itemDirection) {
        if (status === 'in') {
            itemClasses.remove(classes.up);
            itemClasses.remove(classes.upright);
            itemClasses.remove(classes.right);
            itemClasses.remove(classes.downright);
            itemClasses.remove(classes.down);
            itemClasses.remove(classes.downleft);
            itemClasses.remove(classes.left);
            itemClasses.remove(classes.upleft);
        } else {
            if (itemDirection === 'up') {
                itemClasses.add(classes.up);
            } else if (itemDirection === 'up-right') {
                itemClasses.add(classes.upright);
            } else if (itemDirection === 'right') {
                itemClasses.add(classes.right);
            } else if (itemDirection === 'down-right') {
                itemClasses.add(classes.downright);
            } else if (itemDirection === 'down') {
                itemClasses.add(classes.down);
            } else if (itemDirection === 'down-left') {
                itemClasses.add(classes.downleft);
            } else if (itemDirection === 'left') {
                itemClasses.add(classes.left);
            } else if (itemDirection === 'up-left') {
                itemClasses.add(classes.upleft);
            }
        }
    }
}