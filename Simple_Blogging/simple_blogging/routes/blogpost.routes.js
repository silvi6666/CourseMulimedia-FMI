/*
 * Copyright (c) 2015-2018 IPT-Intellectual Products & Technologies (IPT).
 * All rights reserved.
 * 
 * This software provided by IPT-Intellectual Products & Technologies (IPT) is for 
 * non-commercial illustartive and evaluation purposes only. 
 * It is NOT SUITABLE FOR PRODUCTION purposes because it is not finished,
 * and contains security flаws and weaknesses (like sending the passwords and 
 * emails of users to the browser client, wich YOU SHOULD NEVER DO with real user
 * data). You should NEVER USE THIS SOFTWARE with real user data.
 * 
 * This file is licensed under terms of GNU GENERAL PUBLIC LICENSE Version 3
 * (GPL v3). The full text of GPL v3 license is providded in file named LICENSE,
 * residing in the root folder of this repository.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 * IPT BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
 * ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */

const express = require('express');
const router = express.Router();
const mongodb = require('mongodb');
const replaceId = require('./helpers').replaceId;
const error = require('./helpers').sendErrorResponse;
const util = require('util');
const indicative = require('indicative');


router.get('/', function (req, res) {
    const db = req.app.locals.db;
    db.collection('blogposts').find().toArray(
        function (err, blogposts) {
            if (err) throw err;
            blogposts.forEach( (blogpost) => replaceId(blogpost) );
            res.json({ data: blogposts });
        }
    );
});

router.get('/:blogpostId', function (req, res) {
    const db = req.app.locals.db;
    const params = req.params;
    indicative.validate(params, { blogpostsId: 'required|regex:^[0-9a-f]{24}$' })
        .then(() => {
            db.collection('blogposts', function (err, blogposts_collection) {
                if (err) throw err;
                blogposts_collection.findOne({ _id: new mongodb.ObjectID(params.blogpostId) },
                    (err, blogpost) => {
                        if (err) throw err;
                        if (blogpost === null) {
                            error(req, res, 404, `Blog Posts with Id=${params.blogpostId} not found.`, err);
                        } else {
                            replaceId(blogpost);
                            res.json({ data: blogpost });
                        }

                    });
            });
        }).catch(errors => {
            error(req, res, 400, 'Invalid blogpost ID: ' + util.inspect(errors))
        });
});

router.post('/', function (req, res) {
    const db = req.app.locals.db;
    const blogpost = req.body;
    indicative.validate(blogpost, {
      id: 'regex:^[0-9a-fA-F]{24}$',
      name: 'required|string|min:2',
      price: 'required|regex:^\\d+(\\.\\d+)?$',
      description: 'string'
    }).then(() => {
        const collection = db.collection('blogpost');
        console.log('Inserting blogposts:', blogpost);
        collection.insertOne(blogpost).then((result) => {
            if (result.result.ok && result.insertedCount === 1) {
                replaceId(blogpost);
                const uri = req.baseUrl + '/' + blogpost.id;
                console.log('Created Blog Posts: ', uri);
                res.location(uri).status(201).json({ data: blogpost });
            } else {
                error(req, res, 400, `Error creating new blogpost: ${blogpost}`);
            }
        }).catch((err) => {
            error(req, res, 500, `Server error: ${err}`, err);
        })
    }).catch(errors => {
        error(req, res, 400, `Invalid blogpost data: ${util.inspect(errors)}`);
    });
});

router.put('/:blogpostId', function (req, res) {
    const db = req.app.locals.db;
    const blogpost = req.body;
    indicative.validate(blogpost, {
      id: 'required|regex:^[0-9a-fA-F]{24}$',
      name: 'required|string|min:2',
      price: 'required|regex:^\\d+(\\.\\d+)?$',
      description: 'string'
    }).then(() => {
        if (blogpost.id !== req.params.blogpostId) {
            error(req, res, 400, `Invalid blogpost data - id in url doesn't match: ${blogpost}`);
            return;
        }
        const collection = db.collection('blogposts');
        blogpost._id = new mongodb.ObjectID(blogpost.id);
        delete (blogpost.id);
        console.log('Updating blogpost:', blogpost);
        collection.updateOne({ _id: new mongodb.ObjectID(blogpost._id) }, { "$set": blogpost })
            .then(result => {
                const resultBlogPost = replaceId(blogpost);
                if (result.result.ok && result.modifiedCount === 1) {
                    res.json({ data: resultBlogPost });
                } else {
                    error(req, res, 400, `Data was NOT modified in database: ${JSON.stringify(blogpost)}`);
                }
            }).catch((err) => {
                error(req, res, 500, `Server error: ${err}`, err);
            })
    }).catch(errors => {
        error(req, res, 400, `Invalid blogpost data: ${util.inspect(errors)}`);
    })
});

router.delete('/:blogpostId', function (req, res) {
    const db = req.app.locals.db;
    const params = req.params;
    indicative.validate(params, { blogpostId: 'required|regex:^[0-9a-f]{24}$' })
        .then(() => {
            db.collection('blogposts', function (err, blogposts_collection) {
                if (err) throw err;
                blogposts_collection.findOneAndDelete({ _id: new mongodb.ObjectID(params.blogpostId) },
                    (err, result) => {
                        if (err) throw err;
                        if (result.ok) {
                            replaceId(result.value);
                            res.json({ data: result.value });
                        } else {
                            error(req, res, 404, `Blog Posts with Id=${params.blogpostId} not found.`, err);
                        }
                    });
            });
        }).catch(errors => {
            error(req, res, 400, 'Invalid blogpost ID: ' + util.inspect(errors))
        });
});


module.exports = router;
