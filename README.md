web-ahoi

## Configuration

Use `gulp.config.json` and `package.json` to configure the application.

## Gulp tasks

- watch (default): Watches for changes in /scripts, /styles, /templates, /images and /fonts resource directories specified in `gulp.config.json`.
- build: Build for production

### Helper tasks

- styles
- build:styles
- scripts
	- lint
- build:scripts
- templates
- fonts
- favicon
	- generate-favicon
- cachebusting
	- cachebust:scripts
	- cachebust:styles
- clean tasks:
	- clean:styles
	- clean:build:styles
	- clean:templates
	- clean:images
	- clean:fonts
	- clean:favicon
