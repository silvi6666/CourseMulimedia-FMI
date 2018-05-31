import {RouterModule} from '@angular/router';
import { NgModule } from '@angular/core';
import { BlogPostListComponent } from './blogposts/blogpost-list/blogpost-list.component';
import { BlogPostDetailComponent } from './blogposts/blogpost-detail/blogpost-detail.component';

@NgModule({
    imports: [RouterModule.forRoot([
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/blogposts'
    },
    {
        path: 'blogposts',
        component: BlogPostListComponent
    },
    {
        path: 'blogposts/add',
        component: BlogPostDetailComponent
    },
    {
        path: 'blogposts/:blogpostId',
        component: BlogPostDetailComponent
    }
])],
    exports: [RouterModule]
})
export class AppRoutingModule {}
