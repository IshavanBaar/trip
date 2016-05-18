<?php if(!defined('KIRBY')) exit ?>

title: Blog
pages: false
files: true
fields:
  title:
    label: Title
    type:  text
    required: true
  main-image:
    label: Main Image
    type: image
    required: true
  user:
    label: Author
    type: currentuser
  blog:
    label: Write your blog here
    type:  textarea
    required: true