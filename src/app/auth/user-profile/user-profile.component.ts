import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from '../../shared/post-model';
import { CommentPayload } from '../../Comment/comment.payload';
import { CommentService } from '../../Comment/comment.service';
import { PostService } from '../../shared/post.service';
import { PostTileComponent } from "../../shared/post-tile/post-tile.component";
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css'],
  imports: [PostTileComponent,CommonModule]
})
export class UserProfileComponent implements OnInit {
  name: string = '';        
  posts: PostModel[] = [];   
  comments: CommentPayload[] = [];
  postLength: number = 0;    
  commentLength: number = 0;

  constructor(
    private activatedRoute: ActivatedRoute,
    private postService: PostService,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.name = params.get('name') ?? '';

      if (this.name) {
        this.fetchUserPosts();
        this.fetchUserComments();
      }
    });
  }

  private fetchUserPosts(): void {
    this.postService.getAllPostsByUser(this.name).subscribe(data => {
      this.posts = data;
      this.postLength = data.length;
    });
  }

  private fetchUserComments(): void {
    this.commentService.getAllCommentsByUser(this.name).subscribe(data => {
      this.comments = data;
      this.commentLength = data.length;
    });
  }
}
