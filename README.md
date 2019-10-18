# musicMicroservice

List of routes:
/ GET - responds with homepage
/addSong GET, POST - GET responds with html containing form with file input, POST adds file(s) to /uploads folder.
/listSongs GET - responds with list of filenames in /uploads folder
/:media  GET - responds with specific file from /uploads folder

File filter:
Service accepts only files with mimetype containing only "audio" or "video". Wrong files will be ommited.
