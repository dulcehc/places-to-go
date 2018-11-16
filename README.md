### Finding venues with Foursquare API

**Description:** This React application is for finding a venue based on your current geolocation and/or indicating the name of the place.

Requirements
------
You must have installed npm, create-react-app and sass.

Setting up the application
------
1. Clone Repository: https://github.com/dulcehc/places-to-go.git

`git clone https://github.com/dulcehc/places-to-go.git`

2. Go to the new folder:

`cd places-to-go`

3. Install dependencies:

 `npm install`

4. Get your Client ID and Client Secret keys to use Foursquare API, https://foursquare.com/developers/apps.

5. Update the api-key.js file located in src/constants/api-key.js

6. Run the app with `npm start`

7. visit http://localhost:3000/

Using the application
------
1. You must allow the browser to access your location.
![image](https://user-images.githubusercontent.com/19391835/48646282-0870ed80-e9ae-11e8-8ec1-44c9337c5ab2.png)

2. Search some venue:
![image](https://user-images.githubusercontent.com/19391835/48646651-17a46b00-e9af-11e8-94d8-97645f517a49.png)

3. The results will appear on a left menu:
![image](https://user-images.githubusercontent.com/19391835/48646774-681bc880-e9af-11e8-97f7-3cd56a38cbbf.png)

4. Choose the Venue for more details:
![image](https://user-images.githubusercontent.com/19391835/48646853-aa450a00-e9af-11e8-9719-3f22c6a94fe4.png)

5. Share a place in your social media (Available for Facebook, Twitter and Google Plus):

![image](https://user-images.githubusercontent.com/19391835/48647134-b41b3d00-e9b0-11e8-91e4-305fc2288c6c.png)



Notes
------
After some time of using the application, there could be a message of the "The information can't be displayed", this could be due to the rate limit quota, depending of your account from Foursquare. More details, you can check the website https://developer.foursquare.com/docs/api/troubleshooting/rate-limits.