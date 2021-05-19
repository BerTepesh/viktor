const paths 		= require('../paths'),
			gulp 			= require('gulp'),
			styles 		= require('./styles'),
			twig2html = require('./twig2html'),
      scripts 	= require('./scripts'),
			images 		= require('./images'),
      icons 		= require('./icons'),
			fonts 		= require('./fonts'),
			server 		= require('browser-sync').create()

function readyReload(cb) {
  server.reload()
  cb()
}

module.exports = function serve(cb) {
  server.init({
      server: 'public',
      notify: false, 
      open: true,
      cors: true
  })

  gulp.watch(paths.watch.styles, gulp.series(styles, cb => gulp.src(paths.build.styles).pipe(server.stream()).on('end', cb)))
  gulp.watch(paths.watch.html, gulp.series(twig2html, readyReload))
  gulp.watch(paths.watch.scripts, gulp.series(scripts, readyReload))
  gulp.watch(paths.watch.fonts, gulp.series(fonts, readyReload))
  gulp.watch(paths.watch.img, gulp.series(images, readyReload))
  gulp.watch(paths.watch.icons, gulp.series(icons, readyReload))

  return cb()
}