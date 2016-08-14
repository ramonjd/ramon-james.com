# Universal React

## React UI components
https://github.com/brillout/awesome-react-components
https://github.com/gilbox/react-track
https://github.com/twitter-fabric/velocity-react
http://tympanus.net/codrops/2015/11/12/animating-svg-menu-icon-segment/
http://codepen.io/MyXoToD/post/howto-self-drawing-svg-animation
http://gardenestudio.com.br/

## Design inspiration
http://codepen.io/MyXoToD/post/howto-self-drawing-svg-animation
http://tympanus.net/codrops/2016/04/26/the-aviator-animating-basic-3d-scene-threejs/


[![Dependency Status](https://david-dm.org/DominicTobias/universal-react.svg)](https://david-dm.org/DominicTobias/universal-react)


## Install & run

```
npm i && npm start
```

Go to `http://localhost:3000/`.

## Build

```
npm run build
```

This will create a `dist/` folder with a `app.min.js` which will be used on any environment which isn't undefined (i.e. not local).

```
npm run start-prod
```

This will build and then run your app with environment set to production, so that `app.min.js` and `config/production.js` are used.

## Adding routes

Add your routes in `Routes.js`.

```js
<Route path='users' component={Users} />
```

## Title and Meta

The parent `App.js` defines the base title and meta in a `Helmet` component. Any sub-component can override/add properties (even adding scripts and css). See the [react-helmet docs](https://github.com/nfl/react-helmet) for more info.

## Config

You can store app settings under `app/config/`. A file matching `process.env.NODE_ENV` will be loaded, for example `app/config/production.js`. If `process.env.NODE_ENV` is undefined it will fallback to `app/config/default.js`. You can access the correct config with:

```js
import config from './config';
```

## Data fetching and client hydration

Read the [Redux](https://rackt.github.io/redux/) guide if you are new to redux. Write Redux actions and stores as normal, and if the action creator is asynchronous then it should return a [Promise](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise) (or a [Promise.all](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all)) in the inner function.

You should write dispatches for actions that must be called for the container to be ready:

```js
static readyOnActions(dispatch, params) {
	return Promise.all([
		dispatch(UserActions.fetchUserIfNeeded(params.id))
	]);
}
```

You should also invoke the actions in `componentDidMount`. This ensures that if the component is reached on the client, then the same actions will be invoked. It's up to the action to figure out if fetches for data need to be made or not:

```js
componentDidMount() {
	User.readyOnActions(this.props.dispatch, this.props.params);
}
```
