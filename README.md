# BLOG API

In this blog api we don't use express to manage routes, just we use mongoose and http modules of node.js.

### ENPOINTS
<hr>

**MANAGE POSTS**<br>
<p>Below we can see endpoint to create, delete and get specific post</p>

**Create posts**<br>
`/api/v1/posts`<br>
**Get specific post**<br>
`/api/v1/posts/{post_id}`<br>
**Delete posts**<br>
 `/api/v1/posts/{post_id}`<br>

**POSTS COMMENTS**<br>
<p>Below we can see endpoint to create, delete and get specific comments according to post</p>

**Create a post according to post**<br>
`/api/v1/posts/{post_id}/comments`<br>
**Get specific comment**<br>
`/api/v1/comments/{comment_id}`<br>
**Remove specific comment**<br>
`/api/v1/comments/{comment_if}`<br>
**Get all posts according to post**<br>
`/api/v1/posts/{post_id}/comments`<br>
