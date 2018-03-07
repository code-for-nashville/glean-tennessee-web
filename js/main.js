'use strict';
console.log("Main js is linked.");

let FBurl = 'https://gleantn-1794b.firebaseio.com/farmers';

let currentUser;
let userObj;

//the promise set up here allows the user to be created before their profile is saved -- this allows them to become 'authenticated' as well as saves their details to the firebase database
$("#register-btn").click(() => {
	createUser()
	.then(results => {
		return addFarmerProfile(results)
	})
	.then((data) =>{
		loginUser()
	})
});

// When a farmer clicks the button, (**get all data from optional fields and)
// Save details to DB including timestamp and
// Send email to sosatn@endhunger.org
$("#submit-btn").click( () => {
	//something that generates email
});

$('#login-btn').click( () => {
	userObj = {
		password: $('#in-password').val(),
		email: $('#in-email').val()
	}
});

//on click of "register" button, capture what's in fields and store as object, send to FB, then send to next page
let addFarmerProfile = (user) => {
	return new Promise ( (resolve, reject) => {
		console.log("currentUser?", user.uid);
		let farmerObj = {
			name: $('#name').val(),
			street: $('#street').val(),
			city:  $('#city').val(),
			state: $('#state').val(),
			zip: $('#zip').val(),
			phone: $('#phone').val(),
			email: $('#up-email').val()
		}
 console.log("farmer profile", farmerObj, "currentUser?", user.uid);
		$.ajax({
			url: `${FBurl}/${user.uid}.json`,
			type: "POST",
			data: JSON.stringify(farmerObj),
			dataType: 'json'
		}).done( (data) => {
			resolve(data);
		}).fail ( (error) => {
			console.log("Error", error);
			reject(error);
		});

	});

};

let createUser = () => {
	return new Promise ( (resolve, reject) => {
	userObj = {
		password: $('#up-password').val(),
		email: $('#up-email').val()
	}
	// console.log("firebase?", firebase);
	// console.log("auth?", firebase.auth);
	console.log("userObj??", userObj);
	    firebase.auth().createUserWithEmailAndPassword(userObj.email, userObj.password)
	    .then( (user) => {
	    	console.log("user from the createPromise?", user);
	    	currentUser = user.uid;
				resolve(currentUser)
			})
			.catch( (err) => {
				reject(err);
			})
	})
};

let loginUser = () => {
	console.log("login user called!", userObj);
	return new Promise( (resolve, reject) => {
		firebase.auth().signInWithEmailAndPassword(userObj.email, userObj.password)
		.then( (user) => {
			currentUser = user.uid;
			resolve(user);
		})
		.catch( (err) => {
			console.log("error logging in", err.message);
		});
	});
};

let logoutUser = () => {
	return firebase.auth().signOut()
	.catch( (err) => {
		console.log("error logging out", err.message);
	});
};
