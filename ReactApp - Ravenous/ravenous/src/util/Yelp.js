// Yelp API

const clientId = 'xESRlXU4RA5u9126KolD1g';
const secret = 'uMpxmt3HOoWPFstlGb7olv0dYiXSq0qQ4nnEdHUeOI6P6CovRTFm7UA8YvnS7CQY';
let accessToken = '';

// Yelp Object
const Yelp = {
    
    // Need to request new access token
    getAccessToken(){
        if (accessToken) {
            return new Promise(resolve => resolve(accessToken));
        }
        return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/oauth2/token?grant_type=client_credentials&client_id=${clientId}&client_secret=${secret}`,
                     {
                        method: 'POST',
                        })
            .then(response => {
            if (response.ok) {
            return response.json();
            }
            })
            .then(jsonResponse => {
            accessToken = jsonResponse.access_token;
            });
    },
    
    search(term, location, sortBy){
       return Yelp.getAccessToken().then(() => {
            return fetch(`https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=${term}&location=${location}&sort_by=${sortBy}`,
                         {
                            headers: {
                                Authorization: `Bearer ${accessToken}`,
                            }
                         }
                         );
        })
        .then(response => {
            if (response.ok) {
               return response.json(); 
            }
            })
        .then(jsonResponse => {
            if (jsonResponse.businesses) {
                console.log(jsonResponse.businesses);
                return jsonResponse.businesses.map(business => {
                    return {
                        id: business.id,
                        imageSrc: business.image_url,
                        name: business.name,
                        address: business.location.address1,
                        city: business.location.city,
                        state: business.location.state,
                        zipCode: business.location.zip_code,
                        category: business.categories.title,
                        rating: business.rating,
                        reviewCount: business.review_count,
                    };
                    });
            }
            });
            
        }
    };

export default Yelp;