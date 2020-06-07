import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BlogListComponent } from './components/blog-list/blog-list.component';
import { BlogDetailsComponent } from './components/blog-details/blog-details.component';
import { AddBlogComponent } from './components/add-blog/add-blog.component';
import { BlogUpdateComponent } from './components/blog-update/blog-update.component'

import { UserAddComponent } from './components/user-add/user-add.component';
import { UserLoginComponent } from './components/user-login/user-login.component';




import { AuthGuard} from '../app/helpers/auth.guard';
const routes: Routes = [
  { path: 'blog', component: BlogListComponent },
  { path: 'blog/:id', component: BlogDetailsComponent },
  { path: 'blog/results', component:BlogDetailsComponent},
  { path: 'add', component: AddBlogComponent, canActivate: [AuthGuard] },
  { path: 'edit/:id', component: BlogUpdateComponent, canActivate: [AuthGuard]},
  { path: 'register', component:UserAddComponent},
  { path: 'login', component:UserLoginComponent},
  { path: '', redirectTo: 'blog', pathMatch: 'full' }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
