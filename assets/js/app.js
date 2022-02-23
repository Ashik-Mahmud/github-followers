/* 
TODO: 
- Select all important elements
- create a function for fetch all of the followers in particular users

*/

/* step 1 select all important elements  */
const inputFields = document.getElementById("username-field");
const followerList = document.getElementById("follower-list");
const error = document.getElementById("error");
/* step 2 create a function for fetch all of the followers in particular users  */
const fetchFollowers = (event) => {
    let userValue = inputFields.value;
    document.getElementById('username').innerText = userValue;
    if (event.key === 'Enter') {
        followerList.innerHTML = '';
        if (userValue === '') {
            error.innerText = 'Username Field is required.';
            event.target.style = 'outline-color: #ff0000';
        } else {
            event.target.style = 'outline-color: #3333';
            error.innerText = '';
            fetch(`https://api.github.com/users/${userValue}/followers`, {
                    method: "GET",
                    headers: {
                        Authorization: `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`
                    }
                })
                .then(response => response.json())
                .then(data => displayFollower(data, userValue))
        }
    }
}
inputFields.addEventListener('keypress', fetchFollowers)


/* step 3 show all of follower in the follower list  */

const displayFollower = (followers, value) => {
    if (followers.length === 0) {
        const errorTag = document.createElement('small');
        errorTag.style = 'display:block;text-align:center;color:#f00';
        errorTag.innerHTML = `User not found by this <strong>${value}</strong> name`;
        followerList.append(errorTag);
    } else {
        followers.forEach(follower => {
            if (follower) {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${follower.html_url}" target="_blank">
                                <div class="avatar">
                                    <img src="${follower.avatar_url}" alt="${follower.login}">
                                </div>
                                 <div class="details">
                                    <h3>${follower.login}</h3>
                                </div>
                            </a>`;
                followerList.appendChild(li);
            }
        });
    }
}