const gulp = require('gulp');
const nodemon = require('gulp-nodemon');
const gulpMultiProcess = require('gulp-multi-process');
const spawn = require('child_process').spawn;

async function exec(cmd) {
  return new Promise((resolve, reject) => {
    const s = spawn(cmd, [], { shell: true });
    s.stdout.on('data', data => {
      process.stdout.write(`${data}`);
    });

    s.stderr.on('data', data => {
      console.error(`${data}`);
    });

    s.on('close', code => {
      if (code === 0) {
        resolve();
      } else {
        console.error(`child process exited with code ${code}`);
        reject();
      }
    });
  });
}

gulp.task('clean', async function() {
  await exec(`rm -rf ./node_modules/.cache .next/ production-server/`);
});

gulp.task('watch:jest', async function() {
  await exec(`yarn run jest --colors --watchAll`);
});

gulp.task('graphql:playground', async function() {
  await exec(`graphql playground --port 4000`);
});

gulp.task('relay-compiler', async function() {
  await exec(
    `relay-compiler --src client --schema ./server/schema/ro.schema.graphql --watch false --watchman false --language typescript --artifactDirectory ./client/__generated__`
  );
});

gulp.task('watch:server', function(done) {
  nodemon({
    script: '',
    watch: ['server/**/*.ts'],
    ignore: ['server/schema/ro.schema.d.ts'],
    ext: 'js,ts',
    exec:
      'yarn run gulp dev:all #',
    verbose: false,
  });
  done();
});

gulp.task('build:graphql:types', async function() {
  await exec(`BABEL_ENV=development babel-node --extensions=".js,.jsx,.ts,.tsx" server/genSchema.ts`);
});

gulp.task('build:next', async function() {
  await exec(`next build`);
});

gulp.task('build:server:ts', async function() {
  await exec(`tsc --project server/tsconfig.json`);
});

gulp.task('build:server:babel', async function() {
  await exec(`babel --extensions '.es6,.js,.es,.jsx,.mjs,.ts,.tsx' -d dist2 components`);
});

gulp.task('dev:server', async function() {
  await exec(`BABEL_ENV=development babel-node --extensions=".js,.jsx,.ts,.tsx" server/index.ts`);
});

gulp.task('dev:all', gulp.series('clean', 'build:graphql:types', 'relay-compiler', 'dev:server'));

gulp.task('build:server:files', function() {
  return gulp.src(['./server/schema/ro.schema.json', './server/schema/ro.schema.graphql']).pipe(gulp.dest('./production-server/'));
});

gulp.task('build:server', gulp.series('build:server:ts', 'build:server:files'));

gulp.task('dist', async function() {
  const isWin = process.platform === 'win32';
  const binName = isWin ? 'app.exe' : 'app';
  await exec(`pkg . --target host --output production-server/pkg/${binName}`);
});

gulp.task('build', gulp.series('clean', 'build:next', 'build:graphql:types', 'build:server', 'dist'));

gulp.task('dev', gulp.series('watch:server'));
