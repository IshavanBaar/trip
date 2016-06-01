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
  blog:
    label: Write your blog here
    type:  textarea
    required: true
  user:
    label: Author
    type: currentuser
    required: true
  date:
    label: Date
    type: date
    default: today
    required: true
  location:
    label: Location
    type: place
    required: true
    help: >
      Move the pin wherever you'd like, or search for a location!
