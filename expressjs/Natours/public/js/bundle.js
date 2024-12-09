require("@babel/polyfill");
var $cxWVk$axios = require("axios");


function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
/* eslint-disable */ 
/* eslint-disable */ const $7590def070dfa4b3$export$4c5dd147b21b9176 = (locations)=>{
    mapboxgl.accessToken = 'pk.eyJ1Ijoiam9uYXNzY2htZWR0bWFubiIsImEiOiJjam54ZmM5N3gwNjAzM3dtZDNxYTVlMnd2In0.ytpI7V7w7cyT1Kq5rT9Z1A';
    var map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/jonasschmedtmann/cjvi9q8jd04mi1cpgmg7ev3dy',
        scrollZoom: false
    });
    const bounds = new mapboxgl.LngLatBounds();
    locations.forEach((loc)=>{
        // Create marker
        const el = document.createElement('div');
        el.className = 'marker';
        // Add marker
        new mapboxgl.Marker({
            element: el,
            anchor: 'bottom'
        }).setLngLat(loc.coordinates).addTo(map);
        // Add popup
        new mapboxgl.Popup({
            offset: 30
        }).setLngLat(loc.coordinates).setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`).addTo(map);
        // Extend map bounds to include current location
        bounds.extend(loc.coordinates);
    });
    map.fitBounds(bounds, {
        padding: {
            top: 200,
            bottom: 150,
            left: 100,
            right: 100
        }
    });
};


/* eslint-disable */ 
/* eslint-disable */ const $fc0f302c549e6bab$export$516836c6a9dfc573 = ()=>{
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
};
const $fc0f302c549e6bab$export$de026b00723010c1 = (type, msg)=>{
    $fc0f302c549e6bab$export$516836c6a9dfc573();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout($fc0f302c549e6bab$export$516836c6a9dfc573, 5000);
};


const $b5876314e451e5db$export$596d806903d1f59e = async (email, password)=>{
    try {
        const res = await (0, ($parcel$interopDefault($cxWVk$axios)))({
            method: 'POST',
            url: 'http://127.0.0.1:3000/api/v1/users/login',
            data: {
                email: email,
                password: password
            }
        });
        if (res.data.status === 'success') {
            (0, $fc0f302c549e6bab$export$de026b00723010c1)('success', 'Logged in successfully!');
            window.setTimeout(()=>{
                window.location.href('/');
            }, 1500);
        }
    } catch (err) {
        (0, $fc0f302c549e6bab$export$de026b00723010c1)('error', err.response.data.message);
    }
};
const $b5876314e451e5db$export$a0973bcfe11b05c9 = async ()=>{
    try {
        const res = await (0, ($parcel$interopDefault($cxWVk$axios)))({
            method: 'GET',
            url: 'http://127.0.0.1:3000/api/v1/users/logout'
        });
        res.data.status = 'success';
        location.reload(true);
    } catch (err) {
        console.log(err.response);
        (0, $fc0f302c549e6bab$export$de026b00723010c1)('error', 'Error logging out! Try again.');
    }
};


/* eslint-disable */ 

const $555719a8109f3a16$export$f558026a994b6051 = async (data, type)=>{
    try {
        const url = type === 'password' ? 'http://127.0.0.1:3000/api/v1/users/updateMyPassword' : 'http://127.0.0.1:3000/api/v1/users/updateMe';
        const res = await (0, ($parcel$interopDefault($cxWVk$axios)))({
            method: 'PATCH',
            url: url,
            data: data
        });
        if (res.data.status === 'success') (0, $fc0f302c549e6bab$export$de026b00723010c1)('success', `${type.toUpperCase()} updated successfully!`);
    } catch (err) {
        (0, $fc0f302c549e6bab$export$de026b00723010c1)('error', err.response.data.message);
    }
};


// DOM ELEMENTS
const $41688f6a8bd7bd47$var$mapBox = document.getElementById('map');
const $41688f6a8bd7bd47$var$loginForm = document.querySelector('.form--login');
const $41688f6a8bd7bd47$var$logOutBtn = document.querySelector('.nav__el--logout');
const $41688f6a8bd7bd47$var$userDataForm = document.querySelector('.form-user-data');
const $41688f6a8bd7bd47$var$userPasswordForm = document.querySelector('.form-user-password');
// DELEGATION
if ($41688f6a8bd7bd47$var$mapBox) {
    const locations = JSON.parse($41688f6a8bd7bd47$var$mapBox.dataset.locations);
    (0, $7590def070dfa4b3$export$4c5dd147b21b9176)(locations);
}
if ($41688f6a8bd7bd47$var$loginForm) $41688f6a8bd7bd47$var$loginForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    (0, $b5876314e451e5db$export$596d806903d1f59e)(email, password);
});
if ($41688f6a8bd7bd47$var$logOutBtn) $41688f6a8bd7bd47$var$logOutBtn.addEventListener('click', (0, $b5876314e451e5db$export$a0973bcfe11b05c9));
if ($41688f6a8bd7bd47$var$userDataForm) $41688f6a8bd7bd47$var$userDataForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    (0, $555719a8109f3a16$export$f558026a994b6051)({
        name: name,
        email: email
    }, 'data');
});
if ($41688f6a8bd7bd47$var$userPasswordForm) $41688f6a8bd7bd47$var$userPasswordForm.addEventListener('submit', async (e)=>{
    e.preventDefault();
    document.querySelector('.btn--save-password').textContent = 'Updating...';
    const passwordCurrent = document.getElementById('password-current').value;
    const password = document.getElementById('password').value;
    const passwordConfirm = document.getElementById('password-confirm').value;
    await (0, $555719a8109f3a16$export$f558026a994b6051)({
        passwordCurrent: passwordCurrent,
        password: password,
        passwordConfirm: passwordConfirm
    }, 'password');
    document.querySelector('.btn--save-password').textContent = 'Save password';
    document.getElementById('password-current').value = '';
    document.getElementById('password').value = '';
    document.getElementById('password-confirm').value = '';
});


//# sourceMappingURL=bundle.js.map
