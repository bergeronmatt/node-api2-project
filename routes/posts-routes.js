// libraries

const router = require('express').Router();

// files

const Posts = require('../data/db');

// Create

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
                .json({ error: "The post information could not be found."})
        })
})

// Read
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

//Update
router.put('/', (req,res) => {
    // add code here
})

//Delete
router.delete('/', (req,res) => {
    // add code here
})