import { Component, OnInit } from '@angular/core';
import BlogPost from '../blogpost.model';
import { BlogPostsService } from '../blogposts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'ws-product-list',
  templateUrl: './blogpost-list.component.html',
  styleUrls: ['./blogpost-list.component.css']
})
export class BlogPostListComponent implements OnInit {
  blogposts: BlogPost[];
  errors: string;
  selectedBlogPost: BlogPost;
  isNewBlogPost = false;

  constructor(private blogpostService: BlogPostsService,
    private router: Router) { }

  ngOnInit() {
    this.blogpostService.findAll().subscribe(
      (blogposts) => this.blogposts = blogposts,
      (err) => this.errors = err
    );
  }

  selectBlogPost(blogpost: BlogPost) {
    this.selectedBlogPost = blogpost;
    this.isNewBlogPost = false;
    this.router.navigate(['blogposts', blogpost.id]);
  }

  addNewBlogPost() {
    this.selectedBlogPost = undefined;
    this.isNewBlogPost = true;
  }

  editProduct(blogpost: BlogPost) {
    if (blogpost) {
      if (this.isNewBlogPost) {
        this.blogpostService.create(blogpost)
          .subscribe(
            p => {
              this.blogposts.push(p);
              this.errors = undefined;
            },
            err => this.errors = err
          );
      } else {
        const index = this.blogposts.findIndex(prod => prod.id === blogpost.id);
        this.blogposts.splice(index, 1, blogpost);
      }
    }
    this.selectBlogPost = undefined;
    this.isNewBlogPost = false;
  }

}
