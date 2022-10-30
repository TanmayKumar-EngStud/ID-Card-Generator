# This is a small react application for Generading a dummy ID card
## For Demo: [Click me](https://tanmaykumar-engstud.github.io/ID-Card-Generator/)

#### Installation: 
1. you would need npm installed 
2. run the command `npm install`, this will install all the dependencies that are stated inside `package.json`

#### Development so far: 
1. Project is bootstraped with `create-react-app` 
2. In order to share the details from one component to another, `react-redux` is used
3. Later `react-router` is also used to create different links (however more work is to be done regarding to this)
4. Project is also made Responsive to all the devices (phone, laptop)
5. Recently there is an issue with `react-pdf` it is causing some error inside **node_modules**

#### Building blocks of this project: 
 There are 6 sections inside the src files :
 1. **components** : This consists of all the components that are used inside the website.
 2. **images** : This consists of image that is used inside website.
 3. **Pages** : This consists of javascript files, each file represent a separate page. These pages uses elements from the `component`'s tab.
 4. **storage** : This consists of 1 prime file `index.js` + all the other files that will be unique storage sections ( these storage sections will store the data and will be assigned their own actions, for the modifications of the data being stored ) all of these will be pooled into the `index.js` file which is later called inside `components`.
 5. **Styles** : This will consist of all the designing and styling of the components.
