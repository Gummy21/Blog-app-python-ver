import { Component, OnInit } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit{ 
  blog = {
    title: "",
    content: ""
  }
  

  submitted = false;
  constructor(private blogService: BlogService, private router: Router,) {}

  ngOnInit() {
  }

  saveBlog() {
    const data = {
      title: this.blog.title,
      content: this.blog.content,
      author: JSON.parse(localStorage.getItem('user')).id,
      auth_name: JSON.parse(localStorage.getItem('user')).username
    };
    this.blogService.create(data)
    .subscribe( response => {
      this.router.navigate(['/blog']);
      this.submitted = true;
    },
    err => {
      console.log(err)
    });
  } 
  
  newBlog(){
    this.submitted = false;
    this.blog = {
      title: "",
      content: "",
    }
  }

}
