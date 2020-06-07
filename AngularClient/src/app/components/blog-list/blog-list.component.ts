import { Component, OnInit } from '@angular/core';

import { BlogService } from '../../services/blog.service';


@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {
  blogs: any;
  
  currentIndex = -1;
  title: '';
  constructor(private blogService: BlogService) {
   
  }

  ngOnInit(){
    this.getAllBlogs();
   
  }
  getAllBlogs(){
    return this.blogService.getAll()
    .subscribe(
      blogs => 
        this.blogs = blogs,
      error => {
        console.log(error);
      }
    );
  }
  search(){
    this.blogService.find(this.title)
    .subscribe(
        data => {
            this.blogs = data;
            console.log(data)
        },
        error => {
          console.log(error)
        });
  }
}
