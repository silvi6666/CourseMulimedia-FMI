import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import BlogPost from '../blogpost.model';
import { NgForm } from '@angular/forms';
import { BlogPostsService } from '../blogposts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { map, switchMap, filter } from 'rxjs/operators';

@Component({
  selector: 'ws-product-detail',
  templateUrl: './blogpost-detail.component.html',
  styleUrls: ['./blogpost-detail.component.css']
})
export class BlogPostDetailComponent implements OnInit, OnChanges {
  @Input() blogpost = new BlogPost(undefined, undefined, undefined, undefined, undefined, undefined);
  @Output() blogpostEdited = new EventEmitter<BlogPost>();
  editedBlogPost: BlogPost;
  isNewBlogPost = false;
  error: string;

  @ViewChild('form') form: NgForm;

  constructor(private blogpostsService: BlogPostsService,
    private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.route.paramMap.pipe(
      map(parmMap => parmMap.get('blogpostId') as string),
      filter(id => !!id),
      switchMap(id => this.blogpostsService.find(id))
    ).subscribe(
      blogpost => {
        this.blogpost = blogpost || this.blogpost;
        this.resetBlogPost();
      },
      err => this.error = err
    );
    this.resetBlogPost();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (!this.blogpost || !this.blogpost.id) {
      this.isNewBlogPost = true;
      this.blogpost = new BlogPost(undefined, undefined, undefined, undefined, undefined, undefined);
      this.resetBlogPost();
    }
    if (changes['blogpost'].currentValue !== changes['blogpost'].previousValue) {
      this.resetBlogPost();
    }
  }

  submitBlogPost() {
    this.blogpostEdited.emit({ ...this.editedBlogPost});
  }

  cancel() {
    this.blogpostEdited.emit(null);
  }

  resetBlogPost() {
    this.editedBlogPost = { ...this.blogpost };
    this.form.resetForm(this.editedBlogPost);
  }

}

export namespace Status {
  export function values() {
    return Object.keys(Status).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    );
  }
}

export class EnumIteratorComponent {
  Status = Status;
}
