const apps = [
    {
        "name":"Locally",
        "description": `
            <h4>Locally</h4>
            <p>Locally is an activity finder to find activities or 
            small local business around your community. <br/>
            Have a small business? Advertise your business with us 
            for FREE! <br/>
            Below is a list of what you can advertise
            </p>
            <ul>
            <li>Party Events</li>
            <li>Bounce House Rental Events</li>
            <li>Construction/Plumber/Electrician Services</li>
            <li>Landscape/Junk Removal Services</li>
            <li>Food Truck Services</li>
            <li>Street Vendor Services</li>
            </ul>
            <br/>
            <h5>Deployment:</h5>
            <p>
                <s>Google Play</s>, 
                <s>Amazon App Store</s>, 
            </p> 
            <p>
                <a href="https://apps.apple.com/us/app/locally-activity-finder/id1557165510" 
                target="_blank"><img src="media/appleBanner.png" alt="Apple App Store Banner"/>
                </a>
            </p>
        `,
        "link":'<a href="https://apps.apple.com/us/app/locally-activity-finder/id1557165510" target="_blank"><img src="media/appleBanner.png" alt="Apple App Store Banner"/></a>',
        "video":"",
        "poster":"",
        "hasVideo":false,
        "thumb":"media/Locally.png",
        "fullImg":"",
        "gitHubLink":"",
        "hasSlideshow":true,
        "images":[
            "media/Locally.png",
            "media/Locally1.png",
            "media/Locally2.png",
            "media/Locally3.png",
            "media/Locally4.png"
        ]
    },
    {
        "name":"Slangly",
        "description": `
            <h4>Slangly</h4>
            <p>Slangly - Speak like a local<br/>
            Slangly is an app where you can learn the slang words 
            used by locals in foreign countries. <br />
            Slangly is available in English and Spanish.
            It currently supports slang words from Latin America.
            Below are a few countries Slangly supports.
            </p>
            <ul>
            <li>Peru 🇵🇪</li>
            <li>Mexico 🇲🇽</li>
            <li>Colombia 🇨🇴</li>
            <li>Argentina 🇦🇷</li>
            <li>Venezuela 🇻🇪</li>
            </ul>
            <br/>
            <h5>Deployment:</h5>
            <p>
                <s>Google Play</s>, 
                <s>Amazon App Store</s>, 
            </p> 
            <p>
                <a href="https://apps.apple.com/us/app/slangly/id6615069048" 
                target="_blank"><img src="media/appleBanner.png" alt="Apple App Store Banner"/>
                </a>
            </p>
        `,
        "link":'<a href="https://apps.apple.com/us/app/slangly/id6615069048" target="_blank"><img src="media/appleBanner.png" alt="Apple App Store Banner"/></a>',
        "video":"",
        "poster":"",
        "hasVideo":false,
        "thumb":"media/slanglyThumb.png",
        "fullImg":"",
        "gitHubLink":"",
        "hasSlideshow":true,
        "images":[
            "media/slanglyThumb.png",
            "media/slanglyThumb1.png",
            "media/slanglyThumb2.png",
            "media/slanglyThumb3.png",
            "media/slanglyThumb4.png",
            "media/slanglyThumb5.png",
        ]
    }
];
let currentApp = 0;
let currentIndex = 0;
let totalImages = 1;
let intervalId;
const mediaContainer = document.getElementById("mediaContainer");
const description = document.getElementById("description");


if(screen.orientation){
    screen.orientation.lock("portrait").catch(function(error){
        console.log("Orientation lock failed:", error);
    });
}

function prevApp(){
    if(currentApp>0){
        currentApp--;
    }else{
        currentApp=apps.length-1;
    }
    showApp();
}

function nextApp(){
    if(currentApp<apps.length-1){
        currentApp++;
    }else{
        currentApp=0;
    }
    showApp();
}

function showApp(){
    stopAutoCycle();
    const isSmallScreen = window.matchMedia("(max-width: 975px)").matches;
    const projectRight = document.getElementById("project-right");
    if(apps[currentApp].hasVideo==true){
        if(!isSmallScreen){
            projectRight.style.display = "block";
        }else{
            projectRight.style.display = "none";
        }
        mediaContainer.innerHTML = `<video id="video" width="320" height="480" autoplay muted controls loop poster="${apps[currentApp].poster}"><source src="${apps[currentApp].video}" type="video/mp4">Your browser does not support the video tag.</video>`
        description.innerHTML = apps[currentApp].description;
    }else{
        if (!isSmallScreen) {
            projectRight.style.display = "block";
        } else {
            projectRight.style.display = "none";
        }
        mediaContainer.innerHTML = '<img id="website-img" alt="Website screenshot" onclick="viewImage()" src="'+apps[currentApp].thumb+'"/>';
        description.innerHTML = apps[currentApp].description;
        const websiteImg = document.getElementById("website-img");
        if(apps[currentApp].hasSlideshow){
            currentIndex = 0;
            totalImages = apps[currentApp].images.length-1;
            websiteImg.addEventListener('mouseenter', stopAutoCycle);
            websiteImg.addEventListener('mouseleave', startAutoCycle);
            updateImage();
            startAutoCycle();
        }else{
            websiteImg.removeEventListener('mouseenter', stopAutoCycle);
            websiteImg.removeEventListener('mouseleave', startAutoCycle);
        }
    }
}

function updateImage(){
    document.getElementById("website-img").src = apps[currentApp].images[currentIndex];
}

function nextImg(){
    currentIndex = currentIndex < totalImages ? currentIndex + 1 : 0;
    updateImage();
}

function startAutoCycle(){
    intervalId = setInterval(nextImg, 2500);
}

function stopAutoCycle(){
    clearInterval(intervalId);
}

function viewImage(){
    window.open("/"+apps[currentApp].fullImg);
}

const appHeight = () => document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`)
window.addEventListener('resize', appHeight)
appHeight()

window.prevApp = prevApp;
window.nextApp = nextApp;
window.viewImage = viewImage;