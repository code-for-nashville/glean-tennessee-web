# Glean Tennessee

Preview [website]

This project was created during [Code for Nashville]'s Day of Civic Hacking to allow farmers and other food providers to notify the [Society of St. Andrew] of food donations available for harvest and pick up.

This is drawn from the [SoSAGleanTN repo](https://github.com/SoSAGleanTNorg/GleanTnWeb).

## Development

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

To start the app locally, do:

```
yarn install
yarn start
```

> Note: For simple development and minor edits, you can actually use npm instead of yarn. You can even submit a pull request without installing yarn.
> :warning: However, if you wish to do a deployment (usually only leads on the project), you will need to delete npm's package-lock.json and start over with yarn.

Pull requests can be opened into the `dev` branch.

Please fork and create pull requests to respond to issues.

Please make sure you can do `yarn build` before you before submitting your pull request.

## Deployment

Only people with permissions to this firebase project (usually project leads) will be able to deploy.

To build and deploy, do:

```
yarn build
firebase deploy
```

This is only necessary for changes that affect the app (the UI). For changes to background functions, see below.

> If you get warnings about firebase as a peer dependency when you do `yarn install` then you will need to manually `yarn add firebase-admin` before you deploy.
> If you get a warning about firebase functions, do an `npm install` in the functions directory as suggested and then re-run `yarn build` before you try again with `firebase deploy`.

## Firebase Functions

Emails are sent using Sendgrid and firebase functions.
To deploy/ update the function run

`$ firebase deploy --only functions`

The function code lives in the `functions` dir.

## Testing

You can test the code by starting the app locally with npm or yarn (above).

Our target is for the app to be displayed on the Society of St. Andrew [website](https://endhunger.org/crops.html).
But in case something is wrong on their site, you try our [firebase deployment](https://glean-tennessee.firebaseapp.com).

## Contributors:

* Corey Rice
* Jeannie Hunter
* Emily Lemmon
* Kevin Huber
* Shu Sajid
* Andrew Leverette

[code for nashville]: http://www.codefornashville.org/
[firebase deployment]: https://glean-tennessee.firebaseapp.com/
[website]: https://endhunger.org/crops.html
[society of st. andrew]: https://endhunger.org
