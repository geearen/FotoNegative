# FotoNegative

# Why? / Scope
FotoNegative is a web application targeting on photographers and hobbyists, where it allows users to views different types of camera from film to digital and view sample images from that camera. Sample images are coming from users and from unsplash API. I wanted to build a web application that gathers photography lovers and create a community that shares their photos and the camera gear they are using. This allow other users see sample images from a specific camera they are interested in owning/purchasing. 

# User Stories
When User visit the website, they are greeted with a beautiful landing page with navigation on the top that will take them to login, register, and cameras index page. At the bottom of the page there's a link for about that showcase the creator of the page. 

Index page of the FotoNegative shows various types of cameras and categories. Non-members can surf around the website and views specific camera and view sample images from different users who posted a comments/ pictures. The index page can be filtered by the type of cameras which are Film or Digital. User can also browse by categories that are given to them.

Non-members can sign up for an account by clicking the REGISTER link on the top of the web page. Once registered, new members can make comments, post images, edit and delete their comments. New members and existing members can view their profile page and update their profile. 

When viewing specific camera, user are able to see information about the camera and view the comments that has been posted and also view sample images from Unsplash API with links to the original photographer. 

Registed User has a profile page where they can view all the images they have posted linking to the specific camera. Users are also available to view other user profile page and look at their beatiful images. 

# Wireframes
## Home Page
![Home page](https://user-images.githubusercontent.com/86206813/132398893-e69f4234-85a2-4122-8dcf-b4d97fdf6d21.PNG)

## Login Page
![Login Page](https://user-images.githubusercontent.com/86206813/132398985-b89570a1-dfdf-42ae-aa51-e5afa2389c5b.PNG)

## Register Page
![Register Page](https://user-images.githubusercontent.com/86206813/132399019-f832ee67-2b98-4f44-94ac-96f58f9d2c84.PNG)

## Show Page
![Show page](https://user-images.githubusercontent.com/86206813/132399024-bacc3849-ec40-4fd1-ac3b-6a833d36f981.PNG)

## Profile Page
![Profile Page](https://user-images.githubusercontent.com/86206813/132399036-a79e1200-5da1-4e60-8cad-57ec80be493e.PNG)

# ERD
![ERD](https://whimuc.com/4yykyBi2wpA8J1fs9UiC9b/A7PVFc7GTYEyzc.png)

# CRUD/ RESTful routing
![CRUD](https://whimuc.com/4yykyBi2wpA8J1fs9UiC9b/9pMFbwQRbUAy4J.png)

# Milestone/Sprints
Sprint 1:

- Server and app config
    - Install dependencies
    - connect controllers to routes
    - test app in browser
    - setup file structures: config, controllers, models, public, css/sass and views

Sprint 2: 

- Set up Models - users, camera and comments. 
    - create user, camera and comments schema - double check before moving on
- Create a database through mongodb atlas.
- Setup .ENV file. 
- create a small seed for camera list 

Sprint 3: 

- Setup views and create a rough draft of home page, login, register, show page and profile page
- pull up data from the data base and show it on the home page
- set up nav bars and side nav for surfing around

Sprint 4:

- Test functionality for creating new cameras, edit, delete
- Test functionality for users creating a user, delete user and edit profile
- Test functionality for posting posting comments
- Create a Super User

Sprint 5:

- CSS styling for all pages and forms

Sprint 6:
- Implement AWS S3
- Implement Unsplash APIs


# Installation steps
```
yarn 
```
or 
```
npm i
```
# Color Pallet
![FotoNegative](https://user-images.githubusercontent.com/86206813/132394197-897dcb73-28d5-49fb-a6c0-af1d2023658c.png)
https://coolors.co/d49b9b-bd6060-a62424-b72828-c92c2c-faac02-fab419-fabb2e-fcd479-fdecc3

# API (Stretch Goal)
https://api.unsplash.com/

# Tech Stacks
NEM Stack
- Node.js
- Express
- MongoDB 
- Mongoose
- SASS
- method-override
- connect-mongo
- jquery
- EJS
- dotenv
- brcryptjs
- express-session
- UIkit
- AWS S3
- multer
- axios

# Resources
- http://camera-wiki.org/
- https://www.kenrockwell.com/
- https://www.dpreview.com/
- https://unsplash.com/
- https://filmcameratokyo.com/

