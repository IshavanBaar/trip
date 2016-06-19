<?php if(!defined('KIRBY')) exit ?>

title: Page
pages: blog
  limit: 50
  num:
    mode: date
files: false
icon: folder-open
options:
  preview: false
  status: false
  template: false
  url: false
  delete: false
fields:
  title:
    label: Title
    type:  text
    readonly: true