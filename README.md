# ArtGalleryProject
The final project of Database Design.

[Project Requirements](https://goo.gl/DRpx3R)

## Brief Description

 **Database** - MySQL
 
 [Relational Diagram](https://drive.google.com/file/d/0B0Lm7ZZWUYUJS1AwWTdBM3NYSGs/view?usp=sharing)
 
 **Webserver** - Node.js + Express



## Environment Setup
1. Install node.js ([Official LTS version](https://nodejs.org/en/download/))
2. Install yarn (a package manager for JS) by ` npm install -g yarn `
3. Install nodemon (a monitor for node.js application) by `yarn global add nodemon`

## Start Server
`nodemon` in the main directory

## Default Database Setup

Go to Database directory `cd Database`

1. Create Database `node Create_DB.js`
1. Create Tables `node Create_Table.js`
1. Insert testing data (optional)
	1. `node Insert_Console.js`
	1. Copy paste the "*.txt" filenames listed in *Index.txt*
	1. After finishing. Terminate it by Ctrl + C

## Todo List
### Server
- [X] Basic Login System
- [X] Basic Database Connection

### Website

- [X] User Register Page

	### Reports
	- [X] Unsold Work Page
		- [ ] Bargain mechanism
	- [X] List All Artist Page
	- [X] List All Customer Page


	### Receipt

	- [ ] Transaction Record (i.e. Payment)
	- [ ] Works for Sale Upload Page
	
		#### User 
		- [X] Artist Report Page
		- [X] Salesperson Page (show the Performance)
	


## Contributor
* David Lee - Website Front-end and Back-end
* Jimmy Zhang - Database

## Memo
### Github md File
* [Basic writing and formatting syntax](https://help.github.com/articles/basic-writing-and-formatting-syntax/)
* [Creating and highlighting code blocks](https://help.github.com/articles/creating-and-highlighting-code-blocks/)

### Github Flow
* [Hello World](https://guides.github.com/activities/hello-world/)
* [Understanding the GitHub Flow](https://guides.github.com/introduction/flow/)

#### Github Tip
* Push local master to remote branch `git push origin master:<remote branch name>`
* [Git pull and keep local changes]{https://stackoverflow.com/questions/10414769/git-pull-keeping-local-changes}
