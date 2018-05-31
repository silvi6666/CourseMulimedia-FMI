import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BlogPostListComponent } from './blogpost-list/blogpost-list.component';
import { BlogPostDetailComponent } from './blogpost-detail/blogpost-detail.component';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { BlogPostsService } from './blogposts.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
  ],
  declarations: [
    BlogPostListComponent,
    BlogPostDetailComponent
  ],
  exports: [
    BlogPostListComponent,
    BlogPostDetailComponent
  ],
  providers: [BlogPostsService]
})
export class BlogPostsModule { }
