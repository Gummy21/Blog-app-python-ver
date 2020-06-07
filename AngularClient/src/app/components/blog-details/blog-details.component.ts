import { Component, OnInit } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css'],
})
export class BlogDetailsComponent implements OnInit {
  currentBlog = null;
  data: any;
  y = null;
  user: any;
  userId = null;
  blogId = this.route.snapshot.paramMap.get('id');
  authUser = this.authenticationService.userValue;
  message = '';

  constructor(
    private blogService: BlogService,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.message = '';
    this.getBlog(this.route.snapshot.paramMap.get('id'));
  }
  getBlog(id) {
    this.blogService.get(id).subscribe(
      (data) => {
        this.currentBlog = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  deleteBlog() {
    this.blogService.get(this.blogId).subscribe((userId) => {
      this.userId = userId;
      for (var x of this.userId) {
        var y = Object(x);
        this.y = y;
        
        if (!this.authUser) {
          this.router.navigate(['/login']);
          this.message = "You need to be logged in"

        } else if (this.authUser.id != y.user.id) {
          this.message = 'You do not own this blog';
        } else {
          this.blogService.delete(this.blogId).subscribe(
            (response) => {
              console.log(response);
              this.router.navigate(['/blog']);
            },
            (error) => {
              console.log(error);
            }
          )
        }
      }
    })
  }
}
  