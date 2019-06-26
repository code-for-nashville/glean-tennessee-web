# Glean Tennessee
Preview [website]

This project was created during [Code for Nashville]'s Day of Civic Hacking to allow farmers and other food providers to notify the [Society of St. Andrew] of food donations available for harvest and pick up.

This is drawn from the [SoSAGleanTN repo](https://github.com/SoSAGleanTNorg/GleanTnWeb).


## Development

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

To start:

```
npm install
npm start
```

Pull requests can be opened into the `dev` branch.

Please fork and create pull requests to respond to issues.

Please make sure you can do `yarn build` before you before submitting your pull request.


## Deployment
Only people with permissions to this firebase project will be able to deploy.

To build and deploy, do:

```
yarn build
firebase deploy
```

This is only necessary for changes that affect the app (the UI). For changes to background functions, see below.


## Firebase Functions
Emails are sent using Sendgrid and firebase functions.
To deploy/ update the function run 

```$ firebase deploy --only functions```

The function code lives in the `functions` dir.

## Testing
You can test the code by starting the app locally with npm (above).

Our target is for the app to be displayed on the Society of St. Andrew [website].
But in case something is wrong on their site, you try our [firebase deployment].


## Contributors:

- Corey Rice
- Jeannie Hunter
- Emily Lemmon
- Kevin Huber
- Shu Sajid
- Andrew Leverette

[Code for Nashville]: http://www.codefornashville.org/
[firebase deployment]: https://glean-tennessee.firebaseapp.com/
[website]: https://endhunger.org/crops
[Society of St. Andrew]: https://endhunger.org
