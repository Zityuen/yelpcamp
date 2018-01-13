## YelpCamp Website
<p>The website link: 52.203.90.19 </p>
<p>This is a website that complemented registering users, posting topics and adding comments to each topic. Also, each user has right to modify their topics and comments and other users cannot do that on topics and comments not belong to them. The whole website design based on the RESTful concept.</p>

<h3>Framework:</h3>
<ul>
    <li>Express</li>
    <li>Password</li>
    <li>Bootstrap</li>
    <li>MongoDB</li>
    <li>body-parser</li>
</ul>

<h3>Details about RESTful Web API:</h3>
<p>Three main routes: index, campgrounds, comments. 
    <ul>
        <li>The index route includes users' register, login and logout.
            <ul>
                <li>GET("/register"): go to the page used to register user info.</li>
                <li>POST("/register"): post users' registering info to the register page and if there is no error, redirecting to the campgrounds page</li>
                <li>GET("/login"): go to the page used to log in.</li>
                <li>GET("/login") post users' logining info to login page and if there is no error, redirecting to the campgrounds page</li>
                <li>GET("/logout"): logout the user's info and redirecting to the campgrounds page</li>
            </ul>
        </li>
        <li>The campgrounds route includes users' posting new campground to website or editing the campgrounds they have posted or deleting.
            <ul>
                <li>GET("/campgrounds"): go to the campgrounds page that shows all campgrounds info</li>
                <li>POST("campgrounds"): allowing posting campgrounds if users have logged in. Else, it has no right to do this</li>
                <li>GET("/campgrounds/new"): allowing going to posting page if users have logged in. Else, asking users to log in</li>
                <li>GET("/campgrounds/:id"): go to a info page about one certain campground</li>        
                <li>GET("/campgrounds/:id/edit"): go to edit campgrounds page if this campground topic belongs to the current user</li>
                <li>PUT("/campgrounds/:id"): put edited info about one certain campground which belongs to the current user and update them in database</li>
                <li>DELETE("/campgrounds/:id"): delete one certain campground which belongs to the current user</li>
            </ul>
        </li>
        <li>The comments route includes users adding comments to each campground, editing themselves comments and deleting.
            <ul>
                <li>GET("/campgrounds/:id/comments/new"): go to the page that users could add new comment to one certain campground if the user has logged in</li>
                <li>POST("/campgrounds/:id/comments"): post user's new comment to the one certain campground if the user has logged in</li>
                <li>GET("/campgrounds/:id/comments/:comment_id/edit"): go the page that the user could edit themselves comment</li>
                <li>PUT("/campgrounds/:id/comments/:comment_id"): put updated info about one comment that belongs to the current user</li>
                <li>DELETE("/campgrounds/:id/comments/:comment_id"): delete one certain comment of one certain campground and this comment belongs to the current user</li>
            </ul>
        </li>
    </ul> 
</p>
