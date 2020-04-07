// libraries

const router = require('express').Router();

// files

const Posts = require('../data/db');

// ===Create====

router.post('/', (req,res) => {
    const newPost = req.body;
    const {title, contents} = newPost;
    if(!title || !contents){
        //if missing the title or contents information
        res.status(400).json({
            errorMessage: 'Please provide title and contents for the post.'
        });
    }
    Posts.insert(newPost)
    //if the title and contents information is valid
    .then(post => {
        res.status(201).json(post);
        console.log('Create post: ', post);
    })
    .catch(err => {
        //if there is an issue with saving the information
        res.status(500).json({
            errorMessage: 'There was an error while saving th spost to the database.'
        });
    });
});

// Create Comment

router.post('./:id/comments', (req, res) => {
    const postId = req.params.id;
    const { text } = req.body;
    Posts
        .findById(postId)
        .first()
        .then(post => {
            //if the post with the id is not found
            if(!post){
            return res
                .status(404)
                .json({ message: 'The post with the specified ID could not be found.'});
            } else {
                //if the post is missing the text property
                if(!text) {
                    res
                        .status(400)
                        .json({ errorMessage: 'Please provide text for the comment.'});
                } else {
                    //if the post comment information is valid
                    posts.insertComment(req.body);
                    return then(comment => {
                        res.status(201).json(comment);
                    });
                }
            }
        })
        //if there is an issue saving the post information
        .catch(err => {
            res
                .status(500)
                .json({ error: "The was an error while saving the comment to the database."})
        })
})

// ===Read=== 

router.get('/', (req,res) => {
    Posts.find()
    .then(posts => {
        res.status(200).json(posts);
        console.log('Read posts: ', posts)
    })
    .catch(err => {
        res
            .status(500).json({
                errorMessage: 'The posts information could not be retrieved.'
            });
    });
});

// Read by ID

router.get('/:id', (req, res) => {
    const postId = req.params.id;
    Posts
        .findById(postId)
        .first()
        .then(post => {
            if (!post) {
                return res
                    .status(404)
                    .json({
                        message: "The post with the specified ID does not exist."
                });
            } else {
                res
                    .status(200)
                    .json(post);
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: 'The post information could not be retrieved.'})
        });
});

// Read comment by ID
router.get('/:id/comments', (req, res) => {
    const postId = req.params.id;
    Posts
        .findPostComments(postId)
        .then(post => {
            if (post.length === 0){
                console.log(post)
                return res
                    .status(404)
                    .json({message: "The post with the specified ID does not exist."});
            } else {
                res.status(200).json(post);
            }
        })
        .catch(err =>{
            res
                .status(500)
                .json({error: "The comments information could not be retrieved."});
        });
});

// ===Update===
router.put('/:id', (req,res) => {
    const postId = req.params.id;
    const updatedPost = req.body;
    const {title, contents} = updatedPost;

    Posts
        .update(postId, updatedPost)
        .then(updated =>{
            if(!updated){
                res.status(404).json({
                    message: "The post with the specified ID does not exist.", updated
                });
            } else {
                if(!title || !contents){
                    res.status(400).json({
                        errorMessage: "Please provide title and contents for the post."
                    });
                } else {
                    res.status(200).json({ message: "OK"});
                }
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({error: "The post information could not be modified."})
        });s
});


// ===Delete===

router.delete('/:id', (req,res) => {
    const postId = req.params.id;
    Posts
        .remove(postId)
        .then(post => {
            if(!post){
                res
                    .status(404)
                    .json({
                        message: 'The post with the specified ID does not exist.'
                    });
            } else {
                res.status(200).json({ message: 'Post deleted.'});
            }
        })
        .catch(err => {
            res.status(500).json({
                error: 'The post could not be removed.'
            });
        });
});

module.exports = router;