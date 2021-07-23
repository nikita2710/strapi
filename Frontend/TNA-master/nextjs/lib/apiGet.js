export async function getRoomsFromAPI() {
    var api_base_url = process.env.API_BASE_URL;
    const response = await fetch(api_base_url + "/rooms");
    const rooms = await response.json();
    return rooms;
}

export async function getRoom(name) {
    const rooms = Object.values(await getRoomsFromAPI());
    var roomObject = {};
    roomObject = rooms.filter(room => room.Title.toLowerCase() == name.toLowerCase())[0]
    // rooms.forEach(room => {
    //     if (room.RoomName == name) {
    //         roomObject = room;
    //     }
    // });
    return roomObject;
}

export async function getPosts() {
    var api_base_url = process.env.API_BASE_URL;
    const response = await fetch(api_base_url + "/posts");
    const posts = await response.json();
    return posts;
}

export async function getPost(postId) {
    var api_base_url = process.env.API_BASE_URL;
    const response = await fetch(api_base_url + "/posts/" + postId);
    const post = await response.json();
    return post;
}

export async function getPostFromTitle(postTitle, lang) {
    var api_base_url = process.env.API_BASE_URL;
    const response = await fetch(api_base_url + "/posts");
    const posts = await response.json();
    var postObject = {};
    postObject = posts.filter(post => (post["Title (EN)"] == postTitle) || (post["Title (AR)"] == postTitle))[0]
    return postObject;
}

export async function getScreenPost(screenName, postTitle) {
    
}

export async function getPrevPostFromTitle(postTitle, lang) {
    var api_base_url = process.env.API_BASE_URL;
    const response = await fetch(api_base_url + "/posts");
    const posts = await response.json();
    var prevObject = null;
    posts.forEach((post, index) => {
        if (post['Title (EN)'] == postTitle || post['Title (AR)'] == postTitle) {
            if (posts[index - 1]) {
                prevObject = posts[index - 1];
            }
        }
    });
    return prevObject;
}

export async function getNextPostFromTitle(postTitle, lang) {
    var api_base_url = process.env.API_BASE_URL;
    const response = await fetch(api_base_url + "/posts");
    const posts = await response.json();
    var nextObject = null;

    posts.forEach((post, index) => {
        if (post['Title (' + lang.toUpperCase() + ')'] == postTitle) {
            if (posts[index + 1]) {
                nextObject = posts[index + 1];
            }
        }
    });
    return nextObject;
}

export async function getScreenNameAR(roomName, screenNameEN) { //Gets screen names in AR from EN
    const screenObject = JSON.parse(JSON.stringify(await getScreen(screenNameEN, 'EN', roomName)));
    return {
        AR: screenObject['Name (AR)'],
        EN: screenObject['Name (EN)']
    }
}

export async function getScreenNameEN(roomName, screenNameAR) { //Gets screen names in EN from AR
    const screenObject = JSON.parse(JSON.stringify(await getScreen(screenNameAR, 'AR', roomName)));
    return {
        AR: screenObject['Name (AR)'],
        EN: screenObject['Name (EN)']
    }
}

export async function getPostTitleAR(postTitleEN) { //Gets screen names in AR from EN
    const postObject = JSON.parse(JSON.stringify(await getPostFromTitle(postTitleEN, 'EN')));
    return {
        AR: postObject['Title (AR)'],
        EN: postObject['Title (EN)']
    }
}

export async function getPostTitleEN(postTitleAR) { //Gets screen names in EN from AR
    const postObject = JSON.parse(JSON.stringify(await getPostFromTitle(postTitleAR, 'AR')));
    return {
        AR: postObject['Title (AR)'],
        EN: postObject['Title (EN)']
    }
}

export async function getScreensFromAPI() {
    var api_base_url = process.env.API_BASE_URL;
    const response = await fetch(api_base_url + "/screens");
    const screens = await response.json();
    return screens;
}
export async function getScreen(screenName, lang, roomName) {
    let api_base_url = process.env.API_BASE_URL;
    var data = await getRoom(roomName)
    const room = JSON.parse(JSON.stringify(data));

    var screenObject = {};

    screenObject = room.screens.filter(screen => screenName &&( (screen['Name (EN)'].toLowerCase() == screenName.toLowerCase()) || (screen['Name (AR)'] == screenName)))[0];

    // room.screens.forEach(screen => {
    //     if (screen['Name (' + lang.toUpperCase() + ')'] == screenName) {
    //         screenObject = screen;
    //     }
    // });
    const response = await fetch(api_base_url + "/screens/" + screenObject.id);
    screenObject = JSON.parse(JSON.stringify(await response.json()));
    return screenObject;
}
function arrayFilter(arr) { // Remove null from arrays
    return arr.filter(function (el) {
        return el != null;
    });
}