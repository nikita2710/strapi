export function getPostSlideshowArray(post) {
    var images = [];
    var api_base_url = process.env.API_BASE_URL;
    post['Featured Images'].forEach(featuredImages => {
  
        if(featuredImages.formats){
        images.push({
            original: api_base_url + featuredImages.url ,
            thumbnail: api_base_url + featuredImages.formats.thumbnail.url,
        })
    }
        else{
            images.push({
                original: api_base_url + featuredImages.url ,
               
            }) 
        }
    });
    return images;
}

export function getScreenPostsImages(posts, lang) {
    var images = [];
    var api_base_url = process.env.API_BASE_URL;
    images = [];
    posts.forEach(post => {
        images.push({
            src: api_base_url + post['Featured Images'][0].url,
            caption: post['Title (' + lang.toUpperCase() + ')']
        })
    });
    return images;
}